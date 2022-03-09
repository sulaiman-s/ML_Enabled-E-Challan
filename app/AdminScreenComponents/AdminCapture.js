import React, { useState } from "react";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Text,
  TouchableNativeFeedback,
  View,
  Image,
  StyleSheet,
} from "react-native";
import AppButton from "../compnents/AppButton";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";

function AdminCapture(props) {
  const navigation = useNavigation();
  const [url, setUrl] = useState();

  const handleImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) setUrl(result.uri);
  };
  const handleImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) setUrl(result.uri);
  };
  return (
    <Screen>
      <Text>Waiting... </Text>
      <TouchableNativeFeedback onPress={handleImageFromLibrary}>
        <View
          style={{
            backgroundColor: "lightslategray",
            height: 300,
            width: "95%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 40,
            marginBottom: 20,
            borderRadius: 10,
          }}
        >
          {url == null ? (
            <>
              <MaterialCommunityIcons name="camera" size={100} color="white" />
              <Text> Select Image From Library </Text>
            </>
          ) : (
            <Image
              source={{ uri: url }}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          )}
        </View>
      </TouchableNativeFeedback>
      <AppButton
        title="Open Camera"
        textStyle={styles.btn_t}
        height={50}
        width={"50%"}
        style={styles.btn}
        onPress={handleImageFromCamera}
      />
      <AppButton
        title="Next"
        textStyle={styles.btn_t}
        height={50}
        width={"50%"}
        style={styles.btn}
        onPress={() => navigation.navigate("entry")}
      />
    </Screen>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "rgb(71,118,172)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 20,
  },
  btn_t: {
    color: "white",
    fontSize: 16,
  },
});

export default AdminCapture;
