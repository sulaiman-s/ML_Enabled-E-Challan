import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { Text, View, StyleSheet } from "react-native";
import AuthContext from "../Auth/Context";
import AdminAlert from "../compnents/AdminAlert";
import AppButton from "../compnents/AppButton";
import Label from "../compnents/label";
import Notification from "../compnents/Notification";
import Screen from "../compnents/Screen";

function UserMaster(props) {
  const navigation = useNavigation();
  const authContext = useContext(AuthContext);
  return (
    <Screen>
      <Label value="Hello UserName!" style={styles.lbl_h} />
      <AdminAlert />
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
          title="Check Record"
          style={styles.btn}
          textStyle={styles.btn_txt}
          height={74}
          width={166}
          onPress={() => navigation.navigate("Record")}
        />
        <AppButton
          title="Upload Receipt"
          style={styles.btn}
          textStyle={styles.btn_txt}
          height={74}
          width={166}
          onPress={() => navigation.navigate("upload")}
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

export default UserMaster;
