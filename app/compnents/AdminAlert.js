import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  Modal,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import axios from "axios";
import Url from "../Authorization/ApiUrlEndpoints";
import Token from "../Authorization/JwtToken";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Label from "./label";
import { Color } from "../assets/colors";

function AdminAlert(props) {
  const [alertImage, setAlertImage] = useState({});
  const [alertMessage, setAlertMessage] = useState([]);
  const [visi, setvisi] = useState(false);
  const getAlertImage = async () => {
    const { data } = await axios
      .get(Url + "/alerts/images/", {
        headers: { Authorization: "JWT" + Token },
      })
      .catch((err) => console.log(err));
    setAlertImage(data);
  };
  const getAlertMessage = async () => {
    const { data } = await axios
      .get(Url + "/alerts/msgs/", {
        headers: { Authorization: "JWT" + Token },
      })
      .catch((err) => console.log(err));
    setAlertMessage(data);
  };
  useEffect(() => {
    getAlertImage();
    getAlertMessage();
  }, []);

  const getAlertsModal = () => {
    if (alertImage.Alert_Image && alertMessage) {
      return (
        <>
          <Image
            source={{ uri: alertImage.Alert_Image }}
            style={{ height: "50%", width: "100%" }}
            resizeMode="cover"
          />
          <Label
            value="Message Alerts"
            style={{
              backgroundColor: Color.DuoBlack,
              borderWidth: 3,
              borderColor: Color.DuoGray,
              marginTop: "3%",
              borderRadius: 5,
              width: "80%",
              color: "white",
              fontWeight: "bold",
              paddingLeft: "25%",
              paddingTop: 15,
            }}
          />
          {alertMessage.map((item) => (
            <Text
              key={item.id}
              style={{
                fontSize: 16,
                marginTop: 10,
                fontWeight: "bold",
                color: "white",
                paddingLeft: 5,
              }}
            >
              {item.Alert_Message}
            </Text>
          ))}
        </>
      );
    }
    if (alertImage.Alert_Image && !alertMessage) {
      return (
        <Image
          source={{ uri: alertImage.Alert_Image }}
          style={{ height: "100%", width: "100%", marginTop: "1%" }}
          resizeMode="contain"
        />
      );
    }
    if (alertMessage && !alertImage.Alert_Image) {
      return (
        <View
          style={{
            height: "100%",
            width: "100%",
            backgroundColor: "lightgray",
          }}
        >
          <Label
            value="Message Alerts"
            style={{
              backgroundColor: "#2dc3d4",
              marginTop: "3%",
              borderRadius: 5,
              color: "white",
              fontWeight: "bold",
            }}
          />
          {alertMessage.map((item) => (
            <Text
              key={item.id}
              style={{
                fontSize: 16,
                // height: "30%",
                width: "100%",
                marginTop: 10,
              }}
            >
              {item.Alert_Message}
            </Text>
          ))}
        </View>
      );
    }
  };
  const Message = () => {
    return (
      <TouchableOpacity
        style={{
          height: "5%",
          width: "80%",
          // backgroundColor: Color.Duolightb,
          // alignItems: "center",
          justifyContent: "center",
          // marginTop: "5%",
          borderRadius: 5,
          alignSelf: "center",
          marginTop: 5,
          borderWidth: 3,
          borderColor: Color.DuoGray,
        }}
        onPress={() => setvisi(true)}
      >
        <Text
          style={{
            fontSize: 17,
            position: "absolute",
            alignSelf: "center",
            color: "white",
            fontWeight: "bold",
          }}
        >
          Notifications
        </Text>
        <Text
          style={{
            // backgroundColor: Color.RoyalBlue,
            position: "relative",
            paddingLeft: 6,
            width: 20,
            height: 20,
            borderRadius: 10,
            alignSelf: "flex-end",
            marginBottom: 10,
            color: "white",
          }}
        >
          {alertMessage.length}
        </Text>
      </TouchableOpacity>
    );
  };
  return (
    <>
      {/* <Label
        value="Alerts"
        style={{
          elevation: 0,
          backgroundColor: "rgb(71,118,172)",
          marginTop: "5%",
          width: "40%",
          borderRadius: 25,
          height: 40,
          color: "white",
          fontWeight: "bold",
        }}
      /> */}
      <Message />
      <View
        style={{
          backgroundColor: Color.DuoBlack,
          height: "30%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          top: "2%",
          borderRadius: 3,
          borderWidth: 3,
          borderColor: Color.DuoGray,
        }}
      >
        {alertImage.Alert_Image ? (
          <TouchableOpacity
            style={{ width: "100%", height: "100%" }}
            onPress={() => setvisi(true)}
          >
            <Image
              source={{ uri: alertImage.Alert_Image }}
              style={{ width: "100%", height: "100%" }}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ) : (
          <Text> NO Alerts To Display </Text>
        )}
        <Modal visible={visi} style={{ margin: 10 }}>
          <TouchableOpacity
            style={{
              height: "5%",
              flexDirection: "row",
              justifyContent: "flex-end",
              backgroundColor: Color.DuoBlack,
            }}
            onPress={() => setvisi(false)}
          >
            <MaterialCommunityIcons
              name="close"
              size={30}
              color={Color.DuoGray}
            />
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Color.DuoBlack,
            }}
          >
            {getAlertsModal()}
          </View>
        </Modal>
      </View>
    </>
  );
}

export default AdminAlert;
