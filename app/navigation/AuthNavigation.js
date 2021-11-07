import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FirstScreen from "../../app/screens/FirstScreen";
import LoginScreen from "../../app/screens/LoginScreen";
import RegisterScreen from "../../app/screens/RegisterScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserMaster from "../../app/UserScreenComponents/UserMaster";
import UserChallanList from "../../app/UserScreenComponents/UserChallanList";
import UploadChallan from "../../app/UserScreenComponents/UploadChallan";
import UserHistory from "../UserScreenComponents/UserHistory";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator options={{ headerShown: false }}>
      <Stack.Screen
        name="FirstScreen"
        component={FirstScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function AuthNavigation(props) {
  return (
    <NavigationContainer>
      <AuthNavigator />
    </NavigationContainer>
  );
}

export default AuthNavigation;
