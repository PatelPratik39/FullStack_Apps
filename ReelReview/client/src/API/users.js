import apiRequest from ".";

export const RegisterUser = async (payload) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/users/register",
    payload
  });
};

export const LoginUser = async (payload) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/users/login",
    payload
  });
};

export const GetCurrentUser = async () => {
  return await apiRequest({
    method: "GET",
    endPoint: "/api/users/getCurrentUser"
  });
};

export const UpdateUser = async (payload) => {
  return await apiRequest({
    method: "PUT",
    endPoint: "/api/users/updateUser",
    payload
  });
};

export const GetAllusers = async () => {
  return await apiRequest({
    method: "GET",
    endPoint: "/api/users/getAllusers"
  });
};
