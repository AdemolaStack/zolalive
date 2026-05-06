import { useState } from "react";

const sizes = {
  sm: { container: 36, img: 24, font: 11 },
  md: { container: 48, img: 32, font: 14 },
  lg: { container: 64, img: 42, font: 18 },
  xl: { container: 80, img: 52, font: 22 },
};

export default function TeamLogo({ src, name, shortName, size = "md" }) {
  const [err, setErr] = useState(false);
  const s = sizes[size] || sizes.md;
  const initials = (shortName || name || "?").slice(0, 3).toUpperCase();

  return (
    <div
      style={{
        width: s.container,
        height: s.container,
        borderRadius: "50%",
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        flexShrink: 0,
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
      }}
    >
      {src && !err ? (
        <img
          src={src}
          alt={name}
          onError={() => setErr(true)}
          style={{ width: s.img, height: s.img, objectFit: "contain" }}
        />
      ) : (
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: s.font,
            fontWeight: 800,
            color: "rgba(255, 255, 255, 0.25)",
            letterSpacing: "0.05em",
          }}
        >
          {initials}
        </span>
      )}
    </div>
  );
}