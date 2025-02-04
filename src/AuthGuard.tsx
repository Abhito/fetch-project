import { FC, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext.tsx';
import { useNavigate } from 'react-router-dom';

export const AuthGuard: FC<{ children?: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login', { replace: true });
    }
  }, [user]);

  return !user ? null : children;
};
