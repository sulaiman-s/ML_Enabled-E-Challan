import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
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
    <Screen>
      <ImageBackground
        source={require("../assets/bg.jpg")}
        resizeMode="cover"
        style={styles.bg_img}
      >
        <Text style={styles.h_text}>AVND</Text>
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
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
  h_text: {
    fontWeight: "bold",
    fontFamily: "Roboto",
    fontSize: 30,
    marginBottom: "95%",
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
    backgroundColor: "rgb(82,174,211)",
  },
  btn_txt: {
    fontFamily: "Roboto",
    color: "white",
    fontSize: 18,
  },
});

export default FirstScreen;
