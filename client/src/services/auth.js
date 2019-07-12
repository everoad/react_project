import axios from "axios";

export function login(username, password) {
  return axios.post("/auth/login", {
    grant_type: "password",
    username,
    password
  });
}

export function validAccessToken(token) {
  return axios.post("/auth/valid/token", {
    token
  });
}

export function refreshToken(token) {
  return axios.post("/auth/login", {
    grant_type: "refresh_token",
    refresh_token: token
  });
}
