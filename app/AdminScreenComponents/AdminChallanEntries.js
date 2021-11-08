import React from "react";
import { Modal, Text, TextInput } from "react-native";
import AppInput from "../compnents/AppInput";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { StyleSheet, View } from "react-native";
import AppButton from "../compnents/AppButton";
import { useNavigation } from "@react-navigation/core";

function AdminChallanEntries(props) {
  const navigation = useNavigation();
  return (
    <Screen>
      <Text>Setting Information</Text>
      <Label
        value="Enter the remaining fields fo challan"
        style={{ elevation: 0, fontWeight: "bold", fontSize: 16, color: "red" }}
      />
      <AppInput
        viewStyle={{ height: 100 }}
        placeholder="Vehicle Number"
        textAlign="center"
        style={{ width: "100%" }}
        caretHidden
      />
      <AppInput
        viewStyle={{ height: 100 }}
        placeholder="Enter Type"
        textAlign="center"
        style={{ width: "100%" }}
        caretHidden
      />
      <AppInput
        viewStyle={{ height: 100 }}
        placeholder="Enter Reason"
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
