import React from "react";
import { View, Text } from "react-native";

function Notification(props) {
  return (
    <View
      style={{
        backgroundColor: "#7B61FF",
        height: 170,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
      }}
    >
      <Text>Notifications</Text>
    </View>
  );
}

export default Notification;
