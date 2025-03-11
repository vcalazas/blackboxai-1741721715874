import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, Keyboard } from 'react-native';
import { IconButton } from 'react-native-paper';
import globalStyles, { colors, spacing } from '../styles/globalStyles';
import socketService from '../services/socket';

const ChatInput = () => {
    const [message, setMessage] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleTyping = useCallback((text) => {
        setMessage(text);
        
        // Handle typing indicator
        if (text.length > 0 && !isTyping) {
            setIsTyping(true);
            socketService.updateTyping(true);
        } else if (text.length === 0 && isTyping) {
            setIsTyping(false);
            socketService.updateTyping(false);
        }
    }, [isTyping]);

    const handleSend = useCallback(() => {
        if (message.trim()) {
            socketService.sendMessage(message.trim());
            setMessage('');
            setIsTyping(false);
            socketService.updateTyping(false);
            Keyboard.dismiss();
        }
    }, [message]);

    return (
        <View style={[globalStyles.chatInput, globalStyles.shadow]}>
            <TextInput
                style={[
                    globalStyles.input,
                    {
                        flex: 1,
                        marginRight: spacing.sm,
                        backgroundColor: colors.background
                    }
                ]}
                placeholder="Type a message..."
                value={message}
                onChangeText={handleTyping}
                multiline
                maxLength={500}
            />
            <TouchableOpacity
                onPress={handleSend}
                disabled={!message.trim()}
            >
                <IconButton
                    icon="send"
                    size={24}
                    iconColor={message.trim() ? colors.primary : colors.secondary}
                />
            </TouchableOpacity>
        </View>
    );
};

export default ChatInput;
