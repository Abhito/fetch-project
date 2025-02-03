import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { AxiosError } from 'axios';
import { ApiService } from './api/ApiService.ts';

type User = {
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (newUser: User) => {
    setUser(newUser);
  };

  const logout = () => {
    setUser(null);
  };

  function handleErrorResponse(error: AxiosError): Promise<AxiosError> {
    console.error(`HTTP Error: ${error.message}`, { error });
    if (error.status === 401 || error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  }

  useEffect(() => {
    ApiService.addErrorResponse(handleErrorResponse);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
