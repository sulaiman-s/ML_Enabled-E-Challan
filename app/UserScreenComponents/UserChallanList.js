import React from "react";
import { StyleSheet, FlatList } from "react-native";
import UserListItem from "../compnents/UserListItem";
const dat = [
  {
    id: "1",
    number: "Aww-3443",
    time: "12:00am",
    location: "long-lat",
    status: "unpaid",
  },
  {
    id: "2",
    number: "Aww-3443",
    time: "12:00am",
    location: "long-lat",
    status: "unpaid",
  },
  {
    id: "3",
    number: "Aww-3443",
    time: "12:00am",
    location: "long-lat",
    status: "unpaid",
  },
  {
    id: "4",
    number: "Aww-3443",
    time: "12:00am",
    location: "long-lat",
    status: "unpaid",
  },
];

function UserChallanList(props) {
  return (
    <FlatList
      scrollEnabled
      data={dat}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <UserListItem
          number={item.number}
          time={item.time}
          location={item.location}
          status={item.status}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({});
export default UserChallanList;
