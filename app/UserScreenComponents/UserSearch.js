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
        viewStyle={{ borderColor: "rgb(82,174,211)", width: "80%" }}
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
          borderColor: "rgb(82,174,211)",
        }}
        onPress={handleSearch}
      />
    </View>
  );
}

export default UserSearch;
