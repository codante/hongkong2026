import { COLORS, fontStack, monoStack, parseLeadingEmoji } from "../theme.js";

const locationColors = {
  "香港": COLORS.hk,
  "深圳": COLORS.sz,
  "汕头": COLORS.st,
  "潮州": COLORS.cz,
  "揭阳": COLORS.jy,
};

export default function DayCard({ day, index }) {
  const mainLocation =
    Object.keys(locationColors).find((l) => day.location.includes(l));
  const dotColor = locationColors[mainLocation] || COLORS.accent;

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: 30,
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: "50%",
            background: dotColor,
            color: COLORS.bg,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: monoStack,
            fontSize: 13,
            fontWeight: 700,
            flexShrink: 0,
          }}
        >
          {index + 1}
        </div>
        <div
          style={{
            width: 2,
            flex: 1,
            background: `linear-gradient(180deg, ${dotColor}55, ${COLORS.border})`,
            marginTop: 4,
          }}
        />
      </div>

      <div style={{ flex: 1, paddingBottom: 22 }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 10,
            marginBottom: 9,
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontFamily: monoStack,
              fontSize: 15,
              fontWeight: 700,
              color: COLORS.text,
            }}
          >
            {day.date}（{day.weekday}）
          </span>
          <span
            style={{
              fontSize: 11.5,
              color: dotColor,
              background: `${dotColor}1E`,
              border: `1px solid ${dotColor}33`,
              padding: "2px 10px",
              borderRadius: 5,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            {day.location}
          </span>
        </div>

        <div
          style={{
            background: COLORS.cardInner,
            border: `1px solid ${COLORS.border}`,
            borderRadius: 13,
            overflow: "hidden",
          }}
        >
          {day.activities.map((act, i) => {
            const { icon, text } = parseLeadingEmoji(act.desc);
            const hl = !!act.highlight;
            return (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "flex-start",
                  padding: "11px 15px",
                  borderBottom:
                    i < day.activities.length - 1
                      ? `1px solid ${COLORS.divider}`
                      : "none",
                  borderLeft: hl
                    ? `2px solid ${COLORS.gold}`
                    : "2px solid transparent",
                  background: hl ? COLORS.goldDim : "transparent",
                }}
              >
                <span
                  style={{
                    fontFamily: monoStack,
                    fontSize: 11.5,
                    color: hl ? COLORS.gold : COLORS.textGhost,
                    minWidth: 66,
                    flexShrink: 0,
                    paddingTop: 2,
                    lineHeight: 1.45,
                  }}
                >
                  {act.time}
                </span>
                {icon && (
                  <span
                    className="ms"
                    style={{
                      fontSize: 18,
                      color: hl ? COLORS.gold : COLORS.textFaint,
                      flexShrink: 0,
                      paddingTop: 1,
                    }}
                  >
                    {icon}
                  </span>
                )}
                <span
                  style={{
                    fontSize: 13.5,
                    color: COLORS.textSoft,
                    lineHeight: 1.55,
                    fontWeight: hl ? 700 : 400,
                  }}
                >
                  {text}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
