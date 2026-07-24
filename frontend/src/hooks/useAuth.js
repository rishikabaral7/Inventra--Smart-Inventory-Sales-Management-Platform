import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { logout } from "../redux/authSlice";
import apolloClient from "../graphql/apolloClient";

export default function useAuth() {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    dispatch(logout());
    apolloClient.clearStore();
    navigate("/login");
  };

  const hasRole = (roles = []) => {
    if (!roles.length) {
      return true;
    }

    return roles.includes(auth.user?.role);
  };

  return {
    user: auth.user,
    token: auth.token,
    isAuthenticated: auth.isAuthenticated,
    logoutUser,
    hasRole,
  };
}
