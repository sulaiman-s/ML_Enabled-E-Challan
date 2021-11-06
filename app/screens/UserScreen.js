import React from "react";
import Screen from "../compnents/Screen";
import UploadChallan from "../UserScreenComponents/UploadChallan";
import UserChallanList from "../UserScreenComponents/UserChallanList";
import UserMaster from "../UserScreenComponents/UserMaster";
import UserSearch from "../UserScreenComponents/UserSearch";

function UserScreen(props) {
  return (
    <Screen>
      <UploadChallan />
    </Screen>
  );
}

export default UserScreen;
