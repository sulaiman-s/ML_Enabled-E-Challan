import React, { useContext, useEffect, useState } from "react";
import {
  Platform,
  StatusBar,
  View,
  Text,
  Image,
  Modal,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import { useNavigation } from "@react-navigation/core";
import { Ionicons } from "@expo/vector-icons";
import AuthContext from "../Authorization/Context";
import AppInput from "../compnents/AppInput";
import AppButton from "../compnents/AppButton";
import axios from "axios";
import Url from "../Authorization/ApiUrlEndpoints";
import Token, { TokenAccess } from "../Authorization/JwtToken";
import { Color } from "../assets/colors";
import * as ImagePicker from "expo-image-picker";
import { useFocusEffect } from "@react-navigation/native";

function Setting(props) {
  const navigation = useNavigation();
  const [PasswordChangeModel, setPasswordChangeModel] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [new_password, setNewPassword] = useState();
  const [current_password, setCurrentPassword] = useState();
  const [error, setError] = useState({});
  const auth = useContext(AuthContext);
  const user = auth.user;
  const [url, setUrl] = useState(auth.profilePic);
  const handleChange = () => {
    const { data } = axios
      .post(
        Url + "/auth/users/set_password/",
        { new_password: new_password, current_password: current_password },
        {
          headers: { Authorization: "JWT " + TokenAccess.access },
        }
      )
      .then((res) => {
        AsyncStorage.removeItem("JwtToken").catch((error) =>
          console.log(error)
        );
        auth.setUser(null);
      })
      .catch((error) =>
        error ? setError(error.response.data) : console.log("no error")
      );
  };

  const handleDelete = () => {
    setUrl(null);
    auth.setProfilePic(null);
    AsyncStorage.removeItem(`@${auth.user.name}`).catch((error) =>
      console.log(error)
    );
  };

  const handleProfile = async () => {
    const res = await ImagePicker.launchImageLibraryAsync();
    if (res.cancelled) {
      url = auth.profilePic;
    } else {
      setUrl(res.uri);
      auth.setProfilePic(res.uri);
      console.log(res.uri);
      AsyncStorage.setItem(
        `@${auth.user.name}`,
        JSON.stringify({ pic: res.uri })
      ).catch((error) => console.log(error));
      // if (!user.is_admin) {
      //}
      // else if (user.is_admin) {
      //   AsyncStorage.setItem(
      //     "AdminProf,
      //     JSON.stringify({ pic: res.uri })
      //   ).catch((error) => console.log(error));
      // }
    }
  };

  return (
    <Screen
      style={{
        padding: 10,
        backgroundColor: Color.DuoBlack,
      }}
    >
      <View
        style={{
          alignSelf: "flex-start",
          marginBottom: 20,
          flexDirection: "row",
        }}
      >
        <Ionicons name="chevron-back" size={20} color={Color.DuoGray} />
        <Text
          style={{ color: Color.DuoGray }}
          onPress={() => navigation.goBack()}
        >
          Go Back
        </Text>
      </View>
      <View
        style={{
          alignSelf: "flex-start",
          flex: 1,
          width: "100%",
        }}
      >
        <Text
          style={{
            color: Color.DuoGray,
            paddingLeft: 10,
            fontSize: 18,
            fontWeight: "bold",
            width: "100%",
          }}
        >
          Profile
        </Text>
        <TouchableOpacity
          style={{
            margin: 10,
            marginTop: 0,
            width: "100%",
            borderRadius: 15,
            borderWidth: 2,
            borderColor: Color.DuoGray,
            height: 70,
            alignSelf: "center",
            paddingLeft: 10,
            alignItems: "center",
            flexDirection: "row",
          }}
          onPress={() => setProfileModal(true)}
        >
          <View style={{ marginHorizontal: 5, borderRadius: 25 }}>
            {url ? (
              <Image
                source={{ uri: url }}
                resizeMode="cover"
                style={{ height: 50, width: 50, borderRadius: 25 }}
              />
            ) : (
              <Ionicons name="person" color={Color.DuoBackGray} size={25} />
            )}
          </View>
          <View>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {user.name}
            </Text>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {user.email}
            </Text>
          </View>
        </TouchableOpacity>
        <Text
          style={{
            color: Color.DuoGray,
            paddingLeft: 10,
            fontSize: 18,
            fontWeight: "bold",
            width: "100%",
          }}
        >
          ManageAccount
        </Text>
        <TouchableOpacity
          style={{
            margin: 10,
            marginTop: 0,
            width: "100%",
            borderRadius: 15,
            borderWidth: 2,
            borderColor: Color.DuoGray,
            height: 70,
            alignSelf: "center",
            paddingLeft: 10,
            justifyContent: "center",
          }}
          onPress={() => setPasswordChangeModel(true)}
        >
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 15 }}>
            ChangePassword
          </Text>
        </TouchableOpacity>
      </View>
      <Modal visible={PasswordChangeModel}>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: Color.DuoBlack,
            width: "100%",
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              marginBottom: 20,
              flexDirection: "row",
            }}
          >
            <Ionicons name="chevron-back" size={20} color={Color.DuoGray} />
            <Text
              style={{ color: Color.DuoGray }}
              onPress={() => setPasswordChangeModel(false)}
            >
              Go Back
            </Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              paddingBottom: 100,
            }}
          >
            <AppInput
              placeholder="new password"
              placeholderTextColor={Color.DuoGray}
              onChangeText={(t) => setNewPassword(t)}
              viewStyle={{
                width: "90%",
                borderRadius: 25,
                backgroundColor: Color.DuoBackGray,
                borderColor: Color.DuoGray,
              }}
              style={{
                backgroundColor: Color.DuoBackGray,
                width: "100%",
                color: "white",
              }}
            />
            {error.new_password ? <Text>{error.new_password}</Text> : undefined}
            <AppInput
              placeholder="Current password"
              s
              placeholderTextColor={Color.DuoGray}
              onChangeText={(t) => setCurrentPassword(t)}
              viewStyle={{
                width: "90%",
                borderRadius: 25,
                backgroundColor: Color.DuoBackGray,
                borderColor: Color.DuoGray,
              }}
              style={{
                backgroundColor: Color.DuoBackGray,
                width: "100%",
                color: "white",
              }}
            />
            {error.current_password ? (
              <Text>{error.current_password}</Text>
            ) : undefined}
            <AppButton
              title="Change"
              onPress={handleChange}
              height={50}
              width="45%"
              style={{
                backgroundColor: Color.Duolightb,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 25,
              }}
              textStyle={{ fontSize: 15, fontWeight: "bold" }}
            />
          </View>
        </View>
      </Modal>
      <Modal visible={profileModal}>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.DuoBlack,
            width: "100%",
          }}
        >
          <View
            style={{
              alignSelf: "flex-start",
              marginBottom: 20,
              flexDirection: "row",
            }}
          >
            <Ionicons name="chevron-back" size={20} color={Color.DuoGray} />
            <Text
              style={{ color: Color.DuoGray }}
              onPress={() => setProfileModal(false)}
            >
              Go Back
            </Text>
          </View>

          <TouchableOpacity
            style={{
              alignSelf: "center",
              height: 200,
              width: 200,
              borderColor: Color.Duolightb,
              borderWidth: 2,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Color.DuoBackGray,
              borderRadius: 25,
              marginTop: 100,
            }}
            onPress={handleProfile}
          >
            {url ? (
              <Image
                source={{ uri: url }}
                resizeMode="cover"
                style={{ height: 200, width: 200, borderRadius: 25 }}
              />
            ) : (
              <>
                <Ionicons name="person" size={80} color={Color.DuoGray} />
                <Text style={{ color: Color.DuoGray }}>
                  Change Profile Picture
                </Text>
              </>
            )}
          </TouchableOpacity>
          <Label
            value="Delete Profile Picture"
            style={{
              backgroundColor: Color.DuoBlack,
              color: "red",
              paddingLeft: 10,
              marginTop: 20,
              borderWidth: 3,
              borderColor: Color.DuoGray,
              borderRadius: 15,
            }}
            onPress={handleDelete}
          />
        </View>
      </Modal>
    </Screen>
  );
}

export default Setting;
