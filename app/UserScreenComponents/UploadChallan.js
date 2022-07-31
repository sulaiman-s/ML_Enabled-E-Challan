import React, { useState, useContext } from "react";
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
import * as Print from "expo-print";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import AppButton from "../compnents/AppButton";
import UserListItem from "../compnents/UserListItem";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import axios from "axios";
import Url from "../Authorization/ApiUrlEndpoints";
import Token from "../Authorization/JwtToken";
import LottiView from "lottie-react-native";
import { Color } from "../assets/colors";
import AuthContext from "../Authorization/Context";
import img from "../assets/qr-code.png";
function UploadChallan({ route, navigation }) {
  const [url, setUrl] = useState();
  const [visi, setvisi] = useState(false);
  const [picError, setPicError] = useState(false);
  const { user } = useContext(AuthContext);
  const ErrorMessage = () => {
    if (picError) {
      return <Text>"Must Enter Challan Reciept Picture To Proceed"</Text>;
    }
    return null;
  };
  const html = `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Challan Report</title>
    <style>
      body {
        font-size: 16px;
      }

      h1 {
        text-align: center;
        color: rgb(0, 72, 255);
      }
      ul li {
        list-style-type: none;
        font-weight: bold;
      }
      table thead td {
        font-weight: bold;
        width: 150px;
        border: 1px solid black;
        text-align: center;
      }
      table {
        border: 1.5px dashed black;
      }
      table tbody tr > td {
        height: 30px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <h1>Challan</h1>
    <div
      style="
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      "
    >
      <div style="display: flex; flex-direction: row">
        <ul>
          <li>Challan Id:#${route.params.ch_Number}</li>
          <li>PhoneNumber: Not provided</li>
        </ul>
        <ul>
          <li>Name:${user.name}</li>
          <li>Cnic:Not provided</li>
        </ul>
      </div>
      <table>
        <thead>
          <td>Vehicle Type</td>
          <td>Number Plate</td>
          <td>Location</td>
          <td>Amount</td>
          <td>Violation</td>
        </thead>
        <tbody>
          <tr>
            <td>${route.params.type}</td>
            <td>${route.params.number}</td>
            <td>${route.params.location}</td>
            <td>${route.params.price}</ pkr</td>
            <td>${route.params.violation}</ pkr</td>
          </tr>
        </tbody>
      </table>
      <h5></h5>
      <img src="https://res.cloudinary.com/sulaimancloud/image/upload/v1658451908/samples/ecommerce/qr-code_n6qcem.png" height="300px" width="300px" />
      <h6>Scan to open application</h6>
      <h5>Challan Generated date:${new Date()}</h5>
    </div>
  </body>
</html>
`;
  const handleGenerate = async () => {
    return await Print.printAsync({ html });
  };
  const PickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    setUrl(result.uri);
    setPicError(false);
  };
  const handleUserUpload = async () => {
    if (url == null) {
      setPicError(true);
      return;
    }
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
    });
    const d = new Date();
    const year = d.getFullYear();
    const months = d.getMonth();
    const day = d.getDate();

    const dat = new FormData();
    dat.append("number", route.params.number);
    dat.append("time", `${year}/${months + 1}/${day}`);
    dat.append("image", { uri: url, name: "history.jpg", type: "image/jpg" });
    dat.append("name", user.name);

    await axios.post(Url + "/history/userhistory/", dat, {
      headers: { Authorization: "JWT" + Token.refresh },
      Accept: "application/json",
      "Content-Type": "multipart/form-data",
    });

    setTimeout(() => {
      setvisi(false);
      navigation.navigate("HOME");
    }, 3000);
  };
  return (
    <Screen
      style={{ padding: 10, marginTop: 0, backgroundColor: Color.DuoBlack }}
    >
      <ScrollView style={{ width: "100%" }}>
        <View style={{ width: "100%" }}>
          <View>
            <Label value="Challan Info" style={styles.label1} />
          </View>
          <View style={{ marginTop: 10 }}>
            {route.params == null ? (
              <UserListItem />
            ) : (
              <UserListItem
                stetus={route.params.stetus}
                type={route.params.type}
                price={route.params.price}
                number={route.params.number}
                location={route.params.location}
                violation={route.params.violation}
                time={route.params.time}
              />
            )}
            <AppButton
              title="Generate"
              textStyle={styles.btn_t}
              height={50}
              width={"60%"}
              style={styles.btn}
              onPress={handleGenerate}
            />
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
          <ErrorMessage />
          <AppButton
            title="Upload"
            textStyle={styles.btn_t}
            height={50}
            width={"60%"}
            style={styles.btn}
            onPress={handleUserUpload}
          />
        </View>
      </ScrollView>
      <Modal visible={visi}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Color.DuoBlack,
          }}
        >
          <LottiView
            autoPlay
            loop={false}
            source={require("../assets/anim/doneanim.json")}
            style={{ flex: 1 }}
          />
        </View>
      </Modal>
    </Screen>
  );
}
const styles = StyleSheet.create({
  btn: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: "5%",
    borderRadius: 25,
    alignSelf: "center",
    backgroundColor: Color.Duolightb,
  },
  btn_t: {
    color: "white",
    fontSize: 15,
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
    backgroundColor: Color.DuoBlack,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: Color.DuoGray,
    color: "white",
    paddingLeft: 140,
    fontWeight: "bold",
  },
  label2: {
    color: "black",
    marginTop: "5%",
    elevation: 0,
    backgroundColor: Color.DuoBlack,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: Color.DuoGray,
    color: "white",
    paddingLeft: 75,
    fontWeight: "bold",
  },
  img_pick_block: {
    backgroundColor: Color.DuoBackGray,
    height: 170,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderRadius: 10,
  },
});

export default UploadChallan;
