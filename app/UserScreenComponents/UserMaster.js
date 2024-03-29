import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import AuthContext from "../Authorization/Context";
import AdminAlert from "../compnents/AdminAlert";
import AppButton from "../compnents/AppButton";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { Color } from "../assets/colors";

function UserMaster(props) {
  const navigation = useNavigation();
  return (
    <Screen
      style={{
        padding: 10,
        marginTop: 0,
        backgroundColor: Color.DuoBlack,
      }}
    >
      <AdminAlert />
      <Label value="Select Option" style={styles.label1} />
      <ScrollView>
        <View
          style={{
            marginTop: 5,
            borderRadius: 15,
            height: 300,
            justifyContent: "space-evenly",
          }}
        >
          <View style={styles.btn_view}>
            <AppButton
              title="Check Record"
              style={styles.btn}
              textStyle={styles.btn_txt}
              height={90}
              width={166}
              onPress={() => navigation.navigate("Record")}
              image={require("../assets/cr.png")}
              image_style={{ height: 40, width: 40 }}
            />
            <AppButton
              title="Help"
              style={styles.btn}
              textStyle={styles.btn_txt}
              height={90}
              width={166}
              onPress={() => navigation.navigate("Help")}
              image={require("../assets/help.png")}
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
        </View>
      </ScrollView>
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
    backgroundColor: Color.DuoBlack,
    shadowColor: Color.DuoGray,
    elevation: 7,
    marginHorizontal: 5,
  },
  btn_view: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginVertical: 5,
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
    width: "80%",
    height: "5.5%",
    color: "white",
    fontWeight: "bold",
    paddingLeft: "28%",
    paddingTop: 6,
    borderWidth: 3,
    borderColor: Color.DuoGray,
  },
});

export default UserMaster;
