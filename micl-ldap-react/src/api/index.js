import axios from "../utils/AxiosPlugin";

export const register = async params => {
  return await axios.post(`register`, params);
};

export const reset = async params => {
  return await axios.post(`reset`, params);
};
