import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import LoginScreen from './LoginScreen';
import FeedScreen from './FeedScreen';
import PostPhotoScreen from './PostPhotoScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Other">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} /> 
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="PostPhotoScreen" component={PostPhotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;