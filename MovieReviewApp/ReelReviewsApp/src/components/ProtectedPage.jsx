import React from "react";
import { message } from "antd";
import { useState, useEffect } from "react";
import { GetCurrentUser } from "../API/users.js";
import { useNavigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getCurrentUser = async () => {
    try {
      const response = await GetCurrentUser();
      setUser(response.data);
    } catch (error) {
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
        <span className="font-semibold text-orange-500 text-2xl">
          Reel Review App
        </span>
        <div className="bg-white rounded px-8 py-4 flex gap-6 items-center cursor-pointer ">
          <i className="ri-user-fill"></i>
          <span
            className="text-primary text-sm cursor-pointer underline"
            onClick={() => navigate("/profile")}
          >
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
      <div className="p-5">{children}</div>
    </div>
  );
};

export default ProtectedPage;
