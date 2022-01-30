import React from "react";
import { View, Text } from "react-native";

function HistoryItem({ number, time, type }) {
  return (
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
          backgroundColor: "#4ecdc4",
        }}
      >
        Vehicle:{number}
      </Text>
      <Text
        style={{
          width: "33%",
          height: "100%",
          paddingTop: 15,
        }}
      >
        Type:{type}
      </Text>
      <Text
        style={{
          width: "33%",
          height: "100%",
          paddingTop: 15,
        }}
      >
        Date:{time}
      </Text>
    </View>
  );
}

export default HistoryItem;
