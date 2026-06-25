import { useState, useMemo } from "react";
import { COLORS, fontStack, sansStack, monoStack } from "./theme.js";
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
  const [hkPlan, setHkPlan] = useState("hk1");
  const [outbound, setOutbound] = useState("sleeper");
  const [visitJy, setVisitJy] = useState(true);

  const hkDays = hkPlan === "hk2sz" ? 2 : 1;
  const chaoshanDays = totalDays - hkDays;

  const itinerary = useMemo(
    () => buildItinerary({ totalDays, hkPlan, outbound, visitJy }),
    [totalDays, hkPlan, outbound, visitJy]
  );

  const warnings = buildWarnings({ totalDays, hkPlan });
  const legs = buildLegs({ outbound, hkPlan, visitJy });
  const stays = buildStays({ totalDays, hkPlan, visitJy });

  const hkNote =
    hkPlan === "hk1"
      ? "7/25 看戏住香港 → 7/26 中午 G6392 直达汕头（最省心，香港房 ~¥700）"
      : hkPlan === "sz1"
      ? "7/25 看完戏当晚回深圳住（省钱）→ 7/26 早上深圳去汕头"
      : "7/25 看戏住香港 → 7/26 玩一天、晚上去深圳住（省房钱）→ 7/27 去汕头";

  return (
    <div
      style={{
        background: COLORS.bg,
        minHeight: "100vh",
        fontFamily: sansStack,
        color: COLORS.textSoft,
        WebkitFontSmoothing: "antialiased",
      }}
    >
      {/* Header */}
      <div
        style={{
          position: "relative",
          overflow: "hidden",
          borderBottom: `1px solid ${COLORS.border}`,
          background: `radial-gradient(120% 140% at 80% -10%, rgba(87,201,154,.10), transparent 55%), linear-gradient(180deg, #151C25, ${COLORS.bg})`,
        }}
      >
        <div
          style={{
            maxWidth: 880,
            margin: "0 auto",
            padding: "46px 28px 34px",
          }}
        >
          <div
            style={{
              fontFamily: monoStack,
              fontSize: 11,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: COLORS.accent,
              marginBottom: 14,
            }}
          >
            HONG KONG &nbsp;✦&nbsp; CHAOSHAN
          </div>
          <h1
            style={{
              fontFamily: fontStack,
              fontWeight: 900,
              fontSize: 38,
              lineHeight: 1.12,
              margin: 0,
              letterSpacing: 1,
              color: COLORS.text,
            }}
          >
            香港{" "}
            <span style={{ color: COLORS.accent, fontWeight: 500 }}>×</span>{" "}
            潮汕
            <span
              style={{
                fontWeight: 500,
                fontSize: 24,
                color: COLORS.textMuted,
                marginLeft: 14,
              }}
            >
              行程规划器
            </span>
          </h1>
          <p
            style={{
              margin: "16px 0 0",
              fontSize: 13,
              color: COLORS.textDim,
              fontFamily: monoStack,
              letterSpacing: 0.3,
            }}
          >
            切换选项 &nbsp;→&nbsp; 自动生成行程方案
          </p>
        </div>
      </div>

      <div
        style={{
          maxWidth: 880,
          margin: "0 auto",
          padding: "26px 28px 60px",
        }}
      >
        {/* Option Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(214px, 1fr))",
            gap: 12,
            marginBottom: 22,
          }}
        >
          <OptionCard label="总天数" icon="date_range">
            <Toggle
              options={[
                { value: 4, label: "4天" },
                { value: 5, label: "5天" },
              ]}
              value={totalDays}
              onChange={setTotalDays}
            />
          </OptionCard>

          <OptionCard label="香港方案" icon="location_city">
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
                marginTop: 10,
                display: "flex",
                gap: 7,
                padding: "9px 11px",
                background: COLORS.cardDark,
                borderRadius: 9,
              }}
            >
              <span
                className="ms"
                style={{
                  fontSize: 15,
                  color: COLORS.accent,
                  flexShrink: 0,
                  paddingTop: 1,
                }}
              >
                tips_and_updates
              </span>
              <span
                style={{
                  fontSize: 12,
                  color: COLORS.textMuted,
                  lineHeight: 1.55,
                }}
              >
                {hkNote}
              </span>
            </div>
          </OptionCard>

          <OptionCard label="北京 → 香港" icon="flight">
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
                  marginTop: 10,
                  display: "flex",
                  gap: 7,
                  padding: "9px 11px",
                  background: "rgba(87,201,154,.07)",
                  borderRadius: 9,
                }}
              >
                <span
                  className="ms"
                  style={{
                    fontSize: 15,
                    color: COLORS.accent,
                    flexShrink: 0,
                    paddingTop: 1,
                  }}
                >
                  train
                </span>
                <span
                  style={{
                    fontSize: 12,
                    color: COLORS.textMid,
                    lineHeight: 1.55,
                  }}
                >
                  前一晚北京出发，早上到港/深（价格≈机票）
                </span>
              </div>
            )}
          </OptionCard>

          <OptionCard label="揭阳" icon="ramen_dining">
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

        {/* Summary Tags */}
        <div
          style={{
            display: "flex",
            gap: 8,
            flexWrap: "wrap",
            marginBottom: 14,
          }}
        >
          {[
            { label: `香港 ${hkDays}天`, color: COLORS.hk },
            { label: `潮汕 ${chaoshanDays}天`, color: COLORS.st },
            ...(visitJy
              ? [
                  {
                    label:
                      chaoshanDays >= 4 ? "揭阳 1.5天" : "揭阳觅食",
                    color: COLORS.jy,
                  },
                ]
              : []),
          ].map((tag) => (
            <span
              key={tag.label}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 7,
                fontSize: 12.5,
                fontWeight: 600,
                color: tag.color,
                background: `${tag.color}1A`,
                border: `1px solid ${tag.color}33`,
                padding: "5px 13px 5px 11px",
                borderRadius: 20,
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: tag.color,
                }}
              />
              {tag.label}
            </span>
          ))}
        </div>

        {/* Warnings */}
        {warnings.length > 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 6,
            }}
          >
            {warnings.map((w, i) => {
              const isWarn = w.startsWith("⚠️");
              const barColor = isWarn ? COLORS.warn : COLORS.gold;
              const text = w.replace(/^(?:💡|⚠️)\s*/, "");
              return (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    padding: "11px 14px",
                    background: isWarn ? COLORS.warnBg : COLORS.infoBg,
                    borderLeft: `3px solid ${barColor}`,
                    borderRadius: "0 9px 9px 0",
                  }}
                >
                  <span
                    className="ms"
                    style={{
                      fontSize: 17,
                      color: barColor,
                      flexShrink: 0,
                      paddingTop: 1,
                    }}
                  >
                    {isWarn ? "warning" : "tips_and_updates"}
                  </span>
                  <span
                    style={{
                      fontSize: 13,
                      color: "#D9DEE5",
                      lineHeight: 1.55,
                    }}
                  >
                    {text}
                  </span>
                </div>
              );
            })}
          </div>
        )}

        {/* Itinerary Section Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 11,
            margin: "34px 0 18px",
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
            route
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
            行程方案
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
            ITINERARY
          </span>
        </div>

        {itinerary.map((day, i) => (
          <DayCard key={`${day.date}-${i}`} day={day} index={i} />
        ))}

        <TransportSection legs={legs} />
        <StaySection stays={stays} />
        <FoodChecklist chaoshanDays={chaoshanDays} />

        {/* Footer */}
        <div
          style={{
            textAlign: "center",
            marginTop: 34,
            paddingTop: 24,
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
          <p
            style={{
              margin: "0 0 16px",
              fontFamily: fontStack,
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: 14,
              color: "rgba(255,255,255,.26)",
              lineHeight: 1.55,
              letterSpacing: 0.3,
            }}
          >
            "Look at all my trials and tribulations, sinking in a gentle pool of
            wine."
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: monoStack,
              fontSize: 12,
              color: COLORS.textMuted,
            }}
          >
            <span
              className="ms"
              style={{ fontSize: 16, color: COLORS.accent }}
            >
              theater_comedy
            </span>
            <span>JCS · 7/25 15:00 下午场 @ 香港文化中心大剧院</span>
          </div>
          <div
            style={{
              fontSize: 12,
              color: COLORS.textShadow,
              marginTop: 8,
            }}
          >
            切换上方选项，行程自动更新
          </div>
        </div>
      </div>
    </div>
  );
}
