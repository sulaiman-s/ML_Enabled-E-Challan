import React, { useContext } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
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
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import AuthContext from "../Authorization/Context";
import { TouchableNativeFeedback } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Image, View, Text } from "react-native";
import Legal from "../screens/Legal";
import Help from "../screens/Help";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const drawer = createDrawerNavigator();

const AdminNavigator = () => {
  const navigation = useNavigation();
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "tomato",
        },
        headerTintColor: "white",
      }}
    >
      <Stack.Screen
        name="HOME"
        component={AdminMaster}
        options={{
          headerLeft: () => (
            <TouchableNativeFeedback>
              <MaterialCommunityIcons
                name="menu"
                size={30}
                color="white"
                onPress={() => navigation.openDrawer()}
                style={{ paddingRight: 10, fontWeight: "bold" }}
              />
            </TouchableNativeFeedback>
          ),
        }}
      />
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
          width: "90%",
          left: "5%",
          borderRadius: 5,
          bottom: "1%",
        },
      }}
    >
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
    </Tab.Navigator>
  );
};

const Def = () => {
  return <></>;
};

const CustomDrawer = (props) => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  return (
    <DrawerContentScrollView {...props}>
      <View
        style={{
          width: "100%",
        }}
      >
        <Image
          source={require("../assets/bck.jpg")}
          style={{ width: "100%", height: 150 }}
        />
        <View style={{ position: "absolute", top: 90 }}>
          <Text style={{ color: "white" }}>@{user.name}</Text>
          <Text style={{ color: "white" }}>{user.email}</Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const handleLogout = () => {
  const authContext = useContext(AuthContext);
  authContext.setUser(null);
  return <Def />;
};
const AdminDrawer = () => {
  return (
    <drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="HoMe"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <drawer.Screen
        name="HoMe"
        component={AdminTabNavigator}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <drawer.Screen
        name="Legal"
        component={Legal}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="leaf" size={size} color={color} />
          ),
        }}
      />
      <drawer.Screen
        name="Help"
        component={Help}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <drawer.Screen
        name="Setting"
        component={Setting}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="settings-outline" size={size} color={color} />
          ),
        }}
      />
      <drawer.Screen
        name="Log Out"
        component={handleLogout}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="exit-outline" size={size} color={color} />
          ),
        }}
      />
    </drawer.Navigator>
  );
};

export default AdminDrawer;
