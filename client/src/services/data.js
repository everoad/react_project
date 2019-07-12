import axios from "axios";

export function getDefaultData() {
  return axios.get("/api/data/default");
}

export function uploadFile(params) {
  return axios.post("/api/data/upload", params, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
