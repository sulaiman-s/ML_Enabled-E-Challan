import React, { useContext, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Modal,
  ScrollView,
} from "react-native";
import AppInput from "../compnents/AppInput";
import Screen from "../compnents/Screen";
import AppButton from "../compnents/AppButton";
import AuthContext from "../Authorization/Context";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Url from "../Authorization/ApiUrlEndpoints";
import { Ionicons } from "@expo/vector-icons";
import Token, { SetToken, SetAccess } from "../Authorization/JwtToken";
import { WebView } from "react-native-webview";
import { Color } from "../assets/colors";

function LoginScreen({ navigation }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [forgot, setforgot] = useState(false);
  const authContext = useContext(AuthContext);
  const handleLogin = async () => {
    console.log("ww");
    const { data } = await axios
      .post(Url + "/user/create/", {
        username: username,
        password: password,
      })
      .catch((error) => {
        if (error) setError("Account not found");
      });
    if (data != undefined || data != null) {
      const dat = jwtDecode(data.refresh);
      authContext.setUser(dat);
      axios
        .get(Url + "/user/profile/" + dat.name)
        .then((res) => {
          if (res.data.length > 0) {
            authContext.setProfilePic(res.data[0]);
          } else {
            authContext.setProfilePic(null);
          }
        })
        .catch((error) => console.log(error));
      SetToken(data.refresh);
      SetAccess(data.access);
    }
  };

  return (
    <Screen
      style={{
        backgroundColor: Color.DuoBlack,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{
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
            placeholderTextColor={Color.DuoGray}
            style={styles.t_inp}
            onChangeText={(text) => setUsername(text)}
            iconName="security"
            iconColor={Color.DuoDarkb}
            viewStyle={{
              width: "80%",
              borderWidth: 0,
              backgroundColor: Color.DuoBackGray,
            }}
          />
          <AppInput
            placeholder="Password"
            placeholderTextColor={Color.DuoGray}
            style={styles.t_inp}
            onChangeText={(text) => setPassword(text)}
            iconName="key"
            iconColor={Color.DuoDarkb}
            secureTextEntry
            viewStyle={{
              width: "80%",
              borderWidth: 0,
              backgroundColor: Color.DuoBackGray,
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
            <Text
              onPress={() => setforgot(true)}
              style={{ color: Color.DuoDarkb }}
            >
              Forgot Password?
            </Text>
          </View>
        </ScrollView>
        <Modal visible={forgot}>
          <View style={{ flex: 1, backgroundColor: Color.DuoBlack }}>
            <View
              style={{
                alignSelf: "flex-start",
                flexDirection: "row",
                backgroundColor: Color.DuoBlack,
                width: "100%",
              }}
            >
              <Ionicons name="chevron-back" size={20} color={Color.DuoGray} />
              <Text
                style={{ color: Color.DuoGray }}
                onPress={() => setforgot(false)}
              >
                Go Back
              </Text>
            </View>
            <WebView source={{ uri: Url + "/user/password_reset/" }} />
          </View>
        </Modal>
      </View>
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
    color: "white",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    width: "35%",
  },
  btn_style: {
    backgroundColor: Color.DuoDarkb,
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
    // fontWeight: "bold",
    color: Color.DuoGray,
  },
  txt: {
    fontSize: 17,
    fontFamily: "Roboto",
    color: Color.DuoDarkb,
    fontWeight: "bold",
  },
});

export default LoginScreen;
