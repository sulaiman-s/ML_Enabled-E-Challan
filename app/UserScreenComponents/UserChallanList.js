import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import UserListItem from "../compnents/UserListItem";
import UserSearch from "./UserSearch";
import axios from "axios";
import Url from "../Authorization/ApiUrlEndpoints";
import Token from "../Authorization/JwtToken";

function UserChallanList(props) {
  const [dat, setDat] = useState();
  const get_challanData = async () => {
    const { data } = await axios
      .get(Url + "/challans/allchallans/", {
        headers: { Authorization: "JWT" + Token.refresh },
      })
      .catch((error) => console.log(error));
    setDat(data);
  };
  useEffect(() => {
    get_challanData();
  }, []);
  return (
    <Screen>
      <UserSearch />
      <Label
        value="Related Challans"
        style={{
          // backgroundColor: "#ACD1AF",
          color: "tomato",
          marginTop: 5,
          elevation: 0,
        }}
      />
      {dat == null ? (
        <View>
          <Text>Nothing was Searched</Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator
          style={{ width: "100%" }}
          data={dat}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <UserListItem
              // ch_Number={item.}
              number={item.vehicle_number}
              stetus={item.challan_status}
              type={item.vehicle_type}
              price={item.challan_amount}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 5 }}></View>}
        />
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({});
export default UserChallanList;
