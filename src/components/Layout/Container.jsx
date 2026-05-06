export default function Container({ children, size = "default", style, className = "" }) {
  const maxWidths = { narrow: "780px", default: "1160px", wide: "1400px" };
  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: maxWidths[size],
        marginLeft: "auto",
        marginRight: "auto",
        paddingLeft: "clamp(16px, 4vw, 40px)",
        paddingRight: "clamp(16px, 4vw, 40px)",
        ...style,
      }}
    >
      {children}
    </div>
  );
}