import React, { useState } from "react";
import { Platform, StatusBar, View, Text, Modal } from "react-native";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";

function Help(props) {
  const navigation = useNavigation();
  const [feature, setFeature] = useState(false);
  const [faq, setFaq] = useState(false);
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
        value="Features"
        style={{ alignSelf: "center", paddingLeft: 10, borderRadius: 10 }}
        onPress={() => setFeature(true)}
      />
      <Label
        value="Frequently Ask Questions"
        style={{ alignSelf: "center", paddingLeft: 10, borderRadius: 10 }}
        onPress={() => setFaq(true)}
      />
      <Modal visible={feature}>
        <View
          style={{
            alignSelf: "flex-start",
            marginBottom: 20,
            flexDirection: "row",
          }}
        >
          <Ionicons name="chevron-back" size={20} color="blue" />
          <Text style={{ color: "blue" }} onPress={() => setFeature(false)}>
            Go Back
          </Text>
        </View>
        <Text style={{ alignSelf: "center" }}>Features</Text>
      </Modal>
      <Modal visible={faq}>
        <View
          style={{
            alignSelf: "flex-start",
            marginBottom: 20,
            flexDirection: "row",
          }}
        >
          <Ionicons name="chevron-back" size={20} color="blue" />
          <Text style={{ color: "blue" }} onPress={() => setFaq(false)}>
            Go Back
          </Text>
        </View>
        <Text style={{ alignSelf: "center" }}>FAQ</Text>
      </Modal>
    </Screen>
  );
}

export default Help;
