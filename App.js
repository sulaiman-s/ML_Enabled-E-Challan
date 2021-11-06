import React from "react";
import { StyleSheet, View } from "react-native";
import UserListItem from "./app/compnents/UserListItem";
import FirstScreen from "./app/screens/FirstScreen";
import LoginScreen from "./app/screens/LoginScreen";
import RegisterScreen from "./app/screens/RegisterScreen";
import UserScreen from "./app/screens/UserScreen";

export default function App() {
  return <UserScreen />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "blue",
  },
});
