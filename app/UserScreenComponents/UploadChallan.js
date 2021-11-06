import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { View, StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "../compnents/AppButton";

function UploadChallan(props) {
  const [url, setUrl] = useState();
  const handleUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    setUrl(result.uri);
  };
  return (
    <View style={{ width: "100%" }}>
      <Text>Upload Challan Image</Text>
      <TouchableOpacity onPress={handleUpload}>
        <View
          style={{
            backgroundColor: "gray",
            height: 150,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
          }}
        >
          {url == null ? (
            <MaterialCommunityIcons
              name="camera"
              size={100}
              color="lightgray"
            />
          ) : (
            <Image
              source={{ uri: url }}
              style={{ height: 100, width: "100%" }}
            />
          )}
        </View>
      </TouchableOpacity>
      <AppButton
        title="Upload"
        textStyle={styles.btn_t}
        height={30}
        width={60}
        style={styles.btn}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 5,
  },
  btn_t: {
    color: "white",
  },
});

export default UploadChallan;
