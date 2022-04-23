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
  Modal,
} from "react-native";
import AppButton from "../compnents/AppButton";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";

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
  const handleNext = async () => {
    var d = new FormData();
    d.append("image", { uri: url, name: "modelImage.jpg", type: "image/jpg" });
    var { data } = await axios
      .post("http://192.168.2.103:5000/img", d, {
        onUploadProgress: (p) => console.log(p),
      })
      .catch((error) => console.log(error));
    navigation.navigate("entry", { plate: data });
  };
  return (
    <Screen>
      <Text>Waiting... </Text>

      <TouchableNativeFeedback onPress={handleImageFromLibrary}>
        <View style={styles.img_block}>
          {url == null ? (
            <>
              <MaterialCommunityIcons name="camera" size={100} color="white" />
              <Text> Select Image From Library </Text>
            </>
          ) : (
            <Image source={{ uri: url }} style={styles.img} />
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
        onPress={handleNext}
      />
      <Modal
        visible={false}
        style={{ height: 30, margin: 0, backgroundColor: "#00000080" }}
      ></Modal>
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
  img_block: {
    backgroundColor: "lightslategray",
    height: 300,
    width: "95%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 20,
    borderRadius: 10,
  },
  img: {
    height: "100%",
    width: "100%",
  },
});

export default AdminCapture;
