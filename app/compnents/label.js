import React from "react";
import { Text, StyleSheet } from "react-native";
function Label({ value, style }) {
  return <Text style={[styles.txt, style]}>{value}</Text>;
}
const styles = StyleSheet.create({
  txt: {
    alignSelf: "flex-start",
    marginBottom: 5,
    fontSize: 15,
    backgroundColor: "white",
    elevation: 5,
    width: "100%",
    height: 50,
    paddingTop: 15,
    paddingLeft: 15,
  },
});

export default Label;
