import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import React, { useState } from "react";
import { AsyncStorage } from "react-native";
import AuthContext from "./app/Authorization/Context";
import { SavedToken } from "./app/Authorization/JwtToken";
import AdminDrawer from "./app/navigation/AdminNavigation";
import AuthNavigator from "./app/navigation/AuthNavigation";
import UserDrawer from "./app/navigation/UserNavigation";

export default function App() {
  const [user, setUser] = useState();

  const checker = () => {
    if (!user) {
      AsyncStorage.getItem("JwtToken")
        .then((t) => {
          console.log("parsing");
          return JSON.parse(t);
        })
        .then((tk) => {
          SavedToken(tk.refresh);
          if (tk != null || tk != undefined) {
            const u = jwtDecode(tk.refresh);
            if (u.exp < Date.now()) {
              setUser(u);
            }
          }
        })
        .catch((error) => console.log(error));
    }
    if (user) {
      if (!user.is_admin) {
        return <UserDrawer />;
      } else if (user.is_admin) {
        return <AdminDrawer />;
      }
    } else return <AuthNavigator />;
  };
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>{checker()}</NavigationContainer>
    </AuthContext.Provider>
  );
}
