import { useState, useMemo } from "react";
import { COLORS, fontStack, sansStack } from "./theme.js";
import Toggle from "./components/Toggle.jsx";
import OptionCard from "./components/OptionCard.jsx";
import DayCard from "./components/DayCard.jsx";
import FoodChecklist from "./components/FoodChecklist.jsx";
import TransportSection from "./components/TransportSection.jsx";
import StaySection from "./components/StaySection.jsx";
import { buildItinerary, buildWarnings } from "./lib/itinerary.js";
import { buildLegs, buildStays } from "./lib/plan.js";

export default function App() {
  const [totalDays, setTotalDays] = useState(4);
  const [hkPlan, setHkPlan] = useState("hk1"); // hk1 / sz1 / hk2sz
  const [outbound, setOutbound] = useState("sleeper"); // fly / sleeper（去程已敲定高铁动卧）
  const [visitJy, setVisitJy] = useState(true);

  const hkDays = hkPlan === "hk2sz" ? 2 : 1;
  const chaoshanDays = totalDays - hkDays;

  const itinerary = useMemo(
    () =>
      buildItinerary({ totalDays, hkPlan, outbound, visitJy }),
    [totalDays, hkPlan, outbound, visitJy]
  );

  const warnings = buildWarnings({ totalDays, hkPlan });

  const legs = buildLegs({ outbound, hkPlan, visitJy });
  const stays = buildStays({ totalDays, hkPlan, visitJy });

  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        fontFamily: sansStack,
        padding: 0,
      }}
    >
      {/* Header */}
      <div
        style={{
          background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.gold})`,
          padding: "28px 20px 20px",
          color: "#fff",
        }}
      >
        <h1
          style={{
            fontFamily: fontStack,
            fontSize: 22,
            margin: 0,
            fontWeight: 700,
            letterSpacing: 1,
          }}
        >
          🎭 香港 × 潮汕 行程规划器
        </h1>
        <p style={{ margin: "6px 0 0", fontSize: 13, opacity: 0.9 }}>
          切换选项 → 自动生成行程方案 → 截图发给朋友讨论
        </p>
      </div>

      <div style={{ padding: "16px 16px 40px" }}>
        {/* Decision Toggles */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 10,
            marginBottom: 20,
          }}
        >
          <OptionCard label="总天数" icon="📅">
            <Toggle
              options={[
                { value: 4, label: "4天" },
                { value: 5, label: "5天" },
              ]}
              value={totalDays}
              onChange={setTotalDays}
            />
          </OptionCard>

          <OptionCard label="香港方案" icon="🏙️">
            <Toggle
              compact
              options={[
                { value: "hk1", label: "1天·住香港" },
                { value: "sz1", label: "1天·回深圳" },
                { value: "hk2sz", label: "2天·港转深" },
              ]}
              value={hkPlan}
              onChange={setHkPlan}
            />
            <div
              style={{
                marginTop: 6,
                padding: "6px 10px",
                background: COLORS.tagBg,
                borderRadius: 6,
                fontSize: 12,
                color: COLORS.textLight,
                fontFamily: sansStack,
                lineHeight: 1.5,
              }}
            >
              {hkPlan === "hk1"
                ? "7/25 看戏住香港 → 7/26 中午 G6392 直达汕头（最省心，香港房 ~¥700）"
                : hkPlan === "sz1"
                ? "7/25 看完戏当晚回深圳住（省钱）→ 7/26 早上深圳去汕头"
                : "7/25 看戏住香港 → 7/26 玩一天、晚上去深圳住（省房钱）→ 7/27 去汕头"}
            </div>
          </OptionCard>

          <OptionCard label="北京→香港" icon="✈️">
            <Toggle
              options={[
                { value: "fly", label: "白天航班" },
                { value: "sleeper", label: "高铁卧铺" },
              ]}
              value={outbound}
              onChange={setOutbound}
            />
            {outbound === "sleeper" && (
              <div
                style={{
                  marginTop: 6,
                  padding: "6px 10px",
                  background: COLORS.goldLight,
                  borderRadius: 6,
                  fontSize: 12,
                  color: COLORS.gold,
                  fontFamily: sansStack,
                }}
              >
                🚄 前一晚北京出发，早上到港/深（价格≈机票）
              </div>
            )}
          </OptionCard>

          <OptionCard label="揭阳" icon="🍜">
            <Toggle
              options={[
                { value: false, label: "纯路过机场" },
                { value: true, label: "顺路吃一轮" },
              ]}
              value={visitJy}
              onChange={setVisitJy}
            />
          </OptionCard>
        </div>

        {/* Summary Bar */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 12,
          }}
        >
          {[
            { label: `香港 ${hkDays}天`, color: COLORS.hk },
            { label: `潮汕 ${chaoshanDays}天`, color: COLORS.st },
            ...(visitJy
              ? [
                  {
                    label: visitJy && chaoshanDays >= 4 ? "揭阳 1.5天" : "揭阳觅食",
                    color: COLORS.jy,
                  },
                ]
              : []),
          ].map((tag) => (
            <span
              key={tag.label}
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: tag.color,
                background: `${tag.color}18`,
                padding: "4px 12px",
                borderRadius: 20,
                fontFamily: sansStack,
              }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Warnings */}
        {warnings.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {warnings.map((w, i) => (
              <div
                key={i}
                style={{
                  fontSize: 13,
                  color: COLORS.accentDark,
                  fontFamily: sansStack,
                  background: COLORS.accentLight,
                  padding: "8px 12px",
                  borderRadius: 8,
                  marginBottom: 4,
                  lineHeight: 1.5,
                }}
              >
                {w}
              </div>
            ))}
          </div>
        )}

        {/* Timeline */}
        <h2
          style={{
            fontFamily: fontStack,
            fontSize: 18,
            color: COLORS.text,
            margin: "20px 0 16px",
            fontWeight: 700,
          }}
        >
          📋 行程方案
        </h2>

        {itinerary.map((day, i) => (
          <DayCard key={`${day.date}-${i}`} day={day} index={i} />
        ))}

        {/* Transport reference */}
        <TransportSection legs={legs} />

        {/* Accommodation suggestions */}
        <StaySection stays={stays} />

        {/* Food Checklist */}
        <FoodChecklist chaoshanDays={chaoshanDays} />

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 24,
            padding: 16,
            color: COLORS.textLight,
            fontSize: 12,
            fontFamily: sansStack,
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          JCS 🎭 7/25 15:00 下午场 @ 香港文化中心大剧院
          <br />
          切换上方选项，行程自动更新 ✨
        </div>
      </div>
    </div>
  );
}
