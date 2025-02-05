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
import { ErrorProvider } from './components/ErrorDisplay/ErrorContext.tsx';
import { ErrorDisplay } from './components/ErrorDisplay';

function App() {
  return (
    <ErrorProvider>
      <AuthProvider>
        <Router basename={'/fetch-project'}>
          <Routes>
            <Route
              path='/home'
              element={
                <AuthGuard>
                  <Home />
                </AuthGuard>
              }
            />
            <Route path='/login' element={<Login />} />
            <Route path='*' element={<Navigate to='/home' replace />} />
          </Routes>
        </Router>
        <ErrorDisplay />
      </AuthProvider>
    </ErrorProvider>
  );
}

export default App;
