import './App.scss';
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { AuthProvider } from './AuthContext.tsx';
import { AuthGuard } from './AuthGuard.tsx';
import Login from './pages/Login';
import '@fontsource/roboto/400.css';
import Home from './pages/Home';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path='/home'
            element={
              <AuthGuard>
                <Home />
              </AuthGuard>
            }
          />
          <Route path='/' element={<Navigate to='/home' replace />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
