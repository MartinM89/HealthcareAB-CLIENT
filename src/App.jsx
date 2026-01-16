import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login";
import UserDashboard from "./components/UserDashboard";
import AdminDashboard from "./components/AdminDashboard";
import Unauthorized from "./components/Unauthorized";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import "./styles/root.css";
import CreateBooking from "./components/CreateBooking/CreateBooking";

// AuthProvider must wrap Router to ensure auth state is available to all routes
function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes - accessible without authentication */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="unauthorized" element={<Unauthorized />} />

            {/* Protected routes - require authentication and specific roles */}
            <Route
              path="user/dashboard"
              element={
                <RequireAuth allowedRoles={["PATIENT"]}>
                  <UserDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="admin/dashboard"
              element={
                <RequireAuth allowedRoles={["CAREGIVER"]}>
                  <AdminDashboard />
                </RequireAuth>
              }
            />
            <Route
              path="user/create-booking"
              element={
                <RequireAuth allowedRoles={["PATIENT"]}>
                  <CreateBooking />
                </RequireAuth>
              }
            />

            {/* Fallback route - redirects unknown paths to home */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
