import React from "react";
import { View, Text } from "react-native";

function Notification({ style }) {
  return (
    <View
      style={[
        {
          backgroundColor: "#7B61FF",
          height: 100,
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 10,
        },
        style,
      ]}
    >
      <Text>Alert Notifications</Text>
    </View>
  );
}

export default Notification;
