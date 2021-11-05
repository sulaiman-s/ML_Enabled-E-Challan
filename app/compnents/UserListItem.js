import React from "react";
import { View, StyleSheet, Text } from "react-native";

function UserListItem({ number, time, location, status }) {
  return (
    <View style={styles.ch_view}>
      <Text style={styles.ch_items}>{number}</Text>
      <Text style={styles.ch_items}>{time}</Text>
      <Text style={styles.ch_items}>{location}</Text>
      <Text style={styles.ch_items}>{status}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  cont: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  ch_view: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    height: 50,
  },
});

export default UserListItem;
