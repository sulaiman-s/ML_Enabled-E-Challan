import React from "react";
import { Text, StyleSheet } from "react-native";
function Label({ value, style, onPress }) {
  return (
    <Text style={[styles.txt, style]} onPress={onPress}>
      {value}
    </Text>
  );
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
    paddingTop: 10,
    paddingLeft: 50,
    alignSelf: "center",
  },
});

export default Label;
