import { useNavigate } from "react-router-dom";

export default function AuthButtons() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <button
        className="auth-btn auth-btn-login"
        onClick={() => navigate("/login")}
      >
        Log In
      </button>
      <button
        className="auth-btn auth-btn-register"
        onClick={() => navigate("/register")}
      >
        Register
      </button>
    </div>
  );
}