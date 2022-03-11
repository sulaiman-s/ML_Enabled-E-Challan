import React from "react";
import { View, StyleSheet } from "react-native";
import AppInput from "../compnents/AppInput";
import AppButton from "../compnents/AppButton";

function UserSearch({ Search, handleSearch }) {
  return (
    <View style={styles.search_view}>
      <AppInput
        placeholder="Enter Vehicle Number(e.g, 'LHR-203')"
        iconName="search-web"
        viewStyle={styles.search_bar}
        onChangeText={Search}
      />
      <AppButton
        title="Search"
        height={52}
        width="20%"
        style={styles.search_btn}
        onPress={handleSearch}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  search_btn: {
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderRadius: 5,
    borderColor: "rgb(82,174,211)",
  },
  search_bar: {
    borderColor: "rgb(82,174,211)",
    width: "80%",
  },
  search_view: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
export default UserSearch;
