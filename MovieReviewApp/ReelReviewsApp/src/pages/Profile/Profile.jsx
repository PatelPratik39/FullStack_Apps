import React from "react";
import { Tabs } from "antd";
import UserReviews from "./UserReviews";
import UserDetails from "../Profile/UserDetails";

const Profile = () => {
  return (
    <Tabs defaultActiveKey="1">
      <Tabs.TabPane tab="Reviews" key="1">
        <UserReviews />
      </Tabs.TabPane>
      <Tabs.TabPane tab="Profile" key="2">
        <UserDetails />
      </Tabs.TabPane>
    </Tabs>
  );
};

export default Profile;
