import React, { useState } from "react";
import Movies from "./Movies/Movies";
import Artists from "./Artists/Artists";
import Users from "./Users/Users";
import { Tabs } from "antd";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const AdminIndex = () => {
  const [activeTab, setActiveTab] = useState("1");
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  return (
    <>
      <div>
        {/* is user has isAdmin = true, user can see the page otherwise NOT */}
        {/* {user?.isAdmin ? (
          <Tabs
            defaultActiveKey="1"
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key);
              navigate(`/admin?tab=${key}`);
            }}
          ></Tabs> */}
        {user?.isAdmin ? (
          <Tabs
            defaultActiveKey="1"
            activeKey={activeTab}
            onChange={(key) => {
              setActiveTab(key);
              navigate(`/admin?tab=${key}`);
            }}
          >
            {/* Above logic in Tabs tag is hust for mappting purpose for using query selector */}
            <Tabs.TabPane tab="Movies" key="1">
              <Movies />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Artists" key="2">
              <Artists />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Users" key="3">
              <Users />
            </Tabs.TabPane>
          </Tabs>
        ) : (
          <div>
            <div className="text-gray-600 text-xl text-center mt-20">
              ⛔️ You are not authorized to view this Page !! ⛔️
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AdminIndex;
