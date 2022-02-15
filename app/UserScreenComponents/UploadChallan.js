import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableNativeFeedback,
  ScrollView,
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

function UploadChallan({ route, navigation }) {
  const [url, setUrl] = useState();
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
    const { data } = await axios.post(Url + "/cw/upload/", Data, {
      headers: { Authorization: "JWT" + Token.refresh },
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    });
    console.log({ url, number: route.params.number });
    const d = new Date();
    const year = d.getFullYear();
    const months = d.getMonth();
    const day = d.getDate();
    setUserHistory({
      url,
      number: route.params.number,
      time: `${year}/${months + 1}/${day}`,
    });
    navigation.navigate("HOME");
  };
  return (
    <Screen>
      <View style={{ width: "100%" }}>
        <View>
          <Label
            value="Challan Info"
            style={{
              // backgroundColor: "#4ecdc4",
              color: "black",
              marginTop: "5%",
              elevation: 0,
              backgroundColor: "rgb(71,118,172)",
              borderRadius: 5,
            }}
          />
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
            style={{
              // backgroundColor: "#4ecdc4",
              color: "black",
              marginTop: "5%",
              elevation: 0,
              backgroundColor: "rgb(71,118,172)",
              borderRadius: 5,
            }}
          />
          <TouchableNativeFeedback onPress={PickImage}>
            <View
              style={{
                backgroundColor: "lightslategray",
                height: 170,
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                borderRadius: 10,
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
            onPress={handleUserUpload}
          />
        </ScrollView>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  //color pallet
  // primary: "#fc5c65",
  // secondary: "#4ecdc4",
  // black: "#000",
  // white: "#fff",
  // medium: "#6e6969",
  // light: "#f8f4f4",
  // dark: "#0c0c0c",
  // danger: "#ff5252",
  btn: {
    backgroundColor: "rgb(82,174,211)",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: "5%",
  },
  btn_t: {
    color: "black",
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
});

export default UploadChallan;
