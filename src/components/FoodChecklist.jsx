import { COLORS, fontStack, sansStack } from "../theme.js";
import { foods } from "../data/foods.js";
import Annotatable from "./Annotatable.jsx";

export default function FoodChecklist({ chaoshanDays }) {
  const mealSlots =
    chaoshanDays <= 2 ? "约5-6顿" : chaoshanDays <= 3 ? "约8-9顿" : "约10+顿";

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
          🍽️ 美食清单
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
          潮汕 {chaoshanDays} 天 ≈ {mealSlots}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {foods.map((f) => {
          const priorityColor =
            f.status === "must"
              ? COLORS.accent
              : f.status === "high"
              ? COLORS.gold
              : f.status === "mid"
              ? COLORS.textLight
              : "#aaa";
          return (
            <div
              key={f.name}
              style={{
                padding: "6px 0",
                borderBottom: `1px solid ${COLORS.border}22`,
              }}
            >
              <Annotatable annoKey={`美食·${f.name}`} label={`美食 · ${f.name}`}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: 10 }}
                >
                  <span style={{ fontSize: 18, width: 28, textAlign: "center" }}>
                    {f.emoji}
                  </span>
                  <span
                    style={{
                      fontFamily: sansStack,
                      fontSize: 14,
                      fontWeight: 600,
                      color: COLORS.text,
                      minWidth: 90,
                    }}
                  >
                    {f.name}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: priorityColor,
                      fontWeight: 600,
                      fontFamily: sansStack,
                      minWidth: 48,
                    }}
                  >
                    {f.priority}
                  </span>
                  <span
                    style={{
                      fontSize: 12,
                      color: COLORS.textLight,
                      fontFamily: sansStack,
                    }}
                  >
                    {f.note}
                  </span>
                </div>
              </Annotatable>
            </div>
          );
        })}
      </div>
    </div>
  );
}
