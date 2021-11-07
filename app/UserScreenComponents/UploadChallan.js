import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TouchableNativeFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "../compnents/AppButton";
import UserListItem from "../compnents/UserListItem";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";

function UploadChallan({ route }) {
  const [url, setUrl] = useState();
  const handleUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    setUrl(result.uri);
  };
  return (
    <Screen>
      <View style={{ width: "100%" }}>
        <View>
          <Text
            style={{ fontSize: 35, fontFamily: "Roboto", paddingBottom: 10 }}
          >
            Upload Receipt
          </Text>
          <Label
            value="Challan Info"
            style={{
              backgroundColor: "#4ecdc4",
              color: "white",
              marginTop: 30,
            }}
          />
        </View>
        <View style={{ marginTop: 10 }}>
          {route.params == null ? (
            <UserListItem />
          ) : (
            <UserListItem
              ch_Number={route.params.ch_Number}
              date={route.params.date}
              type={route.params.type}
              price={route.params.price}
              number={route.params.number}
            />
          )}
        </View>
        <Label
          value="Upload Receipt of Above Challan"
          style={{ backgroundColor: "#4ecdc4", color: "white", marginTop: 30 }}
        />
        <TouchableNativeFeedback onPress={handleUpload}>
          <View
            style={{
              backgroundColor: "lightslategray",
              height: 170,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            {url == null ? (
              <>
                <MaterialCommunityIcons
                  name="camera"
                  size={100}
                  color="white"
                />
                <Text> Select Image From Library </Text>
              </>
            ) : (
              <Image
                source={{ uri: url }}
                style={{ height: "100%", width: "100%" }}
              />
            )}
          </View>
        </TouchableNativeFeedback>
        <AppButton
          title="Upload"
          textStyle={styles.btn_t}
          height={50}
          width={"100%"}
          style={styles.btn}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  // primary: "#fc5c65",
  // secondary: "#4ecdc4",
  // black: "#000",
  // white: "#fff",
  // medium: "#6e6969",
  // light: "#f8f4f4",
  // dark: "#0c0c0c",
  // danger: "#ff5252",
  btn: {
    backgroundColor: "#4ecdc4",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 25,
  },
  btn_t: {
    color: "white",
  },
  txt: {
    fontSize: 15,
    fontFamily: "Roboto",
    height: 50,
    width: "100%",
    elevation: 5,
    paddingTop: 15,
    paddingLeft: 15,
    backgroundColor: "#4ecdc4",
    marginTop: 30,
    color: "white",
  },
});

export default UploadChallan;
