import React, { useContext, useState } from "react";
import {
  Text,
  StyleSheet,
  View,
  Platform,
  StatusBar,
  ScrollView,
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
      <ScrollView style={{ width: "100%" }}>
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
                onChangeText={handleChange("username")}
                style={styles.input}
                iconName="information"
                onBlur={() => setFieldTouched("username")}
              />
              <ErrorMessage
                error={errors.username}
                visible={touched.username}
              />
              <AppInput
                placeholder="Gmail"
                onChangeText={handleChange("email")}
                style={styles.input}
                iconName="gmail"
                onBlur={() => setFieldTouched("email")}
              />
              <ErrorMessage error={errors.email} visible={touched.email} />
              <AppInput
                placeholder="Password"
                onChangeText={handleChange("password")}
                style={styles.input}
                iconName="key-variant"
                onBlur={() => setFieldTouched("password")}
                secureTextEntry
              />
              <ErrorMessage
                error={errors.password}
                visible={touched.password}
              />
              <AppInput
                placeholder="Confirm Password"
                onChangeText={handleChange("confirmPassword")}
                style={styles.input}
                iconName="key-star"
                onBlur={() => setFieldTouched("confirmPassword")}
                secureTextEntry
              />
              <ErrorMessage
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />
              <View style={{ width: "99%", marginVertical: 10 }}>
                <AppButton
                  title="Next"
                  textStyle={styles.btn_t}
                  height={50}
                  width={"100%"}
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
    width: "100%",
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
