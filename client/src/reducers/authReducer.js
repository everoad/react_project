import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT
} from "../actions/authActions";

export const authReducer = {
  authentication
};

const initialState = {
  user: {
    userId: null,
    userNm: null
  },
  loggingIn: false
};

function authentication(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case LOGIN_SUCCESS:
      return {
        loggingIn: true,
        user: action.user
      };
    case LOGIN_FAILURE:
      return {
        user: {
          userId: null,
          userNm: null
        },
        loggingIn: false
      };
    case LOGOUT:
      return {
        user: {
          userId: null,
          userNm: null
        },
        loggingIn: false
      };
    default:
      return state;
  }
}
