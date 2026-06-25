import { COLORS, sansStack } from "../theme.js";

export default function OptionCard({ label, children, icon }) {
  return (
    <div
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 14,
        padding: "15px 16px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 12,
        }}
      >
        <span className="ms" style={{ fontSize: 17, color: COLORS.textFaint }}>
          {icon}
        </span>
        <span
          style={{
            fontSize: 11,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: COLORS.textDim,
            fontWeight: 500,
          }}
        >
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}
