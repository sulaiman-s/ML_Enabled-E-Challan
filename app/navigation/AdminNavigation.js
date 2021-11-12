import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserHistory from "../UserScreenComponents/UserHistory";
import AdminMaster from "../AdminScreenComponents/AdminMaster";
import AdminCapture from "../AdminScreenComponents/AdminCapture";
import UserChallanList from "../UserScreenComponents/UserChallanList";
import AdminChallanEntries from "../AdminScreenComponents/AdminChallanEntries";
import AdminVerification from "../AdminScreenComponents/AdminVerification";
import Setting from "../screens/Setting";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "tomato",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Home" component={AdminMaster} />
      <Stack.Screen
        name="capture"
        component={AdminCapture}
        options={{ title: "Capture" }}
      />
      <Stack.Screen
        name="entry"
        component={AdminChallanEntries}
        options={{ title: "Challan Fields " }}
      />
      <Stack.Screen
        name="verify"
        component={AdminVerification}
        options={{ title: "Final Verification" }}
      />
      <Stack.Screen
        name="Record"
        component={UserChallanList}
        options={{ title: "Check Records" }}
      />
    </Stack.Navigator>
  );
};
const AdminTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          alignSelf: "center",
          width: "90%",
          borderRadius: 5,
          bottom: "1%",
        },
      }}
    >
      <Tab.Screen
        name="History"
        component={UserHistory}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
          tabBarItemStyle: { borderRadius: 5 },
          tabBarActiveTintColor: "white",
          tabBarActiveBackgroundColor: "tomato",
          tabBarInactiveTintColor: "orange",
        }}
      />
      <Tab.Screen
        name="Home"
        component={AdminNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
          tabBarItemStyle: { borderRadius: 5 },
          tabBarActiveTintColor: "white",
          tabBarActiveBackgroundColor: "tomato",
          tabBarInactiveTintColor: "orange",
        }}
      />
      <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialCommunityIcons
              name="account-settings"
              size={size}
              color={color}
            />
          ),
          tabBarItemStyle: { borderRadius: 5 },
          tabBarActiveTintColor: "white",
          tabBarActiveBackgroundColor: "tomato",
          tabBarInactiveTintColor: "orange",
        }}
      />
    </Tab.Navigator>
  );
};

export default AdminTabNavigator;
