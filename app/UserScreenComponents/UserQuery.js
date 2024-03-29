import React from "react";
import { View, StyleSheet, Text, Platform, StatusBar } from "react-native";
import AppInput from "../compnents/AppInput";
import { Formik } from "formik";
import AppButton from "../compnents/AppButton";
import * as Yup from "yup";
import axios from "axios";
import Url from "../Authorization/ApiUrlEndpoints";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../assets/colors";

function UserQuery({ navigation }) {
  const ErrorMessage = ({ error, visible }) => {
    if (!visible || !error) return null;
    return <Text style={{ color: "red" }}>{error}</Text>;
  };
  let schema = Yup.object().shape({
    name: Yup.string().required().label("UserName"),
    email: Yup.string().email().required().label("email"),
    mesage: Yup.string().required().label("mesage"),
  });

  const handleUserQuery = async ({ name, email, mesage }) => {
    let Data = new FormData();
    Data.append("name", name);
    Data.append("email", email);
    Data.append("mesage", mesage);
    const { data } = await axios.post(Url + "/cw/query/", Data);
    navigation.navigate("HOME");
  };
  return (
    <View style={styles.cont}>
      <View
        style={{
          alignSelf: "flex-start",
          marginBottom: 20,
          flexDirection: "row",
        }}
      >
        <Ionicons name="chevron-back" size={20} color="white" />
        <Text style={{ color: "white" }} onPress={() => navigation.goBack()}>
          Go Back
        </Text>
      </View>
      <Formik
        initialValues={{ name: "", email: "", mesage: "" }}
        onSubmit={(values) => handleUserQuery(values)}
        validationSchema={schema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AppInput
              style={styles.s}
              placeholder="Name"
              placeholderTextColor="white"
              onChangeText={handleChange("name")}
              onBlur={() => setFieldTouched("email")}
              viewStyle={styles.v}
            />
            <ErrorMessage error={errors.name} visible={touched.name} />
            <AppInput
              placeholder="Email"
              placeholderTextColor="white"
              style={styles.s}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
              viewStyle={styles.v}
            />
            <ErrorMessage error={errors.email} visible={touched.email} />
            <AppInput
              placeholder="Message"
              placeholderTextColor="white"
              style={{
                width: "100%",
                textAlignVertical: "top",
                color: "white",
              }}
              onChangeText={handleChange("mesage")}
              viewStyle={styles.msg_v}
              numberOfLines={10}
              multiline
            />
            <ErrorMessage error={errors.mesage} visible={touched.mesage} />
            <AppButton
              title="Submit"
              onPress={handleSubmit}
              style={styles.btn_s}
              height={50}
              width="50%"
              textStyle={styles.btn_t}
            />
          </View>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    flex: 1,
    padding: 10,
    backgroundColor: Color.DuoBlack,
  },
  btn_s: {
    backgroundColor: Color.Duolightb,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 5,
    borderRadius: 25,
  },
  btn_t: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  msg_v: {
    width: "80%",
    height: "30%",
    justifyContent: "flex-start",
    paddingRight: 0,
    paddingTop: 10,
    paddingBottom: 0,
    borderRadius: 20,
    backgroundColor: Color.DuoBackGray,
    borderColor: Color.DuoGray,
  },
  s: {
    height: "100%",
    width: "100%",
    backgroundColor: Color.DuoBackGray,
    borderColor: Color.DuoGray,
    color: "white",
  },
  v: {
    width: "80%",
    borderRadius: 25,
    backgroundColor: Color.DuoBackGray,
    borderColor: Color.DuoGray,
  },
});

export default UserQuery;
