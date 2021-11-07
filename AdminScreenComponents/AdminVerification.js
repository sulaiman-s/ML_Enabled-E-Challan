import React from "react";
import AppInput from "../app/compnents/AppInput";
import Label from "../app/compnents/label";
import Screen from "../app/compnents/Screen";
import { StyleSheet, View, Text } from "react-native";
import AppButton from "../app/compnents/AppButton";
import { useNavigation } from "@react-navigation/core";

function AdminVerification(props) {
  const navigation = useNavigation();
  return (
    <Screen>
      <Label
        value="Verification"
        style={{
          elevation: 5,
          marginTop: 20,
          fontWeight: "bold",
          fontSize: 17,
        }}
      />
      <View style={styles.ch_view}>
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
      </View>
      <View style={styles.btn_view}>
        <AppButton
          title="Go Back"
          style={styles.btn}
          textStyle={styles.btn_txt}
          height={60}
          width={166}
          onPress={() => navigation.goBack()}
        />
        <AppButton
          title="Upload to Database"
          style={styles.btn}
          textStyle={styles.btn_txt}
          height={60}
          width={166}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
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
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "lightslategray",
  },
  btn_view: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 20,
  },
  btn_txt: {
    fontSize: 16,
    color: "white",
  },
});

export default AdminVerification;
