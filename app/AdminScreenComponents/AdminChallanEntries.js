import React, { useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Text, Picker, Image } from "react-native";
import AppInput from "../compnents/AppInput";
import Screen from "../compnents/Screen";
import MapView, { Callout, Polygon } from "react-native-maps";
import * as Location from "expo-location";
import { StyleSheet, View, ScrollView } from "react-native";
import AppButton from "../compnents/AppButton";
import { useNavigation } from "@react-navigation/core";
// import { ScrollView } from "react-native-gesture-handler";

import { Formik } from "formik";
import * as Yup from "yup";
import { Color } from "../assets/colors";

function AdminChallanEntries({ route, navigation }) {
  // const navigation = useNavigation();
  const location = route.params.location;
  const arr = location.split(",");
  const lati = Number(arr[0].replace(/"/g, ""));
  const longi = Number(arr[1].replace(/"/g, ""));
  const [veh_number, setVehicle_number] = useState(route.params.plate);
  const [vehicle_type, setVehicle_type] = useState("Bike");
  const [violation, setViolation] = useState("Traffic Violation");
  const [vehicle_status, setVehicle_status] = useState("NotPaid");
  const [loc, setloc] = useState("");
  // const plate = route.params.plate;

  const ErrorMessage = ({ error, visible }) => {
    if (!visible || !error) return null;
    return <Text style={{ color: "red" }}>{error}</Text>;
  };
  const get_prm = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access location was denied");
      return;
    }
  };
  const get_location = async () => {
    let location = await Location.getCurrentPositionAsync({});
    // let latitude = location.coords.latitude;
    // let longitude = location.coords.longitude;
    // const obj = {
    //   latitude: latitude,
    //   longitude: longitude,
    // };
    let add = await Location.reverseGeocodeAsync({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
    setloc(`${add[0].street},${add[0].city},${add[0].region}`);
  };
  const schema = Yup.object().shape({
    challan_amount: Yup.string()
      .required()
      .label("Amount")
      .max(5)
      .min(3)
      .matches("^[0-9]+$", "Amount should not contain alphabets"),
  });

  const handleChallan = (ch) => {
    if (!vehicle_type || veh_number.length < 1) return;
    const cha = {
      vehicle_number: veh_number,
      vehicle_location: loc,
      vehicle_status,
      vehicle_type,
      challan_amount: ch.challan_amount,
      violation_type: violation,
    };
    navigation.navigate("verify", { cha });
  };
  useFocusEffect(
    React.useCallback(() => {
      get_prm();
      get_location();

      return () => console.log("gone");
    }, [])
  );
  return (
    <Screen
      style={{ backgroundColor: Color.DuoBlack, marginTop: 0, paddingTop: 10 }}
    >
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <View
          style={{
            width: "90%",
            borderWidth: 2,
            borderColor: Color.DuoGray,
            borderRadius: 15,
            overflow: "hidden",
            height: 300,
            alignSelf: "center",
          }}
        >
          <MapView
            style={{
              width: "100%",
              height: 300,
              alignSelf: "center",
              borderWidth: 2,
              borderRadius: 15,
              borderColor: Color.DuoGray,
            }}
            initialRegion={{
              latitude: lati,
              longitude: longi,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider="google"
            mapType="hybrid"
            // showsUserLocation={true}
          >
            <MapView.Marker
              key={1}
              coordinate={{ latitude: lati, longitude: longi }}
              pinColor="green"
            />
          </MapView>
        </View>
        <Formik
          initialValues={{
            challan_amount: "",
          }}
          onSubmit={(values) => {
            handleChallan(values);
            console.log("working");
          }}
          validationSchema={schema}
        >
          {({
            handleChange,
            touched,
            setFieldTouched,
            handleSubmit,
            submitForm,
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
                placeholderTextColor={Color.DuoGray}
                style={styles.inp_s}
                onChangeText={(t) => {
                  handleChange("vehicle_number");
                  setVehicle_number(t);
                }}
                onBlur={() => setFieldTouched("vehicle_number")}
                viewStyle={styles.inp_v}
                value={veh_number}
              />
              {veh_number.length < 1 ? (
                <Text style={{ color: "red" }}>Vehicle Number is required</Text>
              ) : undefined}
              <ErrorMessage
                error={errors.vehicle_number}
                visible={touched.vehicle_number}
              />
              <AppInput
                placeholder="Enter Amount"
                placeholderTextColor={Color.DuoGray}
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
                  mode="dropdown"
                >
                  <Picker.Item label="Bike" value="Bike" />
                  <Picker.Item label="Car" value="Car" />
                  <Picker.Item label="Truck" value="Truck" />
                </Picker>
              </View>

              <View style={styles.picker_v}>
                <Picker
                  selectedValue={violation}
                  onValueChange={(itemValue, itemIndex) =>
                    setViolation(itemValue)
                  }
                  style={styles.picker_s}
                  mode="dropdown"
                >
                  <Picker.Item
                    label="Traffic Violation"
                    value="Traffic Violation"
                  />
                  <Picker.Item label="Over Speeding" value="Over Speeding" />
                  <Picker.Item label="Wrong Way" value="Wrong Way" />
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
    height: 55,
    backgroundColor: Color.DuoBackGray,
    borderColor: Color.DuoGray,
  },
  inp_s: {
    width: "100%",
    backgroundColor: Color.DuoBackGray,
    color: "white",
    borderRadius: 25,
  },
  picker_s: {
    height: 45,
    width: "100%",
    color: Color.DuoGray,
    borderRadius: 25,
    marginLeft: 15,
    backgroundColor: Color.DuoBackGray,
  },
  picker_v: {
    borderWidth: 2,
    height: 55,
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderRadius: 25,

    backgroundColor: Color.DuoBackGray,
    borderColor: Color.DuoGray,
  },
});

export default AdminChallanEntries;
