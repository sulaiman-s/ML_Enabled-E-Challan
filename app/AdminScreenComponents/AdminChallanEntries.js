import React, { useState } from "react";
import { Modal, Text, TextInput, Picker } from "react-native";
import AppInput from "../compnents/AppInput";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { StyleSheet, View } from "react-native";
import AppButton from "../compnents/AppButton";
import { useNavigation } from "@react-navigation/core";
import { ScrollView } from "react-native-gesture-handler";

function AdminChallanEntries(props) {
  const navigation = useNavigation();
  const [vehicle_type, setVehicle_type] = useState();
  const [vehicle_status, setVehicle_status] = useState();
  return (
    <Screen>
      <Label
        value="Enter the remaining fields fo challan"
        style={{ elevation: 0, fontWeight: "bold", fontSize: 16, color: "red" }}
      />
      <ScrollView>
        <AppInput
          viewStyle={{ height: 60 }}
          placeholder="Vehicle Number"
          textAlign="center"
          style={{ width: "100%" }}
          caretHidden
        />
        <AppInput
          viewStyle={{ height: 60 }}
          placeholder="Enter Location"
          textAlign="center"
          style={{ width: "100%" }}
          caretHidden
        />
        <View
          style={{
            borderWidth: 2,
            height: 60,
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Picker
            selectedValue={vehicle_type}
            onValueChange={(itemValue, itemIndex) => setVehicle_type(itemValue)}
            style={{
              height: 60,
              width: "100%",
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
            width: "100%",
            marginVertical: 10,
          }}
        >
          <Picker
            selectedValue={vehicle_status}
            onValueChange={(itemValue, itemIndex) =>
              setVehicle_status(itemValue)
            }
            style={{
              height: 60,
              width: "100%",
            }}
            enabled={false}
          >
            <Picker.Item label="Not Paid" value="NotPaid" />
            <Picker.Item label="Paid" value="Paid" />
          </Picker>
        </View>
        <AppInput
          viewStyle={{ height: 60 }}
          placeholder="Enter Amount"
          textAlign="center"
          style={{ width: "100%" }}
          caretHidden
        />
        <AppButton
          title="Next"
          textStyle={styles.btn_t}
          height={50}
          width={"100%"}
          style={styles.btn}
          onPress={() => navigation.navigate("verify")}
        />
      </ScrollView>
    </Screen>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#fc5c65",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 25,
  },
  btn_t: {
    color: "white",
  },
});

export default AdminChallanEntries;
