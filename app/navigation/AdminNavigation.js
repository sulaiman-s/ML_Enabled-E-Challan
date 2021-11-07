import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserHistory from "../UserScreenComponents/UserHistory";
import AdminMaster from "../../AdminScreenComponents/AdminMaster";
import AdminCapture from "../../AdminScreenComponents/AdminCapture";
import UserChallanList from "../../app/UserScreenComponents/UserChallanList";
import AdminChallanEntries from "../../AdminScreenComponents/AdminChallanEntries";
import AdminVerification from "../../AdminScreenComponents/AdminVerification";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AdminNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="home"
        component={AdminMaster}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="capture"
        component={AdminCapture}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="entry"
        component={AdminChallanEntries}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="verify"
        component={AdminVerification}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Record"
        component={UserChallanList}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const AdminTabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Home"
        component={AdminNavigator}
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

function AdminNavigation(props) {
  return (
    <NavigationContainer>
      <AdminTabNavigator />
    </NavigationContainer>
  );
}

export default AdminNavigation;