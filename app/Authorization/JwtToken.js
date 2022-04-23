import { AsyncStorage } from "react-native";
const Token = { refresh: "" };

export const SetToken = async (token) => {
  Token.refresh = token;
  await AsyncStorage.setItem("JwtToken", JSON.stringify(Token)).catch((error) =>
    console.log(error)
  );
  console.log("saved");
};

export const SavedToken = (token) => {
  Token.refresh = token;
};

export default Token;
