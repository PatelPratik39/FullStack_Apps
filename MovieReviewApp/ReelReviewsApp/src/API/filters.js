import apiRequest from ".";

export const GetQuerySearchFilterResults = async (payload) => {
  return await apiRequest({
    method: "GET",
    endPoint: "/api/filters",
    queryStrings: payload
  });
};
