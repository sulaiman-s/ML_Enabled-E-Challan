import React from "react";
import { Image, View, Text, TouchableNativeFeedback } from "react-native";

function AppButton({
  image_style,
  image,
  title,
  style,
  textStyle,
  height,
  width,
  onPress,
}) {
  return (
    <>
      {image ? (
        <TouchableNativeFeedback onPress={onPress}>
          <View
            style={[
              style,
              { height: height, width: width, flexDirection: "column" },
            ]}
          >
            <Image source={image} style={image_style} />
            <Text style={textStyle}>{title}</Text>
          </View>
        </TouchableNativeFeedback>
      ) : (
        <TouchableNativeFeedback onPress={onPress}>
          <View style={[style, { height: height, width: width }]}>
            <Text style={textStyle}>{title}</Text>
          </View>
        </TouchableNativeFeedback>
      )}
    </>
  );
}

export default AppButton;
