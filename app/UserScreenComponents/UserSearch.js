import React, { useState } from "react";
import { View } from "react-native";
import AppInput from "../compnents/AppInput";
import AppButton from "../compnents/AppButton";

function UserSearch({ Search, handleSearch }) {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
      }}
    >
      <AppInput
        placeholder="Enter Vehicle Number(e.g, 'LHR-203')"
        iconName="search-web"
        viewStyle={{ borderColor: "tomato", width: "80%" }}
        onChangeText={Search}
      />
      <AppButton
        title="Search"
        height={52}
        width="20%"
        style={{
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 2,
          borderRadius: 5,
          borderColor: "tomato",
        }}
        onPress={handleSearch}
      />
    </View>
  );
}

export default UserSearch;
