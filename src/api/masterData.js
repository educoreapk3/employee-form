import api from "./client";

export const getCountries = async () => {
  const res = await api.get("/get-countries");
  return res.data;
};

export const getLanguages = async () => {
  const res = await api.get("/get-languages");
  return res.data;
};