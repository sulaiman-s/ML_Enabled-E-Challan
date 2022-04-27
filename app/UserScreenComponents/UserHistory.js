import React, { useContext, useEffect, useState, useCallback } from "react";
import Screen from "../compnents/Screen";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  AsyncStorage,
} from "react-native";
import Label from "../compnents/label";
import { useFocusEffect } from "@react-navigation/native";

import get_historyItems, {
  get_userHistory,
} from "../ServerResponseData/History";
import AuthContext from "../Authorization/Context";
import { Color } from "../assets/colors";
function UserHistory(props) {
  const [history, sethistory] = useState([]);
  const [userHistory, setUserHistory] = useState([]);
  const auth = useContext(AuthContext);
  useFocusEffect(
    useCallback(() => {
      AsyncStorage.getItem("History")
        .then((uh) => JSON.parse(uh))
        .then((pd) => {
          if (pd != null || pd != undefined) {
            sethistory(pd);
          }
        })
        .catch((error) => console.log(error));

      AsyncStorage.getItem("userHistory")
        .then((uh) => JSON.parse(uh))
        .then((pd) => {
          if (pd != null || pd != undefined) {
            setUserHistory(pd);
          }
        })
        .catch((error) => console.log(error));
    }, [])
  );
  return (
    <Screen style={{ padding: 10, backgroundColor: Color.DuoBlack }}>
      <Label value="Upload History" style={styles.label1} />
      <ScrollView>
        {auth.user.is_admin
          ? history.map((v) => (
              <View style={styles.adm_v} key={v.challan_id}>
                <Text style={styles.adm_text}>Vehicle:{v.vehicle_number}</Text>
                <Text style={styles.adm_text}>Type:{v.vehicle_type}</Text>
                <Text style={styles.adm_text}>Date:{v.time}</Text>
              </View>
            ))
          : userHistory.map((v) => (
              <View style={styles.user_v}>
                <Text style={styles.user_text}>
                  Vehicle:{v.number}
                  {"\n"}
                  Date:{v.time}
                </Text>
                <Image style={styles.user_img} source={{ uri: v.url }} />
              </View>
            ))}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  label1: {
    backgroundColor: Color.DuoBackGray,
    borderRadius: 5,
    color: "white",
    paddingLeft: 130,
    fontWeight: "bold",
  },
  adm_v: {
    height: 50,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderStyle: "dotted",
    marginVertical: 10,
    backgroundColor: Color.DuoBackGray,
  },
  adm_text: {
    width: "33%",
    height: "100%",
    paddingTop: 15,
    color: "white",
  },
  user_v: {
    height: 100,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderStyle: "dotted",
    marginVertical: 10,
  },
  user_text: {
    width: "33%",
    height: "100%",
    paddingTop: 15,
    backgroundColor: "white",
  },
  user_img: {
    width: "70%",
    height: "100%",
    paddingTop: 15,
  },
});

export default UserHistory;
