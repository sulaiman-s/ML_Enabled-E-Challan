import React from "react";
import { View, StyleSheet, ColorPropType } from "react-native";
import AppInput from "../compnents/AppInput";
import AppButton from "../compnents/AppButton";
import { Color } from "../assets/colors";

function UserSearch({ Search, handleSearch }) {
  return (
    <View style={styles.search_view}>
      <AppInput
        placeholder="Enter Vehicle Number(e.g, 'LHR-203')"
        placeholderTextColor={Color.DuoGray}
        iconName="search-web"
        iconColor={Color.DuoGray}
        viewStyle={styles.search_bar}
        onChangeText={Search}
        style={{ color: "white" }}
      />
      <AppButton
        title="Search"
        height={52}
        width="20%"
        style={styles.search_btn}
        textStyle={{ color: "white", fontWeight: "bold" }}
        onPress={handleSearch}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  search_btn: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 2,
    borderRadius: 5,
    // borderColor: Color.DuoGray,
    backgroundColor: Color.Duolightb,
  },
  search_bar: {
    borderRadius: 5,
    borderColor: Color.DuoGray,
    backgroundColor: Color.DuoBackGray,
    color: "white",
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
