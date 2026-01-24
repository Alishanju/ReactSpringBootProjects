import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Register from "./pages/Register";
import Products from "./pages/Products";
import AdminProducts from "./pages/AdminProducts";
import Login from "./pages/Login";
import ProtectedRoute from "./auth/ProtectedRoute";
import Navbar from "./components/NavBar";
import { useAuth } from "./auth/AuthContext";

export default function App() {
  const { isLoggedIn, isAdmin } = useAuth();

  return (
    <BrowserRouter >
      <Navbar />

      <Routes>
        {/* PUBLIC ROUTES */}
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/products" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/products" />}
        />

        {/* USER ROUTES */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          }
        />

        {/* ADMIN ROUTE */}
        {isAdmin && (
          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminProducts />
              </ProtectedRoute>
            }
          />
        )}

        {/* DEFAULT */}
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/products" : "/login"} />}
        />
      </Routes>
    </BrowserRouter>
  );
}
