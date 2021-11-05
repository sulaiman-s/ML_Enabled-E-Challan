import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlightComponent,
  TouchableNativeFeedback,
} from "react-native";

function AppButton({ title, style, textStyle, height, width, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
      <View style={[style, { height: height, width: width }]}>
        <Text style={textStyle}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default AppButton;
