import React from "react";
import Screen from "../compnents/Screen";
import UploadChallan from "../UserScreenComponents/UploadChallan";
import UserChallanList from "../UserScreenComponents/UserChallanList";
import UserMaster from "../UserScreenComponents/UserMaster";

function UserScreen(props) {
  return (
    <Screen>
      <UserMaster />
    </Screen>
  );
}

export default UserScreen;
