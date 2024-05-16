import React from "react";
import { Form, Button, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LoginUser } from "../../API/users";
import { useEffect } from "react";
import { antValidationError } from "../../helpers/helper";
import { useDispatch } from 'react-redux';
import { SetLoading } from "../../redux/loadersSlice.js";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (values) => {
    try {
      dispatch(SetLoading(true));
      const response = await LoginUser(values);
      dispatch(SetLoading(false));
      // storing token into loca storage
      localStorage.setItem("token", response.data);
      message.success(response.message);
      navigate('/')
      console.log(values);
    } catch (error) {
      message.error(error.message);
    }
  };
  // validate token
  useEffect(() => {
    if(localStorage.getItem('token')){
      navigate('/');
    }
  },[])

  return (
    <>
      <div className="grid grid-cols-2 h-screen">
        <div className="bg-primary flex flex-col items-center justify-center">
          <div>
            <h1 className="text-7xl text-orange-600 font-semibold">
              Reel Reviews App
            </h1>
            <span className="text-xl text-gray-400 mt-4 flex items-center justify-center">
              Let's share your reviews for the Reels!!
            </span>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="w-[400px]">
            <h1 className="text-2xl my-5 mb-2">Login</h1>
            <hr />
            <Form
              layout="vertical"
              className="flex flex-col gap-5 mt-3"
              onFinish={handleSubmit}
            >
              <Form.Item label="Email" name="email" rules={antValidationError}>
                <input type="email" />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={antValidationError}
              >
                <input type="password" />
              </Form.Item>
              <div className="flex flex-col gap-5">
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
                <div className="flex justify-center">
                  <span>
                    Don't have an Account? <Link to="/register"> Register </Link>
                  </span>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
