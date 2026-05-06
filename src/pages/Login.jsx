import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
import logoImg from "../assets/logos/zolalive.png";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginUser(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg)", padding: "40px 16px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-10%", left: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,0,0,0.04), transparent 70%)", pointerEvents: "none" }} />

      <div style={{ width: "100%", maxWidth: 420, background: "rgba(12, 12, 14, 0.88)", backdropFilter: "blur(28px)", WebkitBackdropFilter: "blur(28px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 24, padding: "44px 40px", boxShadow: "0 24px 64px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)", position: "relative", zIndex: 1 }}>
        <div style={{ position: "absolute", top: 0, left: "25%", right: "25%", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <img
            src={logoImg}
            alt="ZolaLive"
            style={{ height: 48, margin: "0 auto 14px", display: "block", objectFit: "contain" }}
          />
          <p style={{ marginTop: 8, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>Sign in to continue</p>
        </div>

        {error && (
          <div style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#FCA5A5", textAlign: "center" }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {[
            { key: "email",    label: "Email",    type: "email",    ph: "you@example.com" },
            { key: "password", label: "Password", type: "password", ph: "••••••••" },
          ].map(({ key, label, type, ph }) => (
            <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                {label}
              </label>
              <input
                type={type} value={form[key]} placeholder={ph} required
                onFocus={() => setFocused(key)} onBlur={() => setFocused("")}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                style={{
                  width: "100%", padding: "12px 14px",
                  background: focused === key ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
                  border: focused === key ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 10, color: "#fff", fontSize: 14,
                  outline: "none", fontFamily: "var(--font-body)",
                  transition: "border-color 180ms ease, background 180ms ease",
                }}
              />
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)", cursor: "pointer" }}>
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: 4, width: "100%", padding: "13px", background: "#fff", color: "#0a0a0a", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, letterSpacing: "0.08em", textTransform: "uppercase", border: "none", borderRadius: 10, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>or</span>
          <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
        </div>

        <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
          No account?{" "}
          <span onClick={() => navigate("/register")} style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600, cursor: "pointer" }}>
            Register
          </span>
        </p>
      </div>
    </main>
  );
}