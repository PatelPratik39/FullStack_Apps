import axios from "axios";
import { message } from "antd";

const apiRequest = async ({ method, endPoint, payload, queryStrings }) => {
  try {
    const response = await axios(
      {
        method,
        url: endPoint,
        data: payload,
        params: queryStrings,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      }

      // after moving below headere to the above code, i wont get any spilt of undefined error
      // {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("token")}`
      //   }
      // }
    );
    return response.data;
  } catch (error) {
    // this line of code handles all the error scenarios
    throw new Error(
      error.response.data.message || error.message || "Something went Wrong ⛔️"
    );
  }
};
export default apiRequest;
