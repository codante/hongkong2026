import { COLORS, fontStack, monoStack } from "../theme.js";
import { foods } from "../data/foods.js";

const FOOD_ICONS = {
  "牛肉火锅": "outdoor_grill",
  "粿条/粿汁": "ramen_dining",
  "肠粉": "brunch_dining",
  "砂锅粥+生腌": "rice_bowl",
  "卤鹅": "restaurant",
  "冰室/甜品": "icecream",
  "梅汁水果": "nutrition",
  "蚝烙": "dinner_dining",
};

const priorityColor = {
  must: COLORS.gold,
  high: COLORS.accent,
  mid: COLORS.textMuted,
  low: COLORS.textGhost,
};

export default function FoodChecklist({ chaoshanDays }) {
  const mealSlots =
    chaoshanDays <= 2 ? "约5-6顿" : chaoshanDays <= 3 ? "约8-9顿" : "约10+顿";

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
          restaurant
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
          美食清单
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
          潮汕 {chaoshanDays} 天 ≈ {mealSlots}
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
        {foods.map((f, i) => {
          const color = priorityColor[f.status] || COLORS.textGhost;
          const icon = FOOD_ICONS[f.name] || "restaurant";
          return (
            <div
              key={f.name}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                padding: "11px 0",
                borderBottom:
                  i < foods.length - 1
                    ? `1px solid ${COLORS.divider}`
                    : "none",
              }}
            >
              <span
                className="ms"
                style={{
                  fontSize: 21,
                  color,
                  width: 26,
                  textAlign: "center",
                  flexShrink: 0,
                }}
              >
                {icon}
              </span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: COLORS.text,
                  minWidth: 98,
                }}
              >
                {f.name}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5,
                  minWidth: 62,
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: color,
                  }}
                />
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    color,
                  }}
                >
                  {f.priority}
                </span>
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: COLORS.textDim,
                  lineHeight: 1.5,
                }}
              >
                {f.note}
              </span>
            </div>
          );
        })}
      </div>
    </>
  );
}
