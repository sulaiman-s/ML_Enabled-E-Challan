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
const Tab = createBottomTabNavigator();
const STab = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="home"
        component={UserMaster}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Record"
        component={UserChallanList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="upload"
        component={UploadChallan}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={STab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
          tabBarActiveTintColor: "white",
          tabBarActiveBackgroundColor: "tomato",
          tabBarInactiveTintColor: "orange",
        }}
      />
      <Tab.Screen
        name="History"
        component={UserHistory}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
          tabBarActiveTintColor: "white",
          tabBarActiveBackgroundColor: "tomato",
          tabBarInactiveTintColor: "orange",
        }}
      />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
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
      <Stack.Screen
        name="main"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

function Navigation(props) {
  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}

export default Navigation;
