import { COLORS, fontStack, sansStack } from "../theme.js";
import Annotatable from "./Annotatable.jsx";

export default function TransportSection({ legs }) {
  if (!legs || legs.length === 0) return null;

  return (
    <div
      style={{
        background: COLORS.card,
        borderRadius: 12,
        border: `1px solid ${COLORS.border}`,
        padding: 16,
        marginTop: 16,
      }}
    >
      <h3
        style={{
          fontFamily: fontStack,
          fontSize: 16,
          color: COLORS.text,
          margin: "0 0 4px",
        }}
      >
        🎫 跨城交通参考
      </h3>
      <p
        style={{
          margin: "0 0 12px",
          fontSize: 12,
          color: COLORS.textLight,
          fontFamily: sansStack,
        }}
      >
        参考概况，实时票价以携程 / 12306 为准
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {legs.map((leg, i) => (
          <div
            key={leg.key}
            style={{
              padding: "10px 0",
              borderBottom:
                i < legs.length - 1 ? `1px solid ${COLORS.border}66` : "none",
            }}
          >
            <Annotatable annoKey={`交通·${leg.key}`} label={`交通 · ${leg.label}`}>
              <div style={{ display: "flex", gap: 12 }}>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: "#fff",
                    background: COLORS.accent,
                    borderRadius: 6,
                    padding: "2px 8px",
                    height: "fit-content",
                    whiteSpace: "nowrap",
                    fontFamily: sansStack,
                  }}
                >
                  {leg.mode}
                </div>
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: 8,
                      flexWrap: "wrap",
                    }}
                  >
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: COLORS.text,
                        fontFamily: sansStack,
                      }}
                    >
                      {leg.label}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 600,
                        color: COLORS.accentDark,
                        fontFamily: sansStack,
                      }}
                    >
                      {leg.price}
                    </span>
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: COLORS.textLight,
                      fontFamily: sansStack,
                      marginTop: 2,
                    }}
                  >
                    {leg.carrier} · {leg.duration}
                  </div>
                  {leg.note && (
                    <div
                      style={{
                        fontSize: 12,
                        color: COLORS.text,
                        fontFamily: sansStack,
                        marginTop: 4,
                        lineHeight: 1.5,
                        background: COLORS.goldLight,
                        borderRadius: 6,
                        padding: "4px 8px",
                      }}
                    >
                      {leg.note}
                    </div>
                  )}
                </div>
              </div>
            </Annotatable>
          </div>
        ))}
      </div>
    </div>
  );
}
