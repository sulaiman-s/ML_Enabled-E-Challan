import React from "react";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { StyleSheet, View } from "react-native";
import Notification from "../compnents/Notification";
import AppButton from "../compnents/AppButton";
import AdminAlert from "../compnents/AdminAlert";
import { ScrollView } from "react-native-gesture-handler";
import { Color } from "../assets/colors";

function AdminMaster({ navigation }) {
  return (
    <View style={{ padding: 5, backgroundColor: Color.DuoBlack, flex: 1 }}>
      <AdminAlert />
      <Label value="Select Options" style={styles.label1} />
      <ScrollView style={{ marginTop: 15 }}>
        <View style={styles.btn_view}>
          <AppButton
            title="Generate Challan"
            style={styles.btn}
            textStyle={styles.btn_txt}
            height={90}
            width={166}
            onPress={() => navigation.navigate("capture")}
            image={require("../assets/bill.png")}
            image_style={{ height: 40, width: 40 }}
          />
          <AppButton
            title="Check Records"
            style={styles.btn}
            textStyle={styles.btn_txt}
            height={90}
            width={166}
            onPress={() => navigation.navigate("Record")}
            image={require("../assets/cr.png")}
            image_style={{ height: 40, width: 40 }}
          />
        </View>

        <View style={styles.btn_view}>
          <AppButton
            title="FAQ"
            style={styles.btn}
            textStyle={styles.btn_txt}
            height={90}
            width={166}
            onPress={() => navigation.navigate("help")}
            image={require("../assets/faqs.png")}
            image_style={{ height: 40, width: 40 }}
          />

          <AppButton
            title="Settings"
            style={styles.btn}
            textStyle={styles.btn_txt}
            height={90}
            width={166}
            onPress={() => navigation.navigate("setting")}
            image={require("../assets/settings.png")}
            image_style={{ height: 40, width: 40 }}
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
    shadowColor: Color.DuoGray,
    backgroundColor: Color.DuoBlack,
    elevation: 7,
    marginHorizontal: 5,
  },
  btn_view: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 10,
  },
  btn_txt: {
    fontSize: 16,
    color: "white",
  },
  label1: {
    marginTop: "10%",
    elevation: 0,
    backgroundColor: Color.DuoBlack,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: Color.DuoGray,
    width: "80%",
    height: "5.5%",
    color: "white",
    fontWeight: "bold",
    paddingLeft: "28%",
    paddingTop: 6,
  },
});

export default AdminMaster;
