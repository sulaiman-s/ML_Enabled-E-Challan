import React, { useContext, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import AppInput from "../compnents/AppInput";
import Screen from "../compnents/Screen";
import AppButton from "../compnents/AppButton";
import AuthContext from "../Auth/Context";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Url from "../Auth/ApiUrlEndpoints";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const authContext = useContext(AuthContext);
  const handleLogin = async () => {
    const { data } = await axios
      .post(Url + "/user/create/", {
        username: username,
        password: password,
      })
      .catch((error) => {
        console.log(error);
      });
    if (data.refresh) {
      const dat = jwtDecode(data.refresh);
      authContext.setUser(dat);
    }
  };
  return (
    <Screen>
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
    </Screen>
  );
}
const styles = StyleSheet.create({
  h_style: {
    width: "100%",
    fontSize: 30,
    fontFamily: "Roboto",
    marginTop: "10%",
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
    backgroundColor: "#4ecdc4",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2,
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

export default LoginScreen;
