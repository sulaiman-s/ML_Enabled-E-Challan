import React from "react";
import { View, Text } from "react-native";

function AdminAlert(props) {
  return (
    <View
      style={{
        backgroundColor: "#ff5252",
        height: 170,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>For Admin to display Alert or any useful info </Text>
    </View>
  );
}

export default AdminAlert;
