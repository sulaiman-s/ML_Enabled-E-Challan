import React, { useState } from "react";
import { Platform, StatusBar, View, Text, Modal } from "react-native";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import Url from "../Authorization/ApiUrlEndpoints";
import { Color } from "../assets/colors";
function Legal(props) {
  const navigation = useNavigation();
  const [privacyPolicy, setPrivacyPolicy] = useState(false);
  const [termService, setTermService] = useState(false);
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
        value="Privacy Policy"
        style={{ alignSelf: "center", paddingLeft: 10, borderRadius: 10 }}
        onPress={() => setPrivacyPolicy(true)}
      />
      <Label
        value="Terms & Services"
        style={{ alignSelf: "center", paddingLeft: 10, borderRadius: 10 }}
        onPress={() => setTermService(true)}
      />
      <Modal visible={privacyPolicy}>
        <View
          style={{
            alignSelf: "flex-start",
            marginBottom: 20,
            flexDirection: "row",
            backgroundColor: Color.DuoBlack,
            width: "100%",
            marginBottom: 0,
          }}
        >
          <Ionicons name="chevron-back" size={20} color={Color.DuoDarkb} />
          <Text
            style={{ color: Color.DuoDarkb }}
            onPress={() => setPrivacyPolicy(false)}
          >
            Go Back
          </Text>
        </View>
        <WebView source={{ uri: Url + "/user/privacy/" }} />
      </Modal>
      <Modal visible={termService}>
        <View
          style={{
            alignSelf: "flex-start",
            marginBottom: 20,
            flexDirection: "row",
          }}
        >
          <Ionicons name="chevron-back" size={20} color="blue" />
          <Text style={{ color: "blue" }} onPress={() => setTermService(false)}>
            Go Back
          </Text>
        </View>
        <Text style={{ alignSelf: "center" }}>term service</Text>
      </Modal>
    </Screen>
  );
}

export default Legal;
