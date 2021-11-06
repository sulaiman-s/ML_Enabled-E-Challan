import React, { useState } from "react";
import { View } from "react-native";
import AppInput from "../compnents/AppInput";

function UserSearch(props) {
  const [search, setSearch] = useState("");
  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
      }}
    >
      <AppInput
        placeholder="Enter Vehicle Number"
        onChangeText={(text) => setSearch(text)}
        iconName="search-web"
        viewStyle={{ borderColor: "tomato" }}
      />
    </View>
  );
}

export default UserSearch;
