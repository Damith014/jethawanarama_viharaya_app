import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import LanguageScreen from '../screens/LanguageScreen'
const Stack = createStackNavigator();
function AuthStack() {
    return (
        <Stack.Navigator initialRouteName="Auth">
            <Stack.Screen
                name="Auth"
                component={LanguageScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
};
export default AuthStack;