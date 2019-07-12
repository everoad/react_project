import { connect } from "react-redux";
import { authActions } from "../../actions/authActions";

function Logout({ dispatch }) {
  dispatch(authActions.logout());

  return null;
}

export default connect()(Logout);
