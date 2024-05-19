import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import authService from "../utils/authService";

interface ProtectedRouteProps {
  element: React.ComponentType<any>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Element,
}) => {
  const [cookies] = useCookies(["accessToken"]);
  const isAuthenticated = !authService.isAccessTokenExpired(
    cookies.accessToken
  );
  const location = useLocation();

  return isAuthenticated ? (
    <Element />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
};

export default ProtectedRoute;
