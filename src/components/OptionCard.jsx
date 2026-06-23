import { COLORS, sansStack } from "../theme.js";

export default function OptionCard({ label, children, icon }) {
  return (
    <div
      style={{
        background: COLORS.card,
        borderRadius: 10,
        padding: "12px 14px",
        border: `1px solid ${COLORS.border}`,
      }}
    >
      <div
        style={{
          fontSize: 12,
          color: COLORS.textLight,
          marginBottom: 8,
          fontFamily: sansStack,
          fontWeight: 500,
          letterSpacing: 0.5,
          textTransform: "uppercase",
        }}
      >
        {icon} {label}
      </div>
      {children}
    </div>
  );
}
