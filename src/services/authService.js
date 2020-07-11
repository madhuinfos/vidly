import jwtDecode from "jwt-decode";
import http from "./common/httpService";
import config from "../config.json";

const authUrl = config.apiBaseEndPoint + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const response = await http.post(authUrl, { email, password });
  localStorage.setItem(tokenKey, response.data);
}

export async function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (error) {
    //console.log(error);
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getJwt,
};
