import { useNavigation } from "@react-navigation/core";
import React, { useContext } from "react";
import { View, StyleSheet, Text, TouchableNativeFeedback } from "react-native";
import { Color } from "../assets/colors";
import AuthContext from "../Authorization/Context";

function UserListItem({
  ch_Number,
  number,
  type,
  stetus,
  price,
  location,
  violation,
  time,
}) {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const handlePress = () => {
    if (stetus != "Paid") {
      navigation.navigate("upload", {
        ch_Number,
        number,
        type,
        stetus,
        price,
        location,
        violation,
        time,
      });
    } else {
      alert("Status Paid");
    }
  };
  const date = () => {
    const date = new Date(time);
    return date.toLocaleDateString();
  };
  return (
    <TouchableNativeFeedback
      onPress={() => {
        if (user.is_admin) return;
        handlePress();
      }}
    >
      <View style={styles.ch_view}>
        <View style={styles.ch_h}>
          <Text style={styles.ch_h_txt}>Challan No #{ch_Number}</Text>
        </View>
        <View style={styles.ch_itm}>
          <Text style={styles.ch_itm_txt}>
            Number{"\n"}
            <Text style={{ fontWeight: "bold", color: "white" }}>{number}</Text>
          </Text>
          <Text style={styles.ch_itm_txt}>
            Type{"\n"}
            <Text style={{ fontWeight: "bold", color: "white" }}>{type}</Text>
          </Text>
        </View>
        <View style={styles.ch_itm}>
          <Text style={styles.ch_itm_txt}>
            Status{"\n"}
            <Text style={{ fontWeight: "bold", color: "white" }}>{stetus}</Text>
          </Text>
          <Text style={styles.ch_itm_txt}>
            Amount{"\n"}
            <Text style={{ fontWeight: "bold", color: "white" }}>{price}</Text>
          </Text>
        </View>
        <View style={styles.ch_itm}>
          <Text style={styles.ch_itm_txt}>
            Violation{"\n"}
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {violation}
            </Text>
          </Text>
          {time ? (
            <Text style={styles.ch_itm_txt}>
              Date{"\n"}
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {date()}
              </Text>
            </Text>
          ) : (
            <Text style={styles.ch_itm_txt}>
              Date{"\n"}
              <Text style={{ fontWeight: "bold", color: "white" }}>
                {new Date().getDate()}/{new Date().getDay()}/
                {new Date().getFullYear()}
              </Text>
            </Text>
          )}
        </View>
        <View style={[styles.ch_itm]}>
          <Text style={[styles.ch_itm_txt, { paddingLeft: 60, width: "100%" }]}>
            Location{"\n"}
            <Text style={{ fontWeight: "bold", color: "white" }}>
              {location}
            </Text>
          </Text>
        </View>
      </View>
    </TouchableNativeFeedback>
  );
}
const styles = StyleSheet.create({
  ch_view: {
    width: "100%",
    borderWidth: 2,
    borderRadius: 15,
    // borderStyle: "dashed",
    borderColor: Color.DuoBackGray,
    marginRight: 20,
    backgroundColor: Color.DuoBackGray,
    elevation: 10,
    shadowColor: "black",
  },
  ch_h: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  ch_h_txt: {
    fontSize: 25,
    fontFamily: "Roboto",
    color: "white",
  },
  ch_itm: {
    marginVertical: 15,
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-around",
  },
  ch_itm_txt: {
    fontSize: 15,
    fontFamily: "Roboto",
    color: "white",
    // fontWeight: "bold",
    width: "50%",
    paddingLeft: 60,
    backgroundColor: "gray",
    justifyContent: "space-around",
  },
});

export default UserListItem;
