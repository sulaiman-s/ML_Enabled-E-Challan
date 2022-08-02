import React from "react";
import { View, Text, StyleSheet, TextInput, Button } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function AppInput({
  viewStyle,
  placeholder,
  style,
  onChangeText,
  iconName,
  iconColor,
  ...rest
}) {
  return (
    <View style={[styles.inp, viewStyle]}>
      <MaterialCommunityIcons
        name={iconName}
        size={30}
        color={iconColor ? iconColor : "black"}
      />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="white"
        style={style}
        onChangeText={onChangeText}
        {...rest}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  inp: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    padding: 10,
    marginVertical: 10,
    borderWidth: 2,
  },
});

export default AppInput;
