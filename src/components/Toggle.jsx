import { COLORS, sansStack } from "../theme.js";

export default function Toggle({ options, value, onChange, compact }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 0,
        borderRadius: 8,
        overflow: "hidden",
        border: `1.5px solid ${COLORS.border}`,
        background: COLORS.card,
      }}
    >
      {options.map((opt) => (
        <button
          key={String(opt.value)}
          onClick={() => onChange(opt.value)}
          style={{
            padding: compact ? "6px 12px" : "8px 16px",
            border: "none",
            background: value === opt.value ? COLORS.accent : "transparent",
            color: value === opt.value ? "#fff" : COLORS.text,
            fontFamily: sansStack,
            fontSize: compact ? 13 : 14,
            fontWeight: value === opt.value ? 600 : 400,
            cursor: "pointer",
            transition: "all 0.2s",
            flex: 1,
            whiteSpace: "nowrap",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
