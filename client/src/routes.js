import About from "./views/user/About";
import CodingList from "./views/coding/CodingList";
import CodingDetail from "./views/coding/CodingDetail";
import CodingEditor from "./views/coding/CodingEditor";

import Login from "./views/auth/Login";
import Logout from "./views/auth/Logout";

export const publicRoutes = [
  {
    path: "/about",
    component: About,
    exact: true
  },
  {
    path: "/coding",
    component: CodingList,
    exact: true
  },
  {
    path: "/coding/:id",
    component: CodingDetail,
    exact: true
  }
];

export const privateRoutes = [
  {
    path: "/coding/editor",
    component: CodingEditor,
    exact: true
  }
];

export const authRoutes = [
  {
    path: "/login",
    component: Login,
    exact: true
  },
  {
    path: "/logout",
    component: Logout,
    exact: true
  }
];
