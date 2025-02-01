import "./App.scss";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, } from "./AuthContext.tsx";
import { AuthGuard } from "./AuthGuard.tsx";
import Login from "./pages/Login";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route
            path="/app/*"
            element={
              <AuthGuard>
                <>
                  <Route index />
                </>
              </AuthGuard>
            }
          />
          <Route
            path="/"
            element={
              <AuthGuard>
                <Navigate to="/app/" replace />
              </AuthGuard>
            }
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
