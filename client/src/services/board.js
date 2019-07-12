import axios from "axios";

export function getBoardItems(type, params) {
  return axios.get(`/api/board/${type}`, { params });
}

export function getBoardItem(type, params) {
  return axios.get(`/api/board/${type}/${params.id}`);
}

export function addBoardItem(params) {
  return axios.post("/api/board", params);
}
