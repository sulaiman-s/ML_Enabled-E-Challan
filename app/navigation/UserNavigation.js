import React, { useContext, useEffect, useState } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import axios from "axios";
import Url from "../Authorization/ApiUrlEndpoints";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/core";
import {
  Image,
  TouchableNativeFeedback,
  View,
  AsyncStorage,
} from "react-native";
import { Text } from "react-native";
import Legal from "../screens/Legal";
import Help from "../screens/Help";
import { Color } from "../assets/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const drawer = createDrawerNavigator();

const UserNavigator = () => {
  const navigation = useNavigation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Color.DuoBlack,
        },
        headerTintColor: Color.DuoGray,
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
      <Stack.Screen
        name="Help"
        component={UserQuery}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="help"
        component={Help}
        options={{ headerShown: false, title: "FAQ" }}
      />
      <Stack.Screen
        name="setting"
        component={Setting}
        options={{ title: "Settings", headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const UserTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          backgroundColor: Color.DuoBlack,
          borderTopColor: Color.DuoGray,
          borderTopWidth: 2,
        },
        tabBarActiveTintColor: Color.Duolightb,
        tabBarInactiveTintColor: Color.DuoGray,
      }}
    >
      <Tab.Screen
        name="Home"
        component={UserNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={UserHistory}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="history" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Def = () => {
  const authContext = useContext(AuthContext);
  AsyncStorage.removeItem("JwtToken").catch((error) => console.log(error));
  return <>{authContext.setUser(null)}</>;
};

const CustomDrawer = (props) => {
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const Profile = authContext.profilePic;
  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: Color.DuoBackGray }}
    >
      <View
        style={{
          width: "100%",
        }}
      >
        {Profile ? (
          <Image
            source={{ uri: Profile.profile_img }}
            style={{
              width: 150,
              height: 150,
              borderRadius: 100,
              alignSelf: "center",
            }}
          />
        ) : (
          <Ionicons
            name="person"
            color={Color.DuoGray}
            size={90}
            style={{ alignSelf: "center", height: 150 }}
          />
        )}
        <View style={{ left: 10 }}>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            @{user.name}
          </Text>
          <Text style={{ color: "white", fontWeight: "bold" }}>
            {user.email}
          </Text>
        </View>
      </View>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

const UserDrawer = () => {
  return (
    <drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          color: Color.DuoGray,
        },
      }}
      initialRouteName="HoMe"
      drawerContent={(props) => <CustomDrawer {...props} />}
    >
      <drawer.Screen
        name="HoMe"
        component={UserTabNavigator}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={Color.DuoDarkb} />
          ),
        }}
      />

      <drawer.Screen
        name="Legal"
        component={Legal}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="leaf" size={size} color={Color.DuoDarkb} />
          ),
        }}
      />
      <drawer.Screen
        name="Help"
        component={UserQuery}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="information-circle-outline"
              size={size}
              color={Color.DuoDarkb}
            />
          ),
        }}
      />
      <drawer.Screen
        name="Setting"
        component={Setting}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons
              name="settings-outline"
              size={size}
              color={Color.DuoDarkb}
            />
          ),
        }}
      />
      <drawer.Screen
        name="Log Out"
        component={Def}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="exit-outline" size={size} color={Color.DuoDarkb} />
          ),
        }}
      />
    </drawer.Navigator>
  );
};

export default UserDrawer;
