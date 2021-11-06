import React from "react";
import { Text, View, StyleSheet } from "react-native";
import AdminAlert from "../compnents/AdminAlert";
import AppButton from "../compnents/AppButton";
import Label from "../compnents/label";
import Notification from "../compnents/Notification";
import Screen from "../compnents/Screen";

function UserMaster(props) {
  return (
    <>
      <Label value="Hello UserName!" style={styles.lbl_h} />
      <AdminAlert />
      <Notification />
      <Label
        value="Click below to check your challan status"
        style={{
          marginTop: 30,
          elevation: 5,
        }}
      />
      <View style={styles.btn_view}>
        <AppButton
          title="Check Record"
          style={styles.btn}
          textStyle={styles.btn_txt}
          height={74}
          width={166}
        />
        <AppButton
          title="Upload Receipt"
          style={styles.btn}
          textStyle={styles.btn_txt}
          height={74}
          width={166}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  lbl_h: {
    backgroundColor: "#fc5c65",
    color: "white",
    marginTop: 5,
    fontSize: 25,
    paddingTop: 10,
    paddingLeft: 100,
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#4ecdc4",
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

export default UserMaster;
