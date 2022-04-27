import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { Color } from "../assets/colors";

function UserListItem({ ch_Number, number, type, stetus, price, location }) {
  const navigation = useNavigation();
  const handlePress = () => {
    if (stetus != "Paid") {
      navigation.navigate("upload", {
        number,
        type,
        stetus,
        price,
        location,
      });
    } else {
      alert("Status Paid");
    }
  };
  return (
    <TouchableNativeFeedback onPress={() => handlePress()}>
      <View style={styles.ch_view}>
        <View style={styles.ch_h}>
          <Text style={styles.ch_h_txt}>Challan No #{ch_Number}</Text>
        </View>
        <View style={styles.ch_itm}>
          <Text style={styles.ch_itm_txt}>Number:{number}</Text>
          <Text style={styles.ch_itm_txt}>Type:{type}</Text>
        </View>
        <View style={styles.ch_itm}>
          <Text style={styles.ch_itm_txt}>Status:{stetus}</Text>
          <Text style={styles.ch_itm_txt}>Amount:{price}</Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
const styles = StyleSheet.create({
  ch_view: {
    width: "100%",
    height: 160,
    borderWidth: 2,
    borderRadius: 1,
    borderStyle: "dashed",
    borderColor: Color.DuoGray,
    marginRight: 20,
    backgroundColor: Color.DuoBackGray,
  },
  ch_h: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ch_h_txt: {
    fontSize: 25,
    fontFamily: "Roboto",
    color: Color.DuoGray,
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
    color: "black",
  },
});

export default UserListItem;
