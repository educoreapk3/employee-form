import api from "./client";

export const postRequest = async (url, data) => {
  try {
    const response = await api.post(url, data);

    const { type, message, data: resData } = response.data;

    if (type) {
      return response.data;
    } else {
      throw resData || message;
    }
  } catch (error) {
    console.error("API ERROR:", error?.response || error);
    throw error?.response?.data || error.message;
  }
};
