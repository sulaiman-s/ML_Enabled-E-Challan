import React, { useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  ScrollView,
  ImageBackground,
} from "react-native";
import AppButton from "../compnents/AppButton";
import AppInput from "../compnents/AppInput";
import Screen from "../compnents/Screen";
import AuthContext from "../Authorization/Context";
import axios from "axios";
import jwtDecode from "jwt-decode";
import Url from "../Authorization/ApiUrlEndpoints";
import * as Yup from "yup";
import { Formik } from "formik";
import { Color } from "../assets/colors";

function RegisterScreen({ navigation }) {
  const [usernameError, setUsernameError] = useState();
  const [emailError, setEmailError] = useState();
  const ErrorMessage = ({ error, visible }) => {
    if (!visible || !error) return null;
    return <Text style={{ color: "red" }}>{error}</Text>;
  };
  const UserNameError = () => {
    if (!usernameError) return null;
    return <Text style={{ color: "red" }}>{usernameError}</Text>;
  };
  const EmailError = () => {
    if (!emailError) return null;
    return <Text style={{ color: "red" }}>{emailError}</Text>;
  };
  let schema = Yup.object().shape({
    email: Yup.string().required().email().label("Email"),
    username: Yup.string()
      .required()
      .min(8)
      .matches("[^0-9]", "Add minimum one alphabet")
      .label("UserName"),
    password: Yup.string()
      .required()
      .min(8)
      .label("Password")
      .matches(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})",
        "Password should contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character"
      ),
    confirmPassword: Yup.string()
      .required()
      .label("ConfirmPassword")
      .oneOf([Yup.ref("password"), null], "Password must match"),
  });
  const authContext = useContext(AuthContext);

  const handleRegister = async ({
    email,
    username,
    password,
    confirmPassword,
  }) => {
    const { data } = await axios
      .post(Url + "/auth/users/", {
        email: email,
        username: username,
        password: confirmPassword,
      })
      .catch((error) => {
        console.log(error);
        setUsernameError(error.response.data.username);
        setEmailError(error.response.data.email);
      });
    if (data) {
      // const { data } = await axios
      //   .post(Url + "/user/create/", {
      //     username: username,
      //     password: password,
      //   })
      //   .catch((error) => {
      //     console.log(error);
      //   });
      // if (data) {
      //   const dat = jwtDecode(data.refresh);
      //   authContext.setUser(dat);
      // }
      navigation.navigate("Login");
    }
  };

  return (
    <Screen style={{ backgroundColor: Color.DuoBlack }}>
      {/* <View style={{ width: "100%", marginVertical: 20 }}>
        <Text style={styles.h_style}>Register</Text>
      </View> */}
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <UserNameError />
        <EmailError />
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) => handleRegister(values)}
          validationSchema={schema}
        >
          {({
            handleSubmit,
            handleChange,
            errors,
            setFieldTouched,
            touched,
          }) => (
            <>
              <AppInput
                placeholder="User Name"
                placeholderTextColor={Color.DuoGray}
                onChangeText={handleChange("username")}
                style={styles.input}
                iconName="information"
                iconColor={Color.DuoDarkb}
                onBlur={() => setFieldTouched("username")}
                viewStyle={{
                  width: "80%",
                  borderWidth: 0,
                  backgroundColor: Color.DuoBackGray,
                }}
              />
              <ErrorMessage
                error={errors.username}
                visible={touched.username}
              />
              <AppInput
                placeholder="Gmail"
                placeholderTextColor={Color.DuoGray}
                onChangeText={handleChange("email")}
                style={styles.input}
                iconName="gmail"
                iconColor={Color.DuoDarkb}
                onBlur={() => setFieldTouched("email")}
                viewStyle={{
                  width: "80%",
                  borderWidth: 0,
                  backgroundColor: Color.DuoBackGray,
                }}
              />
              <ErrorMessage error={errors.email} visible={touched.email} />
              <AppInput
                placeholder="Password"
                placeholderTextColor={Color.DuoGray}
                onChangeText={handleChange("password")}
                style={styles.input}
                iconName="key-variant"
                iconColor={Color.DuoDarkb}
                onBlur={() => setFieldTouched("password")}
                secureTextEntry
                viewStyle={{
                  width: "80%",
                  borderWidth: 0,
                  backgroundColor: Color.DuoBackGray,
                }}
              />
              <ErrorMessage
                error={errors.password}
                visible={touched.password}
              />
              <AppInput
                placeholder="Confirm Password"
                placeholderTextColor={Color.DuoGray}
                onChangeText={handleChange("confirmPassword")}
                style={styles.input}
                iconName="key-star"
                iconColor={Color.DuoDarkb}
                onBlur={() => setFieldTouched("confirmPassword")}
                secureTextEntry
                viewStyle={{
                  width: "80%",
                  borderWidth: 0,
                  backgroundColor: Color.DuoBackGray,
                }}
              />
              <ErrorMessage
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />
              <View
                style={{
                  width: "100%",
                  marginVertical: 10,
                  alignItems: "center",
                }}
              >
                <AppButton
                  title="Next"
                  textStyle={styles.btn_t}
                  height={50}
                  width={"35%"}
                  style={styles.btn}
                  onPress={handleSubmit}
                />
              </View>
              <View style={styles.option_view}>
                <Text style={styles.option_txt}>Already have an account?.</Text>
                <Text
                  style={styles.txt}
                  onPress={() => navigation.navigate("Login")}
                >
                  Click To Log In
                </Text>
              </View>
            </>
          )}
        </Formik>
      </ScrollView>
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
    backgroundColor: Color.Duolightb,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
  },
  btn_t: {
    color: Color.DuoBlack,
    fontWeight: "bold",
    fontSize: 17,
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
    width: "100%",
    height: 70,
    alignSelf: "center",
  },
  option_txt: {
    fontSize: 17,
    color: Color.DuoGray,
    fontFamily: "Roboto",
    // fontWeight: "bold",
  },
  txt: {
    fontSize: 17,
    fontFamily: "Roboto",
    color: Color.DuoDarkb,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
