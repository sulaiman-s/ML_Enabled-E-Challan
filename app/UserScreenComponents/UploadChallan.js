import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableNativeFeedback,
  ScrollView,
  Modal,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "../compnents/AppButton";
import UserListItem from "../compnents/UserListItem";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import axios from "axios";
import Url from "../Authorization/ApiUrlEndpoints";
import Token from "../Authorization/JwtToken";
import { setUserHistory } from "../ServerResponseData/History";
import LottiView from "lottie-react-native";

function UploadChallan({ route, navigation }) {
  const [url, setUrl] = useState();
  const [visi, setvisi] = useState(false);
  const [prog, setProg] = useState();

  const PickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    setUrl(result.uri);
  };
  const handleUserUpload = async () => {
    let Data = new FormData();
    Data.append("vehicle_number", route.params.number);
    Data.append("challan_image", {
      uri: url,
      name: "publicUpload.jpg",
      type: "image/jpg",
    });
    setvisi(true);
    const { data } = await axios.post(Url + "/cw/upload/", Data, {
      headers: { Authorization: "JWT" + Token.refresh },
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
      onUploadProgress: (ProgressEvent) =>
        setProg(ProgressEvent.loaded / ProgressEvent.total),
    });
    const d = new Date();
    const year = d.getFullYear();
    const months = d.getMonth();
    const day = d.getDate();
    setUserHistory({
      url,
      number: route.params.number,
      time: `${year}/${months + 1}/${day}`,
    });
    setTimeout(() => {
      setvisi(false);
      navigation.navigate("HOME");
    }, 3000);
  };
  return (
    <Screen style={{ padding: 10, marginTop: 0 }}>
      <View style={{ width: "100%" }}>
        <View>
          <Label value="Challan Info" style={styles.label1} />
        </View>
        <ScrollView>
          <View style={{ marginTop: 10 }}>
            {route.params == null ? (
              <UserListItem />
            ) : (
              <UserListItem
                stetus={route.params.stetus}
                type={route.params.type}
                price={route.params.price}
                number={route.params.number}
              />
            )}
          </View>
          <Label
            value="Upload Receipt of Above Challan"
            style={styles.label2}
          />
          <TouchableNativeFeedback onPress={PickImage}>
            <View style={styles.img_pick_block}>
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
            width={"35%"}
            style={styles.btn}
            onPress={handleUserUpload}
          />
        </ScrollView>
      </View>
      <Modal visible={visi}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <LottiView
            autoPlay
            loop={false}
            source={require("../assets/anim/doneanim.json")}
          />
        </View>
      </Modal>
    </Screen>
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: "rgb(82,174,211)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: "5%",
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: "rgb(71,118,172)",
  },
  btn_t: {
    color: "white",
    fontWeight: "bold",
  },
  txt: {
    fontSize: 15,
    fontFamily: "Roboto",
    height: 50,
    width: "100%",
    paddingTop: 15,
    paddingLeft: 15,
    backgroundColor: "#4ecdc4",
    color: "white",
  },
  label1: {
    color: "black",
    marginTop: "5%",
    elevation: 0,
    backgroundColor: "rgb(71,118,172)",
    borderRadius: 5,
    color: "white",
    paddingLeft: 140,
    fontWeight: "bold",
  },
  label2: {
    color: "black",
    marginTop: "5%",
    elevation: 0,
    backgroundColor: "rgb(71,118,172)",
    borderRadius: 5,
    color: "white",
    paddingLeft: 75,
    fontWeight: "bold",
  },
  img_pick_block: {
    backgroundColor: "lightslategray",
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },
});

export default UploadChallan;
