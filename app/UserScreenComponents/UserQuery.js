import React from "react";
import { View, StyleSheet, Text } from "react-native";
import AppInput from "../compnents/AppInput";
import { Formik } from "formik";
import AppButton from "../compnents/AppButton";
import * as Yup from "yup";
import axios from "axios";
import Url from "../Authorization/ApiUrlEndpoints";
import { Ionicons } from "@expo/vector-icons";

function UserQuery({ navigation }) {
  const ErrorMessage = ({ error, visible }) => {
    if (!visible || !error) return null;
    return <Text style={{ color: "red" }}>{error}</Text>;
  };
  let schema = Yup.object().shape({
    name: Yup.string()
      .required()
      .matches("[^0-9]", "Add minimum one alphabet")
      .label("UserName"),
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
        <Ionicons name="chevron-back" size={20} color="blue" />
        <Text style={{ color: "blue" }} onPress={() => navigation.goBack()}>
          Go Back
        </Text>
      </View>
      <Formik
        initialValues={{ name: "", email: "", mesage: "" }}
        onSubmit={(values) => handleUserQuery(values)}
        validationSchema={schema}
      >
        {({ handleChange, handleSubmit, errors, setFieldTouched, touched }) => (
          <>
            <AppInput
              style={{ width: "100%" }}
              placeholder="Name"
              onChangeText={handleChange("name")}
              onBlur={() => setFieldTouched("email")}
            />
            <ErrorMessage error={errors.name} visible={touched.name} />
            <AppInput
              placeholder="email"
              style={{ width: "100%" }}
              onChangeText={handleChange("email")}
              onBlur={() => setFieldTouched("email")}
            />
            <ErrorMessage error={errors.email} visible={touched.email} />
            <AppInput
              placeholder="mesage"
              style={{ width: "100%" }}
              onChangeText={handleChange("mesage")}
            />
            <ErrorMessage error={errors.mesage} visible={touched.mesage} />
            <AppButton
              title="submit"
              onPress={handleSubmit}
              style={{
                backgroundColor: "rgb(71,118,172)",
                justifyContent: "center",
                alignItems: "center",
                borderWidth: 1,
                borderRadius: 5,
                alignSelf: "center",
                marginTop: 5,
              }}
              height={60}
              width="100%"
              textStyle={{ fontSize: 18, color: "white" }}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    marginTop: 30,
    flex: 1,
    padding: 10,
  },
});

export default UserQuery;
