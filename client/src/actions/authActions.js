import * as service from "../services/auth";
import { history } from "../utils/history";

export const SET_TOKEN = "SET_TOKEN";
export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";
export const LOGOUT = "LOGOUT";

const ACCESS_TOKEN_KEY = "my_app_access_token";
const REFRESH_TOKEN_KEY = "my_app_refresh_token";

export const authActions = {
  login,
  autoLogin,
  logout,
  refreshToken
};

function login(username, password) {
  return dispatch => {
    //dispatch(request({ username }));

    service.login(username, password).then(
      async res => {
        let user = {};
        user.userId = res.data.user.user_name;
        user.roles = res.data.user.authorities;

        localStorage.setItem(ACCESS_TOKEN_KEY, res.data.token.access_token);

        localStorage.setItem(REFRESH_TOKEN_KEY, res.data.token.refresh_token);

        await dispatch(success(user));
        history.goBack();
      },
      error => {
        if (
          error.response.status === 400 &&
          error.response.data.error_description === "Bad credentials"
        ) {
          alert("잘못된 아이디 또는 비밀번호입니다.");
        }
        dispatch(failure(error.toString()));
      }
    );
  };
}

function autoLogin() {
  return async dispatch => {
    let access = localStorage.getItem(ACCESS_TOKEN_KEY);
    let refresh = localStorage.getItem(REFRESH_TOKEN_KEY);

    if (access && refresh) {
      try {
        let res = await service.validAccessToken(access);
        let user = {};
        user.userId = res.data.user_name;
        user.roles = res.data.authorities;
        dispatch(success(user));
      } catch (e) {
        await refreshToken()(dispatch);
      }
    }
  };
}

function refreshToken() {
  return async dispatch => {
    let refresh = localStorage.getItem(REFRESH_TOKEN_KEY);
    try {
      let res = await service.refreshToken(refresh);
      let user = {};
      user.userId = res.data.user.user_name;
      user.roles = res.data.user.authorities;

      localStorage.setItem(ACCESS_TOKEN_KEY, res.data.token.access_token);
      localStorage.setItem(REFRESH_TOKEN_KEY, res.data.token.refresh_token);

      dispatch(success(user));
    } catch (e) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      dispatch(failure(e));
    }
  };
}

function logout() {
  return dispatch => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    history.push("/");
  };
}

// function request(user) {
//   return { type: LOGIN_REQUEST, user };
// }
function success(user) {
  return { type: LOGIN_SUCCESS, user };
}
function failure(error) {
  return { type: LOGIN_FAILURE, error };
}
