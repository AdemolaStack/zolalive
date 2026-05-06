import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, verifyOtp } from "../services/api";
import logoImg from "../assets/logos/zolalive.png";

const inputStyle = (focused) => ({
  width: "100%", padding: "12px 14px",
  background: focused ? "rgba(255,255,255,0.07)" : "rgba(255,255,255,0.03)",
  border: focused ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
  borderRadius: 10, color: "#fff", fontSize: 14,
  outline: "none", fontFamily: "var(--font-body)",
  transition: "border-color 180ms ease, background 180ms ease",
});

export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ email: "", password: "", confirm: "" });
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [focused, setFocused] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Passwords don't match.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      await registerUser(form.email, form.password);
      setStep(2);
    } catch (err) {
      setError(err.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (val, i) => {
    if (!/^\d*$/.test(val)) return;
    const next = [...otp];
    next[i] = val.slice(-1);
    setOtp(next);
    if (val && i < 5) {
      document.getElementById("otp-" + (i + 1))?.focus();
    }
  };

  const handleOtpKey = (e, i) => {
    if (e.key === "Backspace" && !otp[i] && i > 0) {
      document.getElementById("otp-" + (i - 1))?.focus();
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    const code = otp.join("");
    if (code.length < 6) {
      setError("Enter the full 6-digit code.");
      return;
    }
    setLoading(true);
    try {
      await verifyOtp(form.email, code);
      navigate("/login");
    } catch (err) {
      setError(err.message || "Invalid OTP. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const cardStyle = {
    width: "100%", maxWidth: 440,
    background: "rgba(12, 12, 14, 0.88)",
    backdropFilter: "blur(28px)",
    WebkitBackdropFilter: "blur(28px)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 24,
    padding: "44px 40px",
    boxShadow: "0 24px 64px rgba(0,0,0,0.22), inset 0 1px 0 rgba(255,255,255,0.06)",
    position: "relative", zIndex: 1,
  };

  const Logo = () => (
    <div style={{ textAlign: "center", marginBottom: 32 }}>
      <img
        src={logoImg}
        alt="ZolaLive"
        style={{ height: 48, margin: "0 auto 14px", display: "block", objectFit: "contain" }}
      />
    </div>
  );

  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg)", padding: "40px 16px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-10%", right: "-5%", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,0,0,0.04), transparent 70%)", pointerEvents: "none" }} />

      {step === 1 && (
        <div style={cardStyle}>
          <div style={{ position: "absolute", top: 0, left: "25%", right: "25%", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
          <Logo />
          <p style={{ textAlign: "center", marginTop: -20, marginBottom: 24, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            Create your account
          </p>

          {error && (
            <div style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#FCA5A5", textAlign: "center" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { key: "email",    label: "Email",            type: "email",    ph: "you@example.com" },
              { key: "password", label: "Password",         type: "password", ph: "Min. 6 characters" },
              { key: "confirm",  label: "Confirm Password", type: "password", ph: "Repeat password" },
            ].map(({ key, label, type, ph }) => (
              <div key={key} style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
                  {label}
                </label>
                <input
                  type={type} value={form[key]} placeholder={ph} required
                  onFocus={() => setFocused(key)} onBlur={() => setFocused("")}
                  onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                  style={inputStyle(focused === key)}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              style={{ marginTop: 6, width: "100%", padding: "13px", background: "#fff", color: "#0a0a0a", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, letterSpacing: "0.08em", textTransform: "uppercase", border: "none", borderRadius: 10, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>

          <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "22px 0" }}>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>or</span>
            <div style={{ flex: 1, height: 1, background: "rgba(255,255,255,0.06)" }} />
          </div>

          <p style={{ textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.3)" }}>
            Already have an account?{" "}
            <span onClick={() => navigate("/login")} style={{ color: "rgba(255,255,255,0.75)", fontWeight: 600, cursor: "pointer" }}>
              Sign In
            </span>
          </p>
        </div>
      )}

      {step === 2 && (
        <div style={cardStyle}>
          <div style={{ position: "absolute", top: 0, left: "25%", right: "25%", height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)" }} />
          <Logo />
          <p style={{ textAlign: "center", marginTop: -20, marginBottom: 8, fontSize: 13, color: "rgba(255,255,255,0.35)" }}>
            Enter the 6-digit code sent to
          </p>
          <p style={{ textAlign: "center", marginBottom: 28, fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.6)" }}>
            {form.email}
          </p>

          {error && (
            <div style={{ background: "rgba(220,38,38,0.15)", border: "1px solid rgba(220,38,38,0.3)", borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#FCA5A5", textAlign: "center" }}>
              {error}
            </div>
          )}

          <form onSubmit={handleVerify} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              {otp.map((digit, i) => (
                <input
                  key={i}
                  id={"otp-" + i}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, i)}
                  onKeyDown={(e) => handleOtpKey(e, i)}
                  onFocus={() => setFocused("otp-" + i)}
                  onBlur={() => setFocused("")}
                  style={{
                    width: 48, height: 56, textAlign: "center",
                    fontSize: 22, fontWeight: 700,
                    background: focused === "otp-" + i ? "rgba(255,255,255,0.09)" : "rgba(255,255,255,0.04)",
                    border: digit ? "1px solid rgba(255,255,255,0.3)" : focused === "otp-" + i ? "1px solid rgba(255,255,255,0.25)" : "1px solid rgba(255,255,255,0.08)",
                    borderRadius: 10, color: "#fff", outline: "none",
                    fontFamily: "var(--font-display)",
                    transition: "border-color 180ms ease, background 180ms ease",
                    caretColor: "transparent",
                  }}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "13px", background: "#fff", color: "#0a0a0a", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 15, letterSpacing: "0.08em", textTransform: "uppercase", border: "none", borderRadius: 10, cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.7 : 1 }}
            >
              {loading ? "Verifying..." : "Verify & Create Account"}
            </button>
          </form>

          <p style={{ marginTop: 20, textAlign: "center", fontSize: 13, color: "rgba(255,255,255,0.25)" }}>
            Didn't receive a code?{" "}
            <span onClick={handleSubmit} style={{ color: "rgba(255,255,255,0.6)", fontWeight: 600, cursor: "pointer" }}>
              Resend
            </span>
          </p>

          <p style={{ marginTop: 10, textAlign: "center" }}>
            <span onClick={() => setStep(1)} style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", cursor: "pointer" }}>
              Back
            </span>
          </p>
        </div>
      )}
    </main>
  );
}