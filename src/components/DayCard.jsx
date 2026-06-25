import { COLORS, sansStack } from "../theme.js";
import Annotatable from "./Annotatable.jsx";

const locationColors = {
  香港: COLORS.hk,
  深圳: "#6B8E5A",
  汕头: COLORS.st,
  潮州: COLORS.cz,
  揭阳: COLORS.jy,
};

export default function DayCard({ day, index }) {
  const mainLocation =
    Object.keys(locationColors).find((l) => day.location.includes(l)) ||
    COLORS.accent;
  const dotColor = locationColors[mainLocation] || COLORS.accent;

  return (
    <div style={{ display: "flex", gap: 16, marginBottom: 4 }}>
      {/* Timeline line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 32,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: "50%",
            background: dotColor,
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 13,
            fontWeight: 700,
            fontFamily: sansStack,
            flexShrink: 0,
          }}
        >
          {index + 1}
        </div>
        <div
          style={{ width: 2, flex: 1, background: COLORS.border, marginTop: 4 }}
        />
      </div>

      {/* Content */}
      <div style={{ flex: 1, paddingBottom: 20 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 8,
            marginBottom: 8,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: sansStack,
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            {day.date}（{day.weekday}）
          </span>
          <span
            style={{
              fontSize: 12,
              color: dotColor,
              fontFamily: sansStack,
              background: `${dotColor}15`,
              padding: "2px 8px",
              borderRadius: 4,
              fontWeight: 500,
            }}
          >
            {day.location}
          </span>
        </div>

        <div
          style={{
            background: COLORS.card,
            borderRadius: 10,
            border: `1px solid ${COLORS.border}`,
            overflow: "hidden",
          }}
        >
          {day.activities.map((act, i) => (
            <div
              key={i}
              style={{
                padding: "10px 14px",
                borderBottom:
                  i < day.activities.length - 1
                    ? `1px solid ${COLORS.border}`
                    : "none",
                background: act.highlight ? COLORS.goldLight : "transparent",
              }}
            >
              <Annotatable
                annoKey={`行程·${day.date}·${i}`}
                label={`${day.date}（${day.weekday}）${act.time}｜${act.desc}`}
              >
                <div
                  style={{ display: "flex", gap: 10, alignItems: "flex-start" }}
                >
                  <span
                    style={{
                      fontSize: 12,
                      color: COLORS.textLight,
                      fontFamily: sansStack,
                      minWidth: 56,
                      flexShrink: 0,
                      paddingTop: 1,
                      fontWeight: 500,
                    }}
                  >
                    {act.time}
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: COLORS.text,
                      fontFamily: sansStack,
                      lineHeight: 1.5,
                    }}
                  >
                    {act.highlight ? <strong>{act.desc}</strong> : act.desc}
                  </span>
                </div>
              </Annotatable>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
