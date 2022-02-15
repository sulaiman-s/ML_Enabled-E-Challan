import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import AuthContext from "../Authorization/Context";
import AdminAlert from "../compnents/AdminAlert";
import AppButton from "../compnents/AppButton";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";

function UserMaster(props) {
  const navigation = useNavigation();
  return (
    <Screen>
      <AdminAlert />
      <Label
        value="Select Options"
        style={{
          marginTop: "15%",
          elevation: 0,
          backgroundColor: "rgb(71,118,172)",
          borderRadius: 5,
        }}
      />
      <View style={styles.btn_view}>
        <AppButton
          title="Check Record"
          style={styles.btn}
          textStyle={styles.btn_txt}
          height={90}
          width={166}
          onPress={() => navigation.navigate("Record")}
        />
        <AppButton
          title="Help"
          style={styles.btn}
          textStyle={styles.btn_txt}
          height={90}
          width={166}
          onPress={() => navigation.navigate("Help")}
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
        />
        <AppButton
          title="Settings"
          style={styles.btn}
          textStyle={styles.btn_txt}
          height={90}
          width={166}
          onPress={() => navigation.navigate("setting")}
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
    marginBottom: "5%",
  },
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "rgb(82,174,211)",
  },
  btn_view: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 10,
  },
  btn_txt: {
    fontSize: 16,
    color: "white",
  },
});

export default UserMaster;
