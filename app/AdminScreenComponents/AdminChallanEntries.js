import React, { useState } from "react";
import { Text, Picker, Image } from "react-native";
import AppInput from "../compnents/AppInput";
import Screen from "../compnents/Screen";
import { StyleSheet, View } from "react-native";
import AppButton from "../compnents/AppButton";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";

function AdminChallanEntries({ route }) {
  const navigation = useNavigation();
  const [vehicle_type, setVehicle_type] = useState("Bike");
  const [vehicle_status, setVehicle_status] = useState("NotPaid");
  const plate = route.params.plate;

  console.log(plate);

  const ErrorMessage = ({ error, visible }) => {
    if (!visible || !error) return null;
    return <Text style={{ color: "red" }}>{error}</Text>;
  };

  const schema = Yup.object().shape({
    vehicle_number: Yup.string().required().label("Vehicle Number"),
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
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AppInput
                placeholder="Vehicle Number"
                style={styles.inp_s}
                onChangeText={handleChange("vehicle_number")}
                onBlur={() => setFieldTouched("vehicle_number")}
                viewStyle={styles.inp_v}
                value={plate}
              />
              <ErrorMessage
                error={errors.vehicle_number}
                visible={touched.vehicle_number}
              />

              <AppInput
                placeholder="Enter Location"
                style={styles.inp_s}
                onChangeText={handleChange("vehicle_location")}
                onBlur={() => setFieldTouched("vehicle_location")}
                viewStyle={styles.inp_v}
              />
              <ErrorMessage
                error={errors.vehicle_location}
                visible={touched.vehicle_location}
              />

              <AppInput
                placeholder="Enter Amount"
                style={styles.inp_s}
                onChangeText={handleChange("challan_amount")}
                onBlur={() => setFieldTouched("challan_amount")}
                viewStyle={styles.inp_v}
              />
              <ErrorMessage
                error={errors.challan_amount}
                visible={touched.challan_amount}
              />

              <View style={styles.picker_v}>
                <Picker
                  selectedValue={vehicle_type}
                  onValueChange={(itemValue, itemIndex) =>
                    setVehicle_type(itemValue)
                  }
                  style={styles.picker_s}
                >
                  <Picker.Item label="Bike" value="Bike" />
                  <Picker.Item label="Car" value="Car" />
                  <Picker.Item label="Truck" value="Truck" />
                </Picker>
              </View>

              <View style={styles.picker_v}>
                <Picker
                  selectedValue={vehicle_status}
                  onValueChange={(itemValue, itemIndex) =>
                    setVehicle_status(itemValue)
                  }
                  style={styles.picker_s}
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
  inp_v: {
    width: "80%",
    borderRadius: 25,
    paddingLeft: 20,
    height: 60,
  },
  inp_s: { width: "100%" },
  picker_s: {
    height: 50,
    width: "90%",
  },
  picker_v: {
    borderWidth: 2,
    height: 60,
    width: "80%",
    marginVertical: 10,
    borderRadius: 30,
    paddingLeft: 15,
  },
});

export default AdminChallanEntries;
