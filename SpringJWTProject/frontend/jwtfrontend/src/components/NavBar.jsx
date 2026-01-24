import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";


export default function Navbar() {
  const { isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center px-6 py-4 bg-black text-white">
      <div className="font-bold text-lg flex flex-row items-center justify-center cursor-pointer max-sm:hidden" onClick={handleLogout}  >
        <img src="https://www.freepnglogos.com/uploads/app-store-logo-png/apple-app-store-vector-logo-eps-svg-download-17.png" alt="logo" fetch="eager" className="w-10" />
        <span>MyApp</span>
        </div>
      <div className="ml-auto flex gap-6">
      {isLoggedIn && <Link to="/products">Products</Link>}
      {isAdmin && <Link to="/admin">Add Product</Link>}
      {!isLoggedIn && <Link to="/login">Login</Link>}
      {!isLoggedIn && <Link to="/register">Register</Link>}
      {isLoggedIn && <button onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}
