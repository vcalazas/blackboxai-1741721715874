import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#1e88e5',
    secondary: '#757575',
    background: '#f5f5f5',
    white: '#ffffff',
    black: '#000000',
    error: '#d32f2f',
    success: '#43a047',
    messageReceived: '#e3f2fd',
    messageSent: '#e8f5e9',
    textPrimary: '#212121',
    textSecondary: '#757575',
    divider: '#e0e0e0'
};

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32
};

export const typography = {
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
    },
    body: {
        fontSize: 16,
    },
    caption: {
        fontSize: 12,
        color: colors.textSecondary,
    }
};

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: spacing.md,
    },
    input: {
        backgroundColor: colors.white,
        borderRadius: 8,
        padding: spacing.sm,
        marginVertical: spacing.xs,
    },
    button: {
        backgroundColor: colors.primary,
        borderRadius: 8,
        padding: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: '600',
    },
    shadow: {
        shadowColor: colors.black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    messageContainer: {
        padding: spacing.sm,
        marginVertical: spacing.xs,
        maxWidth: '80%',
        borderRadius: 12,
    },
    messageSent: {
        backgroundColor: colors.messageSent,
        alignSelf: 'flex-end',
        marginLeft: '20%',
    },
    messageReceived: {
        backgroundColor: colors.messageReceived,
        alignSelf: 'flex-start',
        marginRight: '20%',
    },
    chatInput: {
        flexDirection: 'row',
        padding: spacing.sm,
        backgroundColor: colors.white,
        borderTopWidth: 1,
        borderTopColor: colors.divider,
    },
    errorText: {
        color: colors.error,
        fontSize: 14,
        marginTop: spacing.xs,
    },
});
