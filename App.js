import { NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import AuthContext from "./app/Auth/Context";
import AdminTabNavigator from "./app/navigation/AdminNavigation";
import AuthNavigator from "./app/navigation/AuthNavigation";
import UserTabNavigator from "./app/navigation/UserNavigation";

export default function App() {
  const [user, setUser] = useState();

  const checker = () => {
    if (user == "Sulaiman") return <UserTabNavigator />;
    else if (user == "Admin") return <AdminTabNavigator />;
    else return <AuthNavigator />;
  };
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>{checker()}</NavigationContainer>
    </AuthContext.Provider>
  );
}
