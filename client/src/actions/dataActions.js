import * as service from "../services/data";

export const SET_DEFAULT_DATA = "REQUEST_DATA";

export const dataActions = {
  getDefaultData
};

function getDefaultData() {
  return async dispatch => {
    const res = await service.getDefaultData();

    dispatch({ type: SET_DEFAULT_DATA, data: res.data });
  };
}
