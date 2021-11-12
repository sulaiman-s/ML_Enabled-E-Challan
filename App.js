import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import React, { useState } from "react";
import AuthContext from "./app/Auth/Context";
import AdminDrawer from "./app/navigation/AdminNavigation";
import AuthNavigator from "./app/navigation/AuthNavigation";
import UserDrawer from "./app/navigation/UserNavigation";

export default function App() {
  const [user, setUser] = useState();

  const checker = () => {
    if (user == "Sulaiman") return <UserDrawer />;
    else if (user == "Admin") return <AdminDrawer />;
    else return <AuthNavigator />;
  };
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer>{checker()}</NavigationContainer>
    </AuthContext.Provider>
  );
}
