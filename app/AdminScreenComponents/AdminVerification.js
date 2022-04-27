import React, { useState } from "react";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { StyleSheet, View, Text, Modal } from "react-native";
import AppButton from "../compnents/AppButton";
import { useNavigation } from "@react-navigation/core";
import Url from "../Authorization/ApiUrlEndpoints";
import axios from "axios";
import { setHistory } from "../ServerResponseData/History";
import LottiView from "lottie-react-native";
import { Color } from "../assets/colors";
import UserListItem from "../compnents/UserListItem";

function AdminVerification({ route }) {
  const navigation = useNavigation();
  const [visi, setvisi] = useState(false);

  const {
    vehicle_number,
    vehicle_type,
    vehicle_status,
    challan_amount,
    vehicle_location,
  } = route.params.cha;

  const handleUpload = async () => {
    setvisi(true);
    const { data } = await axios
      .post(Url + "/challans/allchallans/", {
        vehicle_number: vehicle_number,
        vehicle_type: vehicle_type,
        challan_amount: challan_amount,
        challan_status: vehicle_status,
        challan_location: vehicle_location,
      })
      .catch((error) => console.log(error));

    const d = new Date();
    const year = d.getFullYear();
    const months = d.getMonth();
    const day = d.getDate();
    const items = {
      ...route.params.cha,
      time: `${year}/${months + 1}/${day}`,
    };
    setHistory(items);
    setTimeout(() => {
      navigation.navigate("HOME");
    }, 3000);
  };
  return (
    <Screen
      style={{
        backgroundColor: Color.DuoBlack,
        marginTop: 0,
        alignItems: "center",
      }}
    >
      <Label value="Challan Verification" style={styles.label1} />
      <View style={{ width: "100%", marginTop: 10 }}>
        <UserListItem
          number={vehicle_number}
          type={vehicle_type}
          stetus={vehicle_status}
          price={challan_amount}
        />
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
          onPress={handleUpload}
        />
      </View>
      <Modal visible={visi}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Color.DuoBlack,
          }}
        >
          <LottiView
            autoPlay
            loop={false}
            source={require("../assets/anim/doneanim.json")}
          />
        </View>
      </Modal>
    </Screen>
  );
}
const styles = StyleSheet.create({
  btn: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: Color.Duolightb,
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
    color: Color.DuoBlack,
    fontWeight: "bold",
  },
  label1: {
    elevation: 5,
    marginTop: 20,
    fontSize: 17,
    backgroundColor: Color.DuoBlack,
    borderColor: Color.DuoGray,
    borderWidth: 3,
    borderRadius: 5,
    width: "80%",
    color: "white",
    paddingLeft: 70,
  },
});

export default AdminVerification;
