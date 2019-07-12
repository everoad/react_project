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

export function editBoardItem(params) {
  return axios.put("/api/board", params);
}

export function removeBoardItem(params) {
  return axios.delete("/api/board", { data: params });
}
