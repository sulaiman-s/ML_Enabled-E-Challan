import React, { useContext, useEffect, useState, useCallback } from "react";
import Screen from "../compnents/Screen";
import Token from "../Authorization/JwtToken";

import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  AsyncStorage,
  Alert,
  FlatList,
} from "react-native";
import Label from "../compnents/label";
import { useFocusEffect } from "@react-navigation/native";

import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../Authorization/Context";
import { Color } from "../assets/colors";
import axios from "axios";
import Url from "../Authorization/ApiUrlEndpoints";

function UserHistory(props) {
  const [history, sethistory] = useState([]);
  const [userHist, setUserHistory] = useState([]);
  const auth = useContext(AuthContext);

  const handleDelete = async () => {
    Alert.alert("Warning", "It will delete all your history", [
      {
        text: "ok",
        onPress: async () => {
          if (auth.user.is_admin) {
            await axios.delete(
              Url + "/history/wardenhistory/" + auth.user.name,
              {
                headers: { Authorization: "JWT" + Token.refresh },
              }
            );
            sethistory([]);
          } else {
            await axios.delete(Url + "/history/userhistory/" + auth.user.name, {
              headers: { Authorization: "JWT" + Token.refresh },
            });
            setUserHistory([]);
          }
        },
      },
      { text: "cancel", style: "destructive" },
    ]);
  };

  const gethis = async () => {
    if (auth.user.is_admin) {
      const { data } = await axios
        .get(Url + "/history/wardenhistory/" + auth.user.name, {
          headers: { Authorization: "JWT" + Token.refresh },
        })
        .catch((error) => console.log(error));
      if (data) {
        sethistory(data);
      } else {
        sethistory([]);
      }
    } else {
      const { data } = await axios
        .get(Url + "/history/userhistory/" + auth.user.name, {
          headers: { Authorization: "JWT" + Token.refresh },
        })
        .catch((error) => console.log(error));
      if (data) {
        setUserHistory(data);
      } else {
        setUserHistory([]);
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      gethis();
    }, [])
  );
  return (
    <Screen style={{ padding: 10, backgroundColor: Color.DuoBlack }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          backgroundColor: Color.DuoBackGray,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Label value="Upload History" style={styles.label1} />
        <Ionicons
          name="trash-outline"
          size={35}
          color="red"
          onPress={handleDelete}
        />
      </View>
      {auth.user.is_admin ? (
        <FlatList
          data={history}
          keyExtractor={(d) => d.id}
          renderItem={({ item }) => (
            <View style={styles.adm_v}>
              <Text style={styles.adm_text}>Vehicle:{item.number}</Text>
              <Text style={styles.adm_text}>Type:{item.type}</Text>
              <Text style={styles.adm_text}>Date:{item.time}</Text>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={userHist}
          keyExtractor={(d) => d.id}
          renderItem={({ item }) => (
            <View style={styles.user_v}>
              <Text style={styles.user_text}>
                Vehicle:{item.number}
                {"\n"}
                Date:{item.time}
              </Text>
              <Image
                style={styles.user_img}
                source={{ uri: item.image }}
                resizeMode="cover"
              />
            </View>
          )}
        />
      )}
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
    width: "90%",
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
