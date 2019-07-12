import { SET_DEFAULT_DATA } from "../actions/dataActions";

export const dataReducer = {
  defaultData
};

const initialState = {
  category: [],
  type: []
};

function defaultData(state = initialState, action) {
  switch (action.type) {
    case SET_DEFAULT_DATA:
      return {
        category: action.data.category,
        type: action.data.type
      };
    default:
      return state;
  }
}
