import React, { useContext } from "react";
import Screen from "../compnents/Screen";
import { View, Text, StyleSheet, Image } from "react-native";
import Label from "../compnents/label";
import get_historyItems, {
  get_userHistory,
} from "../ServerResponseData/History";
import AuthContext from "../Authorization/Context";
function UserHistory(props) {
  const history = get_historyItems();
  const userHistory = get_userHistory();
  const auth = useContext(AuthContext);
  return (
    <Screen style={{ padding: 10 }}>
      <Label
        value="Upload History"
        style={{
          backgroundColor: "rgb(71,118,172)",
          borderRadius: 5,
          color: "white",
          paddingLeft: 130,
          fontWeight: "bold",
        }}
      />

      {auth.user.is_admin
        ? history.map((v) => (
            <View
              style={{
                height: 50,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 0.5,
                borderStyle: "dotted",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  width: "33%",
                  height: "100%",
                  paddingTop: 15,
                  backgroundColor: "white",
                }}
              >
                Vehicle:{v.vehicle_number}
              </Text>
              <Text
                style={{
                  width: "33%",
                  height: "100%",
                  paddingTop: 15,
                }}
              >
                Type:{v.vehicle_type}
              </Text>
              <Text
                style={{
                  width: "33%",
                  height: "100%",
                  paddingTop: 15,
                }}
              >
                Date:{v.time}
              </Text>
            </View>
          ))
        : userHistory.map((v) => (
            <View
              style={{
                height: 100,
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                borderWidth: 0.5,
                borderStyle: "dotted",
                marginVertical: 10,
              }}
            >
              <Text
                style={{
                  width: "33%",
                  height: "100%",
                  paddingTop: 15,
                  backgroundColor: "white",
                }}
              >
                Vehicle:{v.number}
                {"\n"}
                Date:{v.time}
              </Text>
              <Image
                style={{
                  width: "70%",
                  height: "100%",
                  paddingTop: 15,
                }}
                source={{ uri: v.url }}
              />
            </View>
          ))}
    </Screen>
  );
}

const styles = StyleSheet.create({});

export default UserHistory;
