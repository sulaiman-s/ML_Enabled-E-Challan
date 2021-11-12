import React, { useContext } from "react";
import { Platform, StatusBar } from "react-native";
import AppButton from "../compnents/AppButton";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import AuthContext from "../Auth/Context";

function Setting(props) {
  const authContext = useContext(AuthContext);
  return (
    <Screen
      style={{
        marginTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <Label value="Log Out" onPress={() => authContext.setUser(null)} />
    </Screen>
  );
}

export default Setting;
