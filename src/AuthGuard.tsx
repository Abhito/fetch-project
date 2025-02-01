import { FC, ReactNode } from "react";
import { useAuth } from "./AuthContext.tsx";
import { Navigate } from "react-router-dom";

export const AuthGuard: FC<{ children?: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
