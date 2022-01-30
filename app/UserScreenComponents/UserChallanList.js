import React, { useEffect, useState } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import Label from "../compnents/label";
import Screen from "../compnents/Screen";
import UserListItem from "../compnents/UserListItem";
import UserSearch from "./UserSearch";
import axios from "axios";
import Url from "../Authorization/ApiUrlEndpoints";
import Token from "../Authorization/JwtToken";
import get_challans, { set_challans } from "../ServerResponseData/Challans";

function UserChallanList(props) {
  const [dat, setDat] = useState();
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState();
  const get_challanData = async () => {
    const { data } = await axios
      .get(Url + "/challans/allchallans/", {
        headers: { Authorization: "JWT" + Token.refresh },
      })
      .catch((error) => console.log(error));
    set_challans(data);
  };
  useEffect(() => {
    get_challanData();
  }, []);
  const handleSearch = () => {
    const challans = get_challans();
    const filter_challan = challans.filter((x) => x.vehicle_number == search);
    if (filter_challan.length >= 1) {
      setDat(filter_challan);
    } else {
      setMessage("not found");
      setTimeout(() => {
        setMessage(null);
      }, 1500);
    }
  };

  return (
    <Screen>
      <UserSearch Search={(t) => setSearch(t)} handleSearch={handleSearch} />
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
          <Text>
            {!search.length >= 1 ? "Enter a Valid Search Value" : message}
          </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator
          style={{ width: "100%" }}
          data={dat}
          keyExtractor={(item) => item.challan_id}
          renderItem={({ item }) => (
            <UserListItem
              ch_Number={item.challan_id}
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
