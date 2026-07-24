import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}) => {
  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.role ? String(user.role).toUpperCase() : "";
  const normalizedAllowed = allowedRoles.map((r) => String(r).toUpperCase());

  if (
    normalizedAllowed.length > 0 &&
    !normalizedAllowed.includes(userRole)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;