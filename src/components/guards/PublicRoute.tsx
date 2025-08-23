import React from "react";
import { useAppSelector } from "../../store/hooks";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const user = useAppSelector((state) => state.auth.user);
  return user ? <Navigate to="/" replace /> : children;
};

export default PublicRoute;
