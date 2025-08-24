import type React from 'react';
import { useAppSelector } from '../../store/hooks';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) {
    return <></>;
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default ProtectedRoute;
