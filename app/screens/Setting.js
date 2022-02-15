import React from "react";
import { Platform, StatusBar, View, Text } from "react-native";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

function Setting(props) {
  const navigation = useNavigation();
  return (
    <Screen
      style={{
        marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <View
        style={{
          alignSelf: "flex-start",
          marginBottom: 20,
          flexDirection: "row",
        }}
      >
        <Ionicons name="chevron-back" size={20} color="blue" />
        <Text style={{ color: "blue" }} onPress={() => navigation.goBack()}>
          Go Back
        </Text>
      </View>
      <Label
        value="Profile"
        style={{ backgroundColor: "rgb(82,174,211)", borderRadius: 5 }}
      />
    </Screen>
  );
}

export default Setting;
