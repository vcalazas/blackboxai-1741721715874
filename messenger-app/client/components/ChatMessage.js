import React from 'react';
import { View, Text } from 'react-native';
import globalStyles, { colors, typography, spacing } from '../styles/globalStyles';

const ChatMessage = ({ message, isOwnMessage }) => {
    const messageTime = new Date(message.timestamp).toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit'
    });

    return (
        <View
            style={[
                globalStyles.messageContainer,
                isOwnMessage ? globalStyles.messageSent : globalStyles.messageReceived,
                globalStyles.shadow
            ]}
        >
            {!isOwnMessage && (
                <Text style={[typography.caption, { color: colors.primary }]}>
                    {message.username}
                </Text>
            )}
            <Text style={[typography.body, { color: colors.textPrimary }]}>
                {message.message}
            </Text>
            <Text style={[typography.caption, { alignSelf: 'flex-end', marginTop: spacing.xs }]}>
                {messageTime}
            </Text>
        </View>
    );
};

export default ChatMessage;
