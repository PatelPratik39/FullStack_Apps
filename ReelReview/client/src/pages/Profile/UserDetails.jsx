import React, { useEffect } from "react";
import { Form, Button, message } from "antd";
import { UpdateUser } from "../../API/users";
import { antValidationError } from "../../helpers/helper";
import { SetLoading } from "../../redux/loadersSlice";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../../redux/usersSlice";

const UserDetails = () => {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    console.log(values);
    try {
      dispatch(SetLoading(true));
      const response = await UpdateUser({
        ...values,
        _id: user._id
      });
      console.log(response.data);
      message.success(response.message);

      dispatch(SetUser(response.data));
      dispatch(SetLoading(false));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  return (
    <div>
      <Form
        layout="vertical"
        className="flex flex-col gap-5 mt-3 w-96"
        onFinish={onFinish}
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        }}
      >
        <Form.Item
          label="First Name"
          name="firstName"
          rules={antValidationError}
        >
          <input />
        </Form.Item>

        <Form.Item label="Last Name" name="lastName" rules={antValidationError}>
          <input />
        </Form.Item>

        <Form.Item label="Email" name="email" rules={antValidationError}>
          <input type="email" />
        </Form.Item>

        <Form.Item
          label="Old Password"
          name="oldPassword"
          rules={antValidationError}
        >
          <input type="password" />
        </Form.Item>

        <Form.Item
          label="New Password"
          name="newPassword"
          rules={antValidationError}
        >
          <input type="password" />
        </Form.Item>

        <div className="flex flex-col gap-5">
          <Button type="primary" htmlType="submit" block>
            Update User Details
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default UserDetails;
