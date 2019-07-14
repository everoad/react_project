import axios from "axios";

export function getProfile() {
  return axios.get("/api/profile");
}

export function editProfile(params) {
  return axios.post("/api/profile", params);
}