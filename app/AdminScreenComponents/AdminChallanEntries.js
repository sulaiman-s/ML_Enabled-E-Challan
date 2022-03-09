import React, { useState } from "react";
import { Modal, Text, TextInput, Picker, Image } from "react-native";
import AppInput from "../compnents/AppInput";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { StyleSheet, View } from "react-native";
import AppButton from "../compnents/AppButton";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";

function AdminChallanEntries(props) {
  const navigation = useNavigation();
  const [vehicle_type, setVehicle_type] = useState("Bike");
  const [vehicle_status, setVehicle_status] = useState("NotPaid");

  const ErrorMessage = ({ error, visible }) => {
    if (!visible || !error) return null;
    return <Text style={{ color: "red" }}>{error}</Text>;
  };

  const schema = Yup.object().shape({
    vehicle_number: Yup.string()
      .required()
      .max(8)
      .min(2)
      .label("Vehicle Number"),
    vehicle_location: Yup.string().max(15).required(),
    challan_amount: Yup.string()
      .required()
      .label("Amount")
      .max(3)
      .min(3)
      .matches("^[0-9]+$", "Amount should not contain alphabets"),
  });
  const handleChallan = (ch) => {
    if (!vehicle_type) return;
    const cha = { ...ch, vehicle_status, vehicle_type };
    navigation.navigate("verify", { cha });
  };
  return (
    <Screen>
      {/* <Label
        value="Enter the remaining fields fo challan"
        style={{
          elevation: 0,
          fontWeight: "bold",
          fontSize: 16,
          color: "white",
          backgroundColor: "rgb(82,174,211)",
          borderRadius: 5,
        }}
      /> */}
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <Formik
          initialValues={{
            vehicle_number: "",
            vehicle_location: "",
            challan_amount: "",
          }}
          onSubmit={(values) => handleChallan(values)}
          validationSchema={schema}
        >
          {({
            handleChange,
            touched,
            setFieldTouched,
            handleSubmit,
            errors,
          }) => (
            <View
              style={{
                lex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppInput
                viewStyle={{ height: 60 }}
                placeholder="Vehicle Number"
                style={{ width: "100%" }}
                caretHidden
                onChangeText={handleChange("vehicle_number")}
                onBlur={() => setFieldTouched("vehicle_number")}
                viewStyle={{
                  width: "80%",
                  borderRadius: 25,
                  paddingLeft: 20,
                }}
              />
              <ErrorMessage
                error={errors.vehicle_number}
                visible={touched.vehicle_number}
              />
              <AppInput
                viewStyle={{ height: 60 }}
                placeholder="Enter Location"
                style={{ width: "100%" }}
                caretHidden
                onChangeText={handleChange("vehicle_location")}
                onBlur={() => setFieldTouched("vehicle_location")}
                viewStyle={{
                  width: "80%",
                  borderRadius: 25,
                  paddingLeft: 20,
                }}
              />
              <ErrorMessage
                error={errors.vehicle_location}
                visible={touched.vehicle_location}
              />
              <AppInput
                viewStyle={{ height: 60 }}
                placeholder="Enter Amount"
                style={{ width: "100%" }}
                caretHidden
                onChangeText={handleChange("challan_amount")}
                onBlur={() => setFieldTouched("challan_amount")}
                viewStyle={{
                  width: "80%",
                  borderRadius: 25,
                  paddingLeft: 20,
                }}
              />
              <ErrorMessage
                error={errors.challan_amount}
                visible={touched.challan_amount}
              />
              <View
                style={{
                  borderWidth: 2,
                  height: 60,
                  width: "80%",
                  marginVertical: 10,
                  borderRadius: 30,
                  paddingLeft: 15,
                }}
              >
                <Picker
                  selectedValue={vehicle_type}
                  onValueChange={(itemValue, itemIndex) =>
                    setVehicle_type(itemValue)
                  }
                  style={{
                    height: 50,
                    width: "90%",
                  }}
                >
                  <Picker.Item label="Bike" value="Bike" />
                  <Picker.Item label="Car" value="Car" />
                  <Picker.Item label="Truck" value="Truck" />
                </Picker>
              </View>
              <View
                style={{
                  borderWidth: 2,
                  height: 60,
                  width: "80%",
                  marginVertical: 10,
                  borderRadius: 30,
                  paddingLeft: 15,
                }}
              >
                <Picker
                  selectedValue={vehicle_status}
                  onValueChange={(itemValue, itemIndex) =>
                    setVehicle_status(itemValue)
                  }
                  style={{
                    height: 50,
                    width: "90%",
                  }}
                  enabled={false}
                >
                  <Picker.Item label="Not Paid" value="NotPaid" />
                  <Picker.Item label="Paid" value="Paid" />
                </Picker>
              </View>

              <AppButton
                title="Next"
                textStyle={styles.btn_t}
                height={50}
                width={"35%"}
                style={styles.btn}
                onPress={handleSubmit}
              />
            </View>
          )}
        </Formik>
        <Image
          source={require("../assets/cetf.png")}
          resizeMode="center"
          style={{
            width: 100,
            height: 130,
            alignSelf: "center",
          }}
        ></Image>
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "rgb(71,118,172)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 25,
  },
  btn_t: {
    color: "white",
  },
});

export default AdminChallanEntries;
