import axios from "axios";
import { authActions } from "../actions/authActions";

export const init = store => {
  axios.interceptors.request.use(
    config => requestInterceptor(config, store),
    error => Promise.reject(error)
  );

  axios.interceptors.response.use(
    config => config,
    error => responseError(error, store)
  );
};

function requestInterceptor(config, store) {
  const token = localStorage.getItem("my_app_access_token");
  if (store.getState().authentication.loggingIn && token) {
    config.headers = {
      ...config.headers,
      token
    };
  }
  return config;
}

async function responseError(error, store) {
  let response = error.response;
  let status = response.status;
  let errorKey = response.data.error;
  //let message = response.data.error_description;

  switch (status) {
    case 500:
      return Promise.reject(error);
    case 401:
      if (errorKey === "invalid_token") {
        await store.dispatch(await authActions.refreshToken());

        let config = response.config;
        let res = await axios[config.method](config.url, config.data, {
          headers: config.headers
        });
        return Promise.resolve(res);
      }
      break;
    default:
      return;
  }
}
