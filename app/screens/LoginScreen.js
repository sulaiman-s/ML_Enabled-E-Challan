import React, { useState } from "react";
import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import AppInput from "../compnents/AppInput";
import AppButton from "../compnents/AppButton";
function LoginScreen(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [Values, setValues] = useState({ uname: "", pass: "" });
  return (
    <View style={styles.container}>
      <View style={{ width: "100%", marginVertical: 25 }}>
        <Text style={styles.h_style}>Log in</Text>
      </View>
      <AppInput
        placeholder="Username"
        style={styles.t_inp}
        onChangeText={(text) => setUsername(text)}
        iconName="security"
      />
      <AppInput
        placeholder="Password"
        style={styles.t_inp}
        onChangeText={(text) => setPassword(text)}
        iconName="key"
        secureTextEntry
      />
      <View style={styles.btn}>
        <AppButton
          title="Login"
          style={styles.btn_style}
          textStyle={styles.btn_text_Style}
          height={50}
          width={"100%"}
          onPress={() => setValues({ uname: username, pass: password })}
        />
        <View
          style={{
            marginTop: 50,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 1,
            borderWidth: 2,
            width: 350,
            height: 70,
            borderColor: "gray",
            alignSelf: "center",
            borderStyle: "dashed",
          }}
        >
          <Text style={{ fontSize: 15, fontFamily: "Roboto" }}>
            Dont have an account?.
          </Text>
          <Text style={{ fontSize: 15, fontFamily: "Roboto", color: "blue" }}>
            Click To Create
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    alignItems: "center",
    width: "100%",
    padding: 10,
    paddingTop: 20,
  },
  h_style: {
    width: "100%",
    fontSize: 30,
    fontFamily: "Roboto",
  },

  t_inp: {
    height: 60,
    width: "100%",
    paddingBottom: 25,
    marginLeft: 10,
  },
  btn: {
    justifyContent: "space-around",
    marginTop: 10,
    width: "100%",
  },
  btn_style: {
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
  },
  btn_text_Style: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default LoginScreen;
