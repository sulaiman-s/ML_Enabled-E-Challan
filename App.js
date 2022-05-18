import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import jwtDecode from "jwt-decode";
import React, { useState, useEffect } from "react";
import { AsyncStorage, SectionList } from "react-native";
import AuthContext from "./app/Authorization/Context";
import { SavedToken } from "./app/Authorization/JwtToken";
import AdminDrawer from "./app/navigation/AdminNavigation";
import AuthNavigator from "./app/navigation/AuthNavigation";
import UserDrawer from "./app/navigation/UserNavigation";
import AppLoading from "expo-app-loading";
import axios from "axios";
import Url from "./app/Authorization/ApiUrlEndpoints";
export default function App() {
  const [user, setUser] = useState();
  const [profilePic, setProfilePic] = useState({});
  const [ready, setReady] = useState(false);
  const [check, seCheck] = useState(false);

  const Check_user_InMemory = () => {
    if (!user) {
      AsyncStorage.getItem("JwtToken")
        .then((t) => {
          return JSON.parse(t);
        })
        .then((tk) => {
          if (tk != null || tk != undefined) {
            SavedToken(tk.refresh);
            const u = jwtDecode(tk.refresh);
            if (u.exp < Date.now()) {
              setUser(u);
              axios
                .get(Url + "/user/profile/" + u.name)
                .then((res) => {
                  if (res.data.length > 0) {
                    setProfilePic(res.data[0]);
                  } else {
                    setProfilePic(null);
                  }
                })
                .catch((error) => console.log(error));
            }
            seCheck(true);
          } else {
            seCheck(true);
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const checker = () => {
    if (check) {
      if (user) {
        if (!user.is_admin) {
          return <UserDrawer />;
        } else if (user.is_admin) {
          return <AdminDrawer />;
        }
      } else return <AuthNavigator />;
    }
  };

  if (!ready) {
    <AppLoading
      startAsync={Check_user_InMemory()}
      onFinish={() => setReady(true)}
      onError={(error) => console.log(error)}
    />;
  }
  return (
    <AuthContext.Provider value={{ user, setUser, profilePic, setProfilePic }}>
      <NavigationContainer>{checker()}</NavigationContainer>
    </AuthContext.Provider>
  );
}
