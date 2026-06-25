import { COLORS, fontStack, sansStack } from "../theme.js";
import { stayInfo } from "../data/accommodation.js";
import Annotatable from "./Annotatable.jsx";

export default function StaySection({ stays }) {
  if (!stays || stays.length === 0) return null;

  const totalNights = stays.reduce((sum, s) => sum + s.nights, 0);

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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <h3
          style={{
            fontFamily: fontStack,
            fontSize: 16,
            color: COLORS.text,
            margin: 0,
          }}
        >
          🏨 住宿建议
        </h3>
        <span
          style={{
            fontSize: 12,
            color: COLORS.textLight,
            fontFamily: sansStack,
            background: COLORS.tagBg,
            padding: "3px 10px",
            borderRadius: 20,
          }}
        >
          共 {totalNights} 晚
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {stays.map((s) => {
          const info = stayInfo[s.key];
          if (!info) return null;
          return (
            <div
              key={s.key}
              style={{
                border: `1px solid ${COLORS.border}`,
                borderRadius: 10,
                padding: 12,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 8,
                  flexWrap: "wrap",
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: COLORS.text,
                    fontFamily: sansStack,
                  }}
                >
                  {info.city}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: COLORS.accentDark,
                    background: COLORS.accentLight,
                    padding: "2px 8px",
                    borderRadius: 4,
                    fontWeight: 600,
                    fontFamily: sansStack,
                  }}
                >
                  {info.area} · {s.nights} 晚
                </span>
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: COLORS.textLight,
                  fontFamily: sansStack,
                  marginBottom: 8,
                }}
              >
                💡 {info.reason}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                {info.options.map((opt) => (
                  <div key={opt.name}>
                    <Annotatable
                      annoKey={`住宿·${opt.name}`}
                      label={`住宿（${info.city}）· ${opt.name}`}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "baseline",
                          gap: 8,
                          flexWrap: "wrap",
                        }}
                      >
                    {opt.url ? (
                      <a
                        href={opt.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: COLORS.accent,
                          fontFamily: sansStack,
                          textDecoration: "underline",
                          textDecorationColor: `${COLORS.accent}66`,
                        }}
                      >
                        {opt.name} 🔗
                      </a>
                    ) : (
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: COLORS.text,
                          fontFamily: sansStack,
                        }}
                      >
                        {opt.name}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: 12,
                        color: COLORS.accentDark,
                        fontFamily: sansStack,
                        fontWeight: 600,
                      }}
                    >
                      {opt.price}
                    </span>
                    <span
                      style={{
                        fontSize: 12,
                        color: COLORS.textLight,
                        fontFamily: sansStack,
                        flexBasis: "100%",
                      }}
                    >
                      {opt.note}
                    </span>
                      </div>
                    </Annotatable>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
