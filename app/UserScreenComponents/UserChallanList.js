import React from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import Label from "../compnents/label";
import UserListItem from "../compnents/UserListItem";
import UserSearch from "./UserSearch";
const dat = [
  {
    id: "0001",
    number: "Aww-3443",
    date: "1/2/2020",
    type: "Bike",
    price: 200,
  },
  {
    id: "0002",
    number: "Aww-3443",
    date: "1/2/2020",
    type: "Bike",
    price: 200,
  },
  {
    id: "0003",
    number: "Aww-3443",
    date: "1/2/2020",
    type: "Bike",
    price: 200,
  },
  {
    id: "0004",
    number: "Aww-3443",
    date: "1/2/2020",
    type: "Bike",
    price: 200,
  },
  {
    id: "0005",
    number: "Aww-3443",
    date: "1/2/2020",
    type: "Bike",
    price: 200,
  },
];

function UserChallanList(props) {
  return (
    <>
      <UserSearch />
      <Label
        value="Related Challans"
        style={{
          backgroundColor: "lightslategray",
          color: "white",
          marginTop: 5,
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
              ch_Number={item.id}
              number={item.number}
              date={item.date}
              type={item.type}
              price={item.price}
            />
          )}
          ItemSeparatorComponent={() => <View style={{ height: 5 }}></View>}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({});
export default UserChallanList;
