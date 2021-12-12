import React from "react";
import { View, Text, TouchableNativeFeedback } from "react-native";

function AppButton({ title, style, textStyle, height, width, onPress }) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={[style, { height: height, width: width }]}>
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableNativeFeedback>
  );
}

export default AppButton;
