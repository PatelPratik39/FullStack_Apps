import React from "react";
import { message } from "antd";
import { useState, useEffect } from "react";
import { GetCurrentUser } from "../API/users.js";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { SetLoading } from "../redux/loadersSlice.js";

const ProtectedPage = ({ children }) => {
  // const [user, setUser] = useState(null);
  const dispatch = useDispatch(); //i used this hook because i want user i want it from global store
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      dispatch(SetLoading(true));
      const response = await GetCurrentUser();
      dispatch(SetLoading(false));
      // setUser(response.data);
      dispatch(SetUser(response.data));
    } catch (error) {
      dispatch(SetLoading(false));
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      getCurrentUser();
    }
  }, []);
  return (
    <div>
      <div className="flex justify-between items-center bg-primary p-5">
        <span
          className="font-semibold text-orange-500 text-2xl"
          onClick={() => navigate("/")}
        >
          Reel Review App
        </span>
        <div className="bg-white rounded px-5 py-4 flex gap-3 items-center cursor-pointer ">
          <i className="ri-user-fill" onClick={() => navigate("/profile")}></i>
          <span className="text-primary text-lg cursor-pointer underline" onClick={() =>  navigate('/admin')}>
            {user?.firstName}
          </span>
          <i
            className="ri-logout-box-r-fill"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          ></i>
        </div>
      </div>

      {/* is User data present then render otherwis NOT */}
      {user && <div className="p-5">{children}</div>}
      {/* <div className="p-5">
        {user && children}
      </div> */}
    </div>
  );
};

export default ProtectedPage;
