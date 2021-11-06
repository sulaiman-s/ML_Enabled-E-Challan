import React from "react";
import { Platform, View, StatusBar, StyleSheet } from "react-native";

function Screen({ children, style }) {
  return <View style={[styles.container, { style }]}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 10,
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});

export default Screen;
