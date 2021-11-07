import React from "react";
import { Modal, Text, TextInput } from "react-native";
import AppInput from "../app/compnents/AppInput";
import Label from "../app/compnents/label";
import Screen from "../app/compnents/Screen";
import { StyleSheet, View } from "react-native";
import AppButton from "../app/compnents/AppButton";

function AdminVerification(props) {
  return (
    <Screen>
      <Text>Setting Information</Text>
      <Label
        value="Verfy and Upload challan"
        style={{ elevation: 0, fontWeight: "bold", fontSize: 16 }}
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
      {/* <View style={styles.ch_view}>
        <View style={styles.ch_h}>
          <Text style={styles.ch_h_txt}>Challan No #</Text>
        </View>
        <View style={styles.ch_itm}>
          <Text style={styles.ch_itm_txt}>Number:</Text>
          <Text style={styles.ch_itm_txt}>Type:</Text>
        </View>
        <View style={styles.ch_itm}>
          <Text style={styles.ch_itm_txt}>Date:</Text>
          <Text style={styles.ch_itm_txt}>Amount:</Text>
        </View>
      </View> */}
      <AppButton
        title="Next"
        textStyle={styles.btn_t}
        height={50}
        width={"100%"}
        style={styles.btn}
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
  ch_view: {
    width: "100%",
    height: 160,
    borderWidth: 2,
    borderRadius: 1,
    borderStyle: "dashed",
    marginTop: 30,
    marginBottom: 40,
  },
  ch_h: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ch_h_txt: {
    fontSize: 25,
    fontFamily: "Roboto",
  },
  ch_itm: {
    marginVertical: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  ch_itm_txt: {
    fontSize: 20,
    fontFamily: "Roboto",
  },
});

export default AdminVerification;
