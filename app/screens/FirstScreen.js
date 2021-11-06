import React from "react";
import { View, StyleSheet, Text, ImageBackground } from "react-native";
import Screen from "../compnents/Screen";
import AppButton from "../compnents/AppButton";

function FirstScreen(props) {
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
        />
        <AppButton
          title="REGISTER"
          height={52}
          width={167}
          style={styles.btn}
          textStyle={styles.btn_txt}
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
    borderWidth: 2,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  btn_txt: { fontFamily: "Roboto", fontWeight: "bold" },
});

export default FirstScreen;
