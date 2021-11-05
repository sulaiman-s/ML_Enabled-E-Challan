import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import AppInput from "../compnents/AppInput";
import UserListItem from "../compnents/UserListItem";
import AppButton from "../compnents/AppButton";
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
/*Testing for github*/
function UserScreen(props) {
  const [search, setSearch] = useState("");
  const [url, setUrl] = useState();
  const handleUpload = async () => {
    const result = await ImagePicker.launchImageLibraryAsync();
    setUrl(result.uri);
  };
  return (
    <View style={styles.cont}>
      <View
        style={{
          flex: 0.3,
          width: "100%",
          justifyContent: "center",
        }}
      >
        <AppInput
          placeholder="Enter Vehicle Number"
          onChangeText={(text) => setSearch(text)}
          iconName="search-web"
        />
      </View>
      <View style={{ flex: 0.3 }}>
        <View style={styles.ch_view}>
          <Text style={styles.ch_items}>Number</Text>
          <Text style={styles.ch_items}>Time</Text>
          <Text style={styles.ch_items}>Location</Text>
          <Text style={styles.ch_items}>Status</Text>
        </View>
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
      </View>
      <View style={{ flex: 0.4, width: "100%", paddingTop: 20 }}>
        <Text>Upload Challan Image</Text>
        <TouchableOpacity onPress={handleUpload}>
          <View
            style={{
              backgroundColor: "gray",
              height: 150,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            {url == null ? (
              <MaterialCommunityIcons
                name="camera"
                size={100}
                color="lightgray"
              />
            ) : (
              <Image
                source={{ uri: url }}
                style={{ height: 100, width: "100%" }}
              />
            )}
          </View>
        </TouchableOpacity>
        <AppButton
          title="Upload"
          textStyle={styles.btn_t}
          height={30}
          width={60}
          style={styles.btn}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cont: {
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    width: "100%",
    padding: 10,
  },
  ch_view: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    borderBottomWidth: 1,
  },
  btn: {
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginTop: 5,
  },
  btn_t: {
    color: "white",
  },
});
export default UserScreen;
