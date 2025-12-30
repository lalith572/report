import { useNavigate } from "react-router-dom";
import { logout } from "../auth/auth";

export default function Navbar() {
  const navigate = useNavigate();

  const signOut = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <span className="navbar-brand">Admin Panel</span>
      <button className="btn btn-danger" onClick={signOut}>Logout</button>
    </nav>
  );
}
