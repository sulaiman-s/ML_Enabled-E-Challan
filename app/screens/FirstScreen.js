import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Platform,
  StatusBar,
} from "react-native";
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
    <Screen style={{ backgroundColor: "#2dc3d4" }}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.h_text}>AVND</Text>
        <Image
          source={require("../assets/fff.png")}
          resizeMode="contain"
          style={styles.bg_img}
        ></Image>
      </View>
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
          width={150}
          style={[styles.btn, { opacity: 0.8 }]}
          textStyle={styles.btn_txt}
          onPress={handleRegister}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  bg_img: {
    width: 250,
    height: 250,
  },
  h_text: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 30,
    color: "white",
    paddingBottom: 10,
  },
  btn_view: {
    flex: 0.7,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "black",
  },
  btn: {
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgb(82,174,211)",
    backgroundColor: "white",
    borderRadius: 25,
    marginVertical: 12,
  },
  btn_txt: {
    fontFamily: "Roboto",
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default FirstScreen;
