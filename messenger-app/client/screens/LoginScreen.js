import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import globalStyles, { colors, typography } from '../styles/globalStyles';
import socketService from '../services/socket';

const LoginScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');

    const handleJoinChat = () => {
        if (username.trim()) {
            try {
                // Connect to socket
                socketService.connect();
                
                // Join chat with username
                socketService.joinChat(username.trim());
                
                // Navigate to chat screen
                navigation.replace('Chat', { username: username.trim() });
            } catch (error) {
                Alert.alert(
                    'Connection Error',
                    'Failed to connect to chat server. Please try again.',
                    [{ text: 'OK' }]
                );
            }
        } else {
            Alert.alert(
                'Invalid Username',
                'Please enter a valid username',
                [{ text: 'OK' }]
            );
        }
    };

    return (
        <SafeAreaView style={globalStyles.container}>
            <View style={globalStyles.centerContent}>
                <Text style={[typography.header, { marginBottom: 32 }]}>
                    Join Chat
                </Text>
                
                <TextInput
                    style={[
                        globalStyles.input,
                        globalStyles.shadow,
                        { width: '100%', marginBottom: 16 }
                    ]}
                    placeholder="Enter your username"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                    autoCorrect={false}
                    maxLength={20}
                />

                <TouchableOpacity
                    style={[
                        globalStyles.button,
                        globalStyles.shadow,
                        { width: '100%' }
                    ]}
                    onPress={handleJoinChat}
                >
                    <Text style={globalStyles.buttonText}>
                        Join Chat
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;
