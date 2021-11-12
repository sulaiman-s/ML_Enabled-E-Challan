import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserMaster from "../../app/UserScreenComponents/UserMaster";
import UserChallanList from "../../app/UserScreenComponents/UserChallanList";
import UploadChallan from "../../app/UserScreenComponents/UploadChallan";
import UserHistory from "../UserScreenComponents/UserHistory";
import Setting from "../screens/Setting";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const UserNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "tomato",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen name="Home" component={UserMaster} />
      <Stack.Screen name="Record" component={UserChallanList} />
      <Stack.Screen name="upload" component={UploadChallan} />
    </Stack.Navigator>
  );
};
const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
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
        component={UserNavigator}
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

export default UserTabNavigator;
