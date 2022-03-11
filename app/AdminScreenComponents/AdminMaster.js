import React from "react";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { StyleSheet, View } from "react-native";
import Notification from "../compnents/Notification";
import AppButton from "../compnents/AppButton";
import AdminAlert from "../compnents/AdminAlert";
import { ScrollView } from "react-native-gesture-handler";

function AdminMaster({ navigation }) {
  return (
    <View style={{ padding: 5, backgroundColor: "lightgray", flex: 1 }}>
      <AdminAlert />
      <Label value="Select Options" style={styles.label1} />
      <ScrollView style={{ marginTop: 15 }}>
        <View style={styles.btn_view}>
          <AppButton
            title="Generate Challan"
            style={styles.btn}
            textStyle={styles.btn_txt}
            height={80}
            width={166}
            onPress={() => navigation.navigate("capture")}
          />
          <AppButton
            title="Check Records"
            style={styles.btn}
            textStyle={styles.btn_txt}
            height={80}
            width={166}
            onPress={() => navigation.navigate("Record")}
          />
        </View>

        <View style={styles.btn_view}>
          <AppButton
            title="FAQ"
            style={styles.btn}
            textStyle={styles.btn_txt}
            height={80}
            width={166}
            onPress={() => navigation.navigate("help")}
          />

          <AppButton
            title="Settings"
            style={styles.btn}
            textStyle={styles.btn_txt}
            height={80}
            width={166}
            onPress={() => navigation.navigate("setting")}
          />
        </View>
      </ScrollView>
    </View>
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
    backgroundColor: "white",
    elevation: 10,
  },
  btn_view: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",

    // marginTop: 10,
  },
  btn_txt: {
    fontSize: 16,
    color: "black",
  },
  label1: {
    marginTop: "10%",
    elevation: 0,
    backgroundColor: "rgb(71,118,172)",
    borderRadius: 5,
    width: "80%",
    height: "5.5%",
    color: "white",
    fontWeight: "bold",
    paddingLeft: "28%",
    paddingTop: 6,
  },
});

export default AdminMaster;
