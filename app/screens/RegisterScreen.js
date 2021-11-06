import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, StyleSheet, View, Platform, StatusBar } from "react-native";
import AppButton from "../compnents/AppButton";
import AppInput from "../compnents/AppInput";
import Screen from "../compnents/Screen";
useNavigation;
function RegisterScreen(props) {
  const [FullName, setFullName] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const navigation = useNavigation();
  return (
    <Screen>
      <View style={{ width: "100%", marginVertical: 20 }}>
        <Text style={styles.h_style}>Register</Text>
      </View>
      <AppInput
        placeholder="Full Name"
        onTextChange={(text) => setFullName(text)}
        style={styles.input}
        iconName="information"
      />
      <AppInput
        placeholder="Gmail"
        onTextChange={(text) => setGmail(text)}
        style={styles.input}
        iconName="gmail"
      />
      <AppInput
        placeholder="Password"
        onTextChange={(text) => setPassword(text)}
        style={styles.input}
        iconName="key-variant"
      />
      <AppInput
        placeholder="Confirm Password"
        onTextChange={(text) => setConfirmPass(text)}
        style={styles.input}
        iconName="key-star"
      />
      <View style={{ width: "99%", marginVertical: 10 }}>
        <AppButton
          title="Next"
          textStyle={styles.btn_t}
          height={50}
          width={"100%"}
          style={styles.btn}
          onPress={() => navigation.navigate("main")}
        />
      </View>
      <View style={styles.option_view}>
        <Text style={styles.option_txt}>Already have an account?.</Text>
        <Text style={styles.txt}>Click To Log In</Text>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  cont: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    width: "100%",
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
    padding: 10,
  },
  input: {
    height: 50,
    width: "100%",
    paddingBottom: 20,
    marginLeft: 10,
  },
  btn: {
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btn_t: {
    color: "white",
  },
  h_style: {
    width: "100%",
    fontSize: 30,
    fontFamily: "Roboto",
  },
  option_view: {
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
  },
  option_txt: {
    fontSize: 15,
    fontFamily: "Roboto",
  },
  txt: {
    fontSize: 15,
    fontFamily: "Roboto",
    color: "blue",
  },
});

export default RegisterScreen;
