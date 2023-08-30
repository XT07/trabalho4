import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import FeedScreen from "./screens/FeedScreen";
import PostPhotoScreen from "./screens/PostPhotoScreen";
import RegisterScreen from "./screens/RegisterScreen";

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Feed" component={FeedScreen} />
        <Stack.Screen name="PostPhotoScreen" component={PostPhotoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
