import { COLORS, fontStack, monoStack, parseLeadingEmoji } from "../theme.js";
import { stayInfo } from "../data/accommodation.js";

export default function StaySection({ stays }) {
  if (!stays || stays.length === 0) return null;

  const totalNights = stays.reduce((sum, s) => sum + s.nights, 0);

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
          hotel
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
          住宿建议
        </h2>
        <span
          style={{
            marginLeft: "auto",
            fontFamily: monoStack,
            fontSize: 11,
            color: COLORS.textDim,
            background: COLORS.card,
            border: `1px solid ${COLORS.border}`,
            padding: "3px 11px",
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
          const { text: cityName } = parseLeadingEmoji(info.city);
          return (
            <div
              key={s.key}
              style={{
                background: COLORS.cardInner,
                border: `1px solid ${COLORS.border}`,
                borderRadius: 13,
                padding: 15,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  flexWrap: "wrap",
                  marginBottom: 9,
                }}
              >
                <span
                  className="ms"
                  style={{ fontSize: 18, color: COLORS.accent }}
                >
                  place
                </span>
                <span
                  style={{
                    fontSize: 15.5,
                    fontWeight: 700,
                    color: COLORS.text,
                  }}
                >
                  {cityName}
                </span>
                <span
                  style={{
                    fontSize: 11.5,
                    color: COLORS.accent,
                    background: COLORS.accentDim,
                    border: `1px solid ${COLORS.accentBorder}`,
                    padding: "2px 9px",
                    borderRadius: 5,
                    fontWeight: 600,
                  }}
                >
                  {info.area} · {s.nights} 晚
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  gap: 7,
                  marginBottom: 11,
                }}
              >
                <span
                  className="ms"
                  style={{
                    fontSize: 14,
                    color: COLORS.textFaint,
                    flexShrink: 0,
                    paddingTop: 1,
                  }}
                >
                  push_pin
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: COLORS.textMuted,
                    lineHeight: 1.55,
                  }}
                >
                  {info.reason}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                }}
              >
                {info.options.map((opt) => {
                  const { text: noteText } = parseLeadingEmoji(opt.note);
                  return (
                    <div
                      key={opt.name}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "baseline",
                        gap: 10,
                        flexWrap: "wrap",
                        paddingTop: 10,
                        borderTop: `1px solid ${COLORS.borderDim}`,
                      }}
                    >
                      {opt.url ? (
                        <a
                          href={opt.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            fontSize: 13.5,
                            fontWeight: 600,
                            color: COLORS.accent,
                            borderBottom: `1px solid rgba(87,201,154,.4)`,
                            textDecoration: "none",
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          {opt.name}
                          <span className="ms" style={{ fontSize: 13 }}>
                            open_in_new
                          </span>
                        </a>
                      ) : (
                        <span
                          style={{
                            fontSize: 13.5,
                            fontWeight: 600,
                            color: COLORS.textMid,
                          }}
                        >
                          {opt.name}
                        </span>
                      )}
                      <span
                        style={{
                          fontFamily: monoStack,
                          fontSize: 12.5,
                          color: "#D9DEE5",
                          fontWeight: 700,
                        }}
                      >
                        {opt.price}
                      </span>
                      <span
                        style={{
                          fontSize: 12,
                          color: COLORS.textDim,
                          flexBasis: "100%",
                          lineHeight: 1.5,
                        }}
                      >
                        {noteText}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
