import React from "react";
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Platform,
  ImageBackground,
} from "react-native";
import AppButton from "../compnents/AppButton";

function FirstScreen(props) {
  return (
    <View style={styles.cont}>
      <View style={{ flex: 0.8 }}>
        <ImageBackground
          source={require("../assets/bb.jpg")}
          resizeMode="cover"
          style={{
            flex: 1,
            justifyContent: "center",
            opacity: 0.7,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              fontFamily: "Roboto",
              fontSize: 30,
            }}
          >
            App Name
          </Text>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 0.2,
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <AppButton
          title="LOG IN"
          height={52}
          width={167}
          style={{
            borderWidth: 2,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
          }}
          textStyle={{ fontFamily: "Roboto", fontWeight: "bold" }}
        />
        <AppButton
          title="REGISTER"
          height={52}
          width={167}
          style={{
            borderWidth: 2,
            borderRadius: 6,
            justifyContent: "center",
            alignItems: "center",
          }}
          textStyle={{ fontFamily: "Roboto", fontWeight: "bold" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    flex: 1,
    width: "100%",
    marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});

export default FirstScreen;
