import React, { useContext } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import UserMaster from "../../app/UserScreenComponents/UserMaster";
import UserChallanList from "../../app/UserScreenComponents/UserChallanList";
import UploadChallan from "../../app/UserScreenComponents/UploadChallan";
import UserHistory from "../UserScreenComponents/UserHistory";
import Setting from "../screens/Setting";
import AuthContext from "../Authorization/Context";
import UserQuery from "../UserScreenComponents/UserQuery";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/core";
import { Image, TouchableNativeFeedback, View } from "react-native";
import { Text } from "react-native";
import Legal from "../screens/Legal";
import Help from "../screens/Help";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const drawer = createDrawerNavigator();

const UserNavigator = () => {
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
        component={UserMaster}
        options={{
          headerLeft: () => (
            <TouchableNativeFeedback>
              <MaterialCommunityIcons
                name="menu"
                size={30}
                color="black"
                onPress={() => navigation.toggleDrawer()}
                style={{ paddingRight: 10, color: "white" }}
              />
            </TouchableNativeFeedback>
          ),
        }}
      />
      <Stack.Screen name="Record" component={UserChallanList} />
      <Stack.Screen name="upload" component={UploadChallan} />
      <Stack.Screen name="query" component={UserQuery} />
    </Stack.Navigator>
  );
};
const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          width: "90%",
          left: "5%",
          borderRadius: 5,
          bottom: "1%",
        },
        tabBarHideOnKeyboard: true,
      }}
    >
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
const UserDrawer = () => {
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
        component={UserTabNavigator}
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

export default UserDrawer;
