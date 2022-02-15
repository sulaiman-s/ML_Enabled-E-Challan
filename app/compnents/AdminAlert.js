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

function AdminAlert(props) {
  const [alertImage, setAlertImage] = useState({});
  const [alertMessage, setAlertMessage] = useState({});
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
    if (alertImage.Alert_Image && alertMessage.Alert_Message) {
      return (
        <>
          <Image
            source={{ uri: Url + alertImage.Alert_Image }}
            style={{ height: "50%", width: "100%" }}
            resizeMode="cover"
          />
          <Text
            style={{
              fontSize: 16,
              height: "30%",
              width: "100%",
              marginTop: 10,
            }}
          >
            {alertMessage.Alert_Message}
          </Text>
        </>
      );
    }
    if (alertImage.Alert_Image && !alertMessage.Alert_Message) {
      return (
        <Image
          source={{ uri: Url + alertImage.Alert_Image }}
          style={{ height: "100%", width: "100%", marginTop: "1%" }}
          resizeMode="contain"
        />
      );
    }
    if (alertMessage.Alert_Message && !alertImage.Alert_Image) {
      return (
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "lightgray",
          }}
        >
          <Text
            style={{
              fontSize: 17,
              // height: "100%",
              // width: "100%",
              alignSelf: "center",
            }}
          >
            {alertMessage.Alert_Message}
          </Text>
        </View>
      );
    }
  };
  const Message = () => {
    if (alertMessage.Alert_Message) {
      return (
        <TouchableOpacity
          style={{
            height: "5%",
            width: "100%",
            backgroundColor: "lightgray",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setvisi(true)}
        >
          <Text style={{ fontSize: 17 }} numberOfLines={1}>
            {alertMessage.Alert_Message}
          </Text>
        </TouchableOpacity>
      );
    }
    return <></>;
  };
  return (
    <>
      <Message />
      <View
        style={{
          backgroundColor: "lightgray",
          height: "30%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          top: "1%",
        }}
      >
        {alertImage.Alert_Image ? (
          <TouchableOpacity
            style={{ width: "100%", height: "100%" }}
            onPress={() => setvisi(true)}
          >
            <Image
              source={{ uri: Url + alertImage.Alert_Image }}
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
              width: "100%",
              backgroundColor: "green",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setvisi(false)}
          >
            <Text
              // onPress={() => setvisi(false)}
              style={{ color: "darkblue", fontSize: 17 }}
            >
              close
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flex: 1,
              margin: 5,
              justifyContent: "center",
              alignItems: "center",
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
