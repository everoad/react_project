import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { authReducer } from "../reducers/authReducer";
import { dataReducer } from "../reducers/dataReducer";

export const rootReducer = combineReducers({
  authentication: authReducer.authentication,
  defaultData: dataReducer.defaultData
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
