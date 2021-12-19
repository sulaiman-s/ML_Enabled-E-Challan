import React, { useContext, useState } from "react";
import { Text, StyleSheet, View, Platform, StatusBar } from "react-native";
import AppButton from "../compnents/AppButton";
import AppInput from "../compnents/AppInput";
import Screen from "../compnents/Screen";
import AuthContext from "../Authorization/Context";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Url from "../Authorization/ApiUrlEndpoints";

function RegisterScreen({ navigation }) {
  const [username, setusername] = useState("");
  const [gmail, setGmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [rdata, setData] = useState();
  const authContext = useContext(AuthContext);
  const reg = new FormData();
  reg.append("email", gmail);
  reg.append("password", password);
  reg.append("username", username);
  const handleRegister = async () => {
    const { data } = await axios
      .post(Url + "/auth/users/", {
        email: gmail,
        username: username,
        password: confirmPass,
      })
      .catch((error) => {
        console.log(error);
      });
    if (data) {
      const { data } = await axios
        .post(Url + "/user/create/", {
          username: username,
          password: password,
        })
        .catch((error) => {
          console.log(error);
        });
      if (data) {
        const dat = jwtDecode(data.refresh);
        authContext.setUser(dat);
      }
    }
  };

  return (
    <Screen>
      <View style={{ width: "100%", marginVertical: 20 }}>
        <Text style={styles.h_style}>Register</Text>
      </View>
      <AppInput
        placeholder="User Name"
        onChangeText={(text) => setusername(text)}
        style={styles.input}
        iconName="information"
      />
      <AppInput
        placeholder="Gmail"
        onChangeText={(text) => setGmail(text)}
        style={styles.input}
        iconName="gmail"
      />
      <AppInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        iconName="key-variant"
      />
      <AppInput
        placeholder="Confirm Password"
        onChangeText={(text) => setConfirmPass(text)}
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
          onPress={handleRegister}
        />
      </View>
      <View style={styles.option_view}>
        <Text style={styles.option_txt}>Already have an account?.</Text>
        <Text style={styles.txt} onPress={() => navigation.navigate("Login")}>
          Click To Log In
        </Text>
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
    backgroundColor: "#4ecdc4",
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
    marginTop: "10%",
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
