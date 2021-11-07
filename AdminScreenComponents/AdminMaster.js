import React from "react";
import Label from "../app/compnents/label";
import Screen from "../app/compnents/Screen";
import { StyleSheet, View } from "react-native";
import Notification from "../app/compnents/Notification";
import AppButton from "../app/compnents/AppButton";

function AdminMaster(props) {
  return (
    <Screen>
      <Label value="Hello Admin!" style={styles.lbl_h} />
      <Notification />
      <Label
        value="Select Options"
        style={{
          marginTop: 30,
          elevation: 0,
        }}
      />
      <View style={styles.btn_view}>
        <AppButton
          title="Capture Image"
          style={styles.btn}
          textStyle={styles.btn_txt}
          height={74}
          width={166}
        />
        <AppButton
          title="Check Records"
          style={styles.btn}
          textStyle={styles.btn_txt}
          height={74}
          width={166}
        />
      </View>
    </Screen>
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
    marginBottom: 30,
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

export default AdminMaster;
