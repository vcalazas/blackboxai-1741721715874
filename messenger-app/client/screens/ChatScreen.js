import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Appbar } from 'react-native-paper';
import globalStyles, { colors, typography } from '../styles/globalStyles';
import ChatMessage from '../components/ChatMessage';
import ChatInput from '../components/ChatInput';
import socketService from '../services/socket';

const ChatScreen = ({ route, navigation }) => {
    const { username } = route.params;
    const [messages, setMessages] = useState([]);
    const [typingUsers, setTypingUsers] = useState(new Set());
    const flatListRef = useRef(null);

    useEffect(() => {
        const socket = socketService.socket;

        // Listen for new messages
        socket.on('message', (message) => {
            setMessages(prevMessages => [...prevMessages, message]);
        });

        // Listen for user joined notifications
        socket.on('userJoined', (message) => {
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: Date.now(),
                    message,
                    type: 'notification',
                    timestamp: new Date().toISOString()
                }
            ]);
        });

        // Listen for user left notifications
        socket.on('userLeft', (message) => {
            setMessages(prevMessages => [
                ...prevMessages,
                {
                    id: Date.now(),
                    message,
                    type: 'notification',
                    timestamp: new Date().toISOString()
                }
            ]);
        });

        // Listen for typing status
        socket.on('userTyping', ({ username: typingUsername, isTyping }) => {
            setTypingUsers(prev => {
                const updated = new Set(prev);
                if (isTyping) {
                    updated.add(typingUsername);
                } else {
                    updated.delete(typingUsername);
                }
                return updated;
            });
        });

        // Cleanup on unmount
        return () => {
            socketService.disconnect();
        };
    }, []);

    const renderMessage = ({ item }) => {
        if (item.type === 'notification') {
            return (
                <View style={{ alignItems: 'center', padding: 8 }}>
                    <Text style={[typography.caption, { color: colors.secondary }]}>
                        {item.message}
                    </Text>
                </View>
            );
        }

        return (
            <ChatMessage
                message={item}
                isOwnMessage={item.username === username}
            />
        );
    };

    const renderTypingIndicator = () => {
        const typingUsersArray = Array.from(typingUsers);
        if (typingUsersArray.length === 0) return null;

        const typingText = typingUsersArray.length === 1
            ? `${typingUsersArray[0]} is typing...`
            : `${typingUsersArray.length} people are typing...`;

        return (
            <View style={{ padding: 8 }}>
                <Text style={[typography.caption, { color: colors.secondary }]}>
                    {typingText}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <Appbar.Header>
                <Appbar.Content title="Chat Room" subtitle={`Logged in as ${username}`} />
                <Appbar.Action icon="logout" onPress={() => navigation.replace('Login')} />
            </Appbar.Header>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : null}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
            >
                <FlatList
                    ref={flatListRef}
                    data={messages}
                    renderItem={renderMessage}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ padding: 16 }}
                    onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
                    onLayout={() => flatListRef.current?.scrollToEnd()}
                />

                {renderTypingIndicator()}
                <ChatInput />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;
