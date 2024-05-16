// this file is use to create a Users table
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { GetAllusers, UpdateUser } from "../../../API/users";
import { SetLoading } from "../../../redux/loadersSlice";
import { getDateTimeFormat } from "../../../helpers/helper";
import { Button, Switch, Table, Tabs, message } from "antd";

const Users = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getUsers = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetAllusers();
      setUsers(response.data);
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  const updateUser = async (user) => {
    try {
      dispatch(SetLoading(true));
      const response = await UpdateUser(user);
      message.success(response.message);
      getUsers();
      dispatch(SetLoading(false));
    } catch (error) {
      message.error(error.message);
      dispatch(SetLoading(false));
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    { title: "First Name", dataIndex: "firstName" },
    { title: "Last Name", dataIndex: "lastName" },
    { title: "Email", dataIndex: "email" },
    {
      title: "CreatedAt",
      dataIndex: "createdAt",
      render: (text) => getDateTimeFormat(text)
    },
    {
      title: "Is Admin",
      dataIndex: "isAdmin",
      render: (text, user) => (
        <Switch
          checked={text}
          onChange={(checked) => updateUser({ ...user, isAdmin: checked })}
        />
      )
    },
    {
      title: "Is Active",
      dataIndex: "isActive",
      render: (text, user) => (
        <Switch
          checked={text}
          onChange={(checked) => updateUser({ ...user, isActive: checked })}
        />
      )
    }
  ];

  return (
    <div>
      <Table dataSource={users} columns={columns} />
    </div>
  );
};

export default Users;
