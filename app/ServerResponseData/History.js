import { AsyncStorage } from "react-native";

let history = [];
let userHistory = [];

const get_historyItems = () => {
  AsyncStorage.getItem("History")
    .then((uh) => JSON.parse(uh))
    .then((pd) => {
      if (pd != null || pd != undefined) {
        history = pd;
      }
    })
    .catch((error) => console.log(error));
  // if (!history) return null;
  return history;
};

export const setHistory = async (items) => {
  if (!items) return;
  let suh = [];
  const data = await AsyncStorage.getItem("History");
  if (data) {
    suh = JSON.parse(data);
  }
  suh.push(items);
  AsyncStorage.setItem("History", JSON.stringify(suh)).catch((erro) =>
    console.log(erro)
  );
  history = suh;
};

export const get_userHistory = () => {
  AsyncStorage.getItem("userHistory")
    .then((uh) => JSON.parse(uh))
    .then((pd) => {
      if (pd != null || pd != undefined) {
        userHistory = pd;
      }
    })
    .catch((error) => console.log(error));
  // if (!userHistory) return null;
  return userHistory;
};

export const setUserHistory = async (v) => {
  if (!v) return null;
  let suh = [];
  const data = await AsyncStorage.getItem("userHistory");
  if (data) {
    suh = JSON.parse(data);
  }
  suh.push(v);
  AsyncStorage.setItem("userHistory", JSON.stringify(suh)).catch((erro) =>
    console.log(erro)
  );
  userHistory = suh;
};

export default get_historyItems;
