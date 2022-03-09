import React, { useContext, useState } from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import AppInput from "../compnents/AppInput";
import Screen from "../compnents/Screen";
import AppButton from "../compnents/AppButton";
import AuthContext from "../Authorization/Context";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Url from "../Authorization/ApiUrlEndpoints";
import Token, { SetToken } from "../Authorization/JwtToken";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const authContext = useContext(AuthContext);
  const handleLogin = async () => {
    const { data } = await axios
      .post(Url + "/user/create/", {
        username: username,
        password: password,
      })
      .catch((error) => {
        if (error) setError("Account not found");
      });
    if (data.refresh) {
      const dat = jwtDecode(data.refresh);
      authContext.setUser(dat);
      SetToken(data.refresh);
    }
  };

  return (
    <Screen>
      <ImageBackground
        source={require("../assets/lbg.jpeg")}
        resizeMode="cover"
        style={{
          width: "100%",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* <View style={{ width: "100%", marginVertical: 25 }}>
        <Text style={styles.h_style}>Log in</Text>
      </View> */}
        <AppInput
          placeholder="Username"
          style={styles.t_inp}
          onChangeText={(text) => setUsername(text)}
          iconName="security"
          viewStyle={{
            width: "80%",
            borderColor: "white",
            backgroundColor: "white",
          }}
        />
        <AppInput
          placeholder="Password"
          style={styles.t_inp}
          onChangeText={(text) => setPassword(text)}
          iconName="key"
          secureTextEntry
          viewStyle={{
            width: "80%",
            borderColor: "white",
            backgroundColor: "white",
          }}
        />
        {error != null ? <Text style={{ color: "red" }}>{error}</Text> : null}
        <View style={styles.btn}>
          <AppButton
            title="Login"
            style={styles.btn_style}
            textStyle={styles.btn_text_Style}
            height={50}
            width={"80%"}
            onPress={handleLogin}
          />
          <View style={styles.option_view}>
            <Text style={styles.option_txt}>Dont have an account?.</Text>
            <Text
              style={styles.txt}
              onPress={() => navigation.navigate("Register")}
            >
              Click To Create
            </Text>
          </View>
        </View>
      </ImageBackground>
    </Screen>
  );
}
const styles = StyleSheet.create({
  h_style: {
    width: "80%",
    fontSize: 30,
    alignSelf: "center",
    fontFamily: "Roboto",
    marginTop: "10%",
    fontWeight: "bold",
    color: "white",
  },

  t_inp: {
    height: 60,
    width: "100%",
    paddingBottom: 25,
    marginLeft: 10,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "35%",
  },
  btn_style: {
    backgroundColor: "#2dc3d4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  btn_text_Style: {
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
  option_view: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 350,
    height: 70,
    alignSelf: "center",
  },
  option_txt: {
    fontSize: 17,
    fontFamily: "Roboto",
    fontWeight: "bold",
  },
  txt: {
    fontSize: 17,
    fontFamily: "Roboto",
    color: "blue",
    fontWeight: "bold",
  },
});

export default LoginScreen;
