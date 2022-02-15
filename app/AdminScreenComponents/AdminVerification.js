import React from "react";
import AppInput from "../compnents/AppInput";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { StyleSheet, View, Text } from "react-native";
import AppButton from "../compnents/AppButton";
import { useNavigation } from "@react-navigation/core";
import Url from "../Authorization/ApiUrlEndpoints";
import axios from "axios";
import get_historyItems, { setHistory } from "../ServerResponseData/History";

function AdminVerification({ route }) {
  const navigation = useNavigation();
  const {
    vehicle_number,
    vehicle_type,
    vehicle_status,
    challan_amount,
    vehicle_location,
  } = route.params.cha;
  const handleUpload = async () => {
    const { data } = await axios
      .post(Url + "/challans/allchallans/", {
        vehicle_number: vehicle_number,
        vehicle_type: vehicle_type,
        challan_amount: challan_amount,
        challan_status: vehicle_status,
        challan_location: vehicle_location,
      })
      .catch((error) => console.log(error));
    console.log(data);
    alert("submitted successfully");
    const d = new Date();
    const year = d.getFullYear();
    const months = d.getMonth();
    const day = d.getDate();
    const items = {
      ...route.params.cha,
      time: `${year}/${months + 1}/${day}`,
    };
    console.log(items);
    setHistory(items);
    const tt = get_historyItems();
    console.log(tt[0]);
    // navigation.navigate("HOME");
  };
  return (
    <Screen>
      <Label
        value="Challan Verification"
        style={{
          elevation: 5,
          marginTop: 20,
          fontWeight: "bold",
          fontSize: 17,
          backgroundColor: "rgb(82,174,211)",
          borderRadius: 5,
        }}
      />
      <View style={styles.ch_view}>
        <View style={styles.ch_h}>
          <Text style={styles.ch_h_txt}>Challan No #</Text>
        </View>
        <View style={styles.ch_itm}>
          <Text style={styles.ch_itm_txt}>Number:{vehicle_number}</Text>
          <Text style={styles.ch_itm_txt}>Type:{vehicle_type}</Text>
        </View>
        <View style={styles.ch_itm}>
          <Text style={styles.ch_itm_txt}>status:{vehicle_status}</Text>
          <Text style={styles.ch_itm_txt}>Amount:{challan_amount}</Text>
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
          onPress={handleUpload}
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
    backgroundColor: "rgb(82,174,211)",
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
