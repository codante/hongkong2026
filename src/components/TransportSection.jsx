import { COLORS, fontStack, monoStack, parseLeadingEmoji } from "../theme.js";

export default function TransportSection({ legs }) {
  if (!legs || legs.length === 0) return null;

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 11,
          margin: "30px 0 14px",
        }}
      >
        <span
          style={{
            width: 3,
            height: 19,
            background: COLORS.accent,
            borderRadius: 2,
          }}
        />
        <span className="ms" style={{ fontSize: 20, color: COLORS.accent }}>
          confirmation_number
        </span>
        <h2
          style={{
            fontFamily: fontStack,
            fontSize: 19,
            fontWeight: 700,
            color: COLORS.text,
            margin: 0,
            letterSpacing: 0.5,
          }}
        >
          跨城交通参考
        </h2>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: monoStack,
            fontSize: 10,
            letterSpacing: 2.5,
            color: COLORS.textShadow,
          }}
        >
          TRANSIT
        </span>
      </div>
      <div
        style={{
          background: COLORS.cardInner,
          border: `1px solid ${COLORS.border}`,
          borderRadius: 14,
          padding: "6px 18px",
        }}
      >
        {legs.map((leg, i) => {
          const { icon: modeIcon, text: modeText } = parseLeadingEmoji(
            leg.mode
          );
          const { icon: noteIcon, text: noteText } = parseLeadingEmoji(
            leg.note || ""
          );
          return (
            <div
              key={leg.key}
              style={{
                display: "flex",
                gap: 14,
                padding: "15px 0",
                borderBottom:
                  i < legs.length - 1
                    ? `1px solid rgba(255,255,255,.06)`
                    : "none",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "6px 11px",
                  background: COLORS.cardDark,
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: 9,
                  height: "fit-content",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
              >
                <span
                  className="ms"
                  style={{ fontSize: 16, color: COLORS.accent }}
                >
                  {modeIcon || "commute"}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: "#D9DEE5",
                  }}
                >
                  {modeText}
                </span>
              </div>
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "baseline",
                    gap: 10,
                    flexWrap: "wrap",
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: COLORS.text,
                    }}
                  >
                    {leg.label}
                  </span>
                  <span
                    style={{
                      fontFamily: monoStack,
                      fontSize: 13,
                      fontWeight: 700,
                      color: COLORS.accent,
                    }}
                  >
                    {leg.price}
                  </span>
                </div>
                <div
                  style={{
                    fontFamily: monoStack,
                    fontSize: 11.5,
                    color: COLORS.textFaint,
                    marginTop: 4,
                    lineHeight: 1.5,
                  }}
                >
                  {leg.carrier} · {leg.duration}
                </div>
                {noteText && (
                  <div
                    style={{
                      display: "flex",
                      gap: 7,
                      marginTop: 8,
                      padding: "8px 11px",
                      background: COLORS.cardDark,
                      borderRadius: 9,
                    }}
                  >
                    <span
                      className="ms"
                      style={{
                        fontSize: 14,
                        color: COLORS.textDim,
                        flexShrink: 0,
                        paddingTop: 1,
                      }}
                    >
                      {noteIcon || "info"}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: COLORS.textMuted,
                        lineHeight: 1.55,
                      }}
                    >
                      {noteText}
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
