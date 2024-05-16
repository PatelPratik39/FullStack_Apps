// import apiRequest  from "../API/index";
import apiRequest from ".";

// Post or Add Artist to Databased from UI
export const AddArtist = async (payload) => {
  return await apiRequest({
    method: "POST",
    endPoint: "/api/artists",
    payload
  });
};

// GET all the Artists lists
export const GetAllArtists = async () => {
  return await apiRequest({
    method: "GET",
    endPoint: "/api/artists"
  });
};

// GET a Artist using ID
export const GetArtistById = async (id) => {
  return await apiRequest({
    method: "GET",
    endPoint: `/api/artists/${id}`
  });
};

// Update Artist using Update method ; PUT
export const UpdateArtist = async (id, payload) => {
  return await apiRequest({
    method: "PUT",
    endPoint: `/api/artists/${id}`,
    payload
  });
};

// DELETE Artist using ID
export const DeleteArtist = async (id) => {
  return await apiRequest({
    method: "DELETE",
    endPoint: `/api/artists/${id}`
  });
};
