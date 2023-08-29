import axios from "../base_axios.js";

const login = ({ username, password }) => {
  return axios.post("/login/", { username, password });
};

const refresh = (refreshToken) => {
  return axios.post("/refresh/", { refresh: refreshToken });
};

const logout = (refreshToken) => {
  return axios.post("/logout/", { refresh: refreshToken });
};

export { login, refresh, logout };
