import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import Screen from "../compnents/Screen";
import AppButton from "../compnents/AppButton";
import { useNavigation } from "@react-navigation/native";

function FirstScreen({ navigation }) {
  const navigate = useNavigation();

  const handleLogin = () => {
    navigation.navigate("Login");
  };
  const handleRegister = () => {
    navigation.navigate("Register");
  };
  return (
    <Screen>
      <ImageBackground
        source={require("../assets/bb.jpg")}
        resizeMode="cover"
        style={styles.bg_img}
      >
        <Text style={styles.h_text}>App Name</Text>
      </ImageBackground>
      <View style={styles.btn_view}>
        <AppButton
          title="LOG IN"
          height={52}
          width={167}
          style={styles.btn}
          textStyle={styles.btn_txt}
          onPress={handleLogin}
        />
        <AppButton
          title="REGISTER"
          height={52}
          width={167}
          style={styles.btn}
          textStyle={styles.btn_txt}
          onPress={handleRegister}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bg_img: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    opacity: 0.7,
    alignItems: "center",
  },
  h_text: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 30,
  },
  btn_view: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  btn: {
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0fff",
  },
  btn_txt: { fontFamily: "Roboto", fontWeight: "bold", color: "black" },
});

export default FirstScreen;
