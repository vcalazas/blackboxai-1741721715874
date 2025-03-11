import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoginScreen from './screens/LoginScreen';
import ChatScreen from './screens/ChatScreen';
import { colors } from './styles/globalStyles';

const Stack = createNativeStackNavigator();

const theme = {
    colors: {
        primary: colors.primary,
        background: colors.background,
    },
};

export default function App() {
    return (
        <SafeAreaProvider>
            <PaperProvider theme={theme}>
                <NavigationContainer>
                    <Stack.Navigator
                        initialRouteName="Login"
                        screenOptions={{
                            headerShown: false,
                            contentStyle: { backgroundColor: colors.background }
                        }}
                    >
                        <Stack.Screen 
                            name="Login" 
                            component={LoginScreen}
                        />
                        <Stack.Screen 
                            name="Chat" 
                            component={ChatScreen}
                            options={{
                                gestureEnabled: false,
                            }}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </PaperProvider>
        </SafeAreaProvider>
    );
}
