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
  ActivityIndicator,
} from "react-native";
import AppButton from "../compnents/AppButton";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/core";
import axios from "axios";
import { Color } from "../assets/colors";

function AdminCapture(props) {
  const navigation = useNavigation();
  const [url, setUrl] = useState();
  const [picError, setPicError] = useState(false);
  const [log, setlog] = useState(false);
  const [progress, setProgress] = useState();

  const ErrorMessage = () => {
    if (picError) {
      return <Text>"Must Enter Picture To Proceed"</Text>;
    }
    return null;
  };

  const handleImageFromCamera = async () => {
    const result = await ImagePicker.launchCameraAsync();
    if (!result.cancelled) {
      setUrl(result.uri);
      setPicError(false);
    }
  };
  const handleImageFromLibrary = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    if (!result.cancelled) {
      setUrl(result.uri);
      setPicError(false);
    }
  };
  const handleNext = async () => {
    if (url == null) {
      setPicError(true);
      return;
    }
    setlog(true);
    var d = new FormData();
    d.append("image", { uri: url, name: "modelImage.jpg", type: "image/jpg" });
    var { data } = await axios
      .post("http://192.168.225.182:5000/img", d, {
        onUploadProgress: (p) => {
          setProgress(p.loaded / p.total);
          console.log(p);
        },
      })
      .catch((error) => console.log(error));
    setlog(false);
    navigation.navigate("entry", { plate: data });
  };
  return (
    <Screen style={{ backgroundColor: Color.DuoBlack, marginTop: 0 }}>
      {url == null ? (
        <>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{ color: Color.DuoGray }}>Waiting for upload </Text>
        </>
      ) : undefined}

      <TouchableNativeFeedback onPress={handleImageFromLibrary}>
        <View style={styles.img_block}>
          {url == null ? (
            <>
              <MaterialCommunityIcons
                name="camera"
                size={100}
                color={Color.DuoBackGray}
              />
              <Text> Select Image From Library </Text>
            </>
          ) : (
            <Image source={{ uri: url }} style={styles.img} />
          )}
        </View>
      </TouchableNativeFeedback>
      <ErrorMessage />

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
      <Modal visible={log}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Color.DuoBlack,
          }}
        >
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={{ color: Color.DuoGray }}>
            Adjusting Light Intensity...
          </Text>
          <Text style={{ color: Color.DuoGray }}>
            Detecting Number Plate...
          </Text>
          <Text style={{ color: Color.DuoGray }}>Rectification...</Text>
          <Text style={{ color: Color.DuoGray }}>Extracting Number...</Text>
        </View>
      </Modal>
    </Screen>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: Color.Duolightb,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    marginTop: 20,
  },
  btn_t: {
    color: Color.DuoBlack,
    fontSize: 16,
    fontWeight: "bold",
  },
  img_block: {
    backgroundColor: Color.DuoGray,
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
