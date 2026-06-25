import { COLORS, sansStack } from "../theme.js";

export default function Toggle({ options, value, onChange, compact }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 4,
        padding: 4,
        background: COLORS.cardDark,
        border: `1px solid ${COLORS.border}`,
        borderRadius: 11,
      }}
    >
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={String(opt.value)}
            onClick={() => onChange(opt.value)}
            style={{
              flex: 1,
              padding: compact ? "8px 2px" : "8px 10px",
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontFamily: sansStack,
              fontSize: compact ? 11 : 13,
              letterSpacing: compact ? -0.3 : 0,
              fontWeight: active ? 700 : 500,
              background: active ? COLORS.accent : "transparent",
              color: active ? COLORS.bg : COLORS.textMuted,
              transition: "all .18s",
              whiteSpace: "nowrap",
            }}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
