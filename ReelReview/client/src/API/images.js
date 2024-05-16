import apiRequest from ".";

// this uploadImage API that make integration with backedn Upload API and path for upload image

export const UploadImage = async (payload) => {
  return await apiRequest({
    method: "POST",
    // endPoint: "/api/images",
    endPoint: "/api/images/upload-image",
    payload
  });
};
