import { useState, useMemo } from "react";

const COLORS = {
  bg: "#FDF6EC",
  card: "#FFFFFF",
  accent: "#D4663A",
  accentLight: "#F5E6DC",
  accentDark: "#B84E28",
  gold: "#C8963E",
  goldLight: "#FFF8E7",
  text: "#3D2B1F",
  textLight: "#8B7355",
  border: "#E8DDD0",
  tagBg: "#F0E8DC",
  hk: "#E8B84B",
  st: "#D4663A",
  cz: "#6B8E5A",
  jy: "#5A7D9A",
};

const fontStack = `"Palatino Linotype", "Georgia", "Songti SC", "SimSun", serif`;
const sansStack = `"Avenir Next", "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif`;

function Toggle({ options, value, onChange, compact }) {
  return (
    <div style={{
      display: "flex", gap: 0, borderRadius: 8, overflow: "hidden",
      border: `1.5px solid ${COLORS.border}`, background: COLORS.card,
    }}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          style={{
            padding: compact ? "6px 12px" : "8px 16px",
            border: "none",
            background: value === opt.value ? COLORS.accent : "transparent",
            color: value === opt.value ? "#fff" : COLORS.text,
            fontFamily: sansStack,
            fontSize: compact ? 13 : 14,
            fontWeight: value === opt.value ? 600 : 400,
            cursor: "pointer",
            transition: "all 0.2s",
            flex: 1,
            whiteSpace: "nowrap",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function OptionCard({ label, children, icon }) {
  return (
    <div style={{
      background: COLORS.card,
      borderRadius: 10,
      padding: "12px 14px",
      border: `1px solid ${COLORS.border}`,
    }}>
      <div style={{
        fontSize: 12, color: COLORS.textLight, marginBottom: 8,
        fontFamily: sansStack, fontWeight: 500, letterSpacing: 0.5,
        textTransform: "uppercase",
      }}>
        {icon} {label}
      </div>
      {children}
    </div>
  );
}

function DayCard({ day, index }) {
  const locationColors = {
    "香港": COLORS.hk,
    "深圳": "#6B8E5A",
    "汕头": COLORS.st,
    "潮州": COLORS.cz,
    "揭阳": COLORS.jy,
  };

  const mainLocation = Object.keys(locationColors).find(l => day.location.includes(l)) || COLORS.accent;
  const dotColor = locationColors[mainLocation] || COLORS.accent;

  return (
    <div style={{
      display: "flex", gap: 16, marginBottom: 4,
    }}>
      {/* Timeline line */}
      <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        width: 32, flexShrink: 0,
      }}>
        <div style={{
          width: 28, height: 28, borderRadius: "50%",
          background: dotColor, color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 13, fontWeight: 700, fontFamily: sansStack,
          flexShrink: 0,
        }}>
          {index + 1}
        </div>
        <div style={{
          width: 2, flex: 1, background: COLORS.border, marginTop: 4,
        }} />
      </div>

      {/* Content */}
      <div style={{
        flex: 1, paddingBottom: 20,
      }}>
        <div style={{
          display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8,
          flexWrap: "wrap",
        }}>
          <span style={{
            fontFamily: sansStack, fontSize: 15, fontWeight: 700,
            color: COLORS.text,
          }}>
            {day.date}（{day.weekday}）
          </span>
          <span style={{
            fontSize: 12, color: dotColor, fontFamily: sansStack,
            background: `${dotColor}15`, padding: "2px 8px", borderRadius: 4,
            fontWeight: 500,
          }}>
            {day.location}
          </span>
        </div>

        <div style={{
          background: COLORS.card, borderRadius: 10,
          border: `1px solid ${COLORS.border}`,
          overflow: "hidden",
        }}>
          {day.activities.map((act, i) => (
            <div
              key={i}
              style={{
                display: "flex", gap: 10, padding: "10px 14px",
                alignItems: "flex-start",
                borderBottom: i < day.activities.length - 1 ? `1px solid ${COLORS.border}` : "none",
                background: act.highlight ? COLORS.goldLight : "transparent",
              }}
            >
              <span style={{
                fontSize: 12, color: COLORS.textLight, fontFamily: sansStack,
                minWidth: 56, flexShrink: 0, paddingTop: 1, fontWeight: 500,
              }}>
                {act.time}
              </span>
              <span style={{
                fontSize: 14, color: COLORS.text, fontFamily: sansStack,
                lineHeight: 1.5,
              }}>
                {act.highlight ? <strong>{act.desc}</strong> : act.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function FoodChecklist({ chaoshanDays }) {
  const foods = [
    { name: "牛肉火锅", emoji: "🥩", priority: "必吃", note: "鲜切各部位，涮的秒数不同", status: "must" },
    { name: "粿条/粿汁", emoji: "🍜", priority: "必吃", note: "促肉粿条汤 / 粿汁配卤味", status: "must" },
    { name: "肠粉", emoji: "🥟", priority: "必吃", note: "潮汕厚皮版，馅料丰富", status: "must" },
    { name: "砂锅粥+生腌", emoji: "🦐", priority: "强推", note: "海鲜粥配生腌虾蟹", status: "high" },
    { name: "卤鹅", emoji: "🪿", priority: "强推", note: "狮头鹅，蘸蒜泥醋", status: "high" },
    { name: "冰室/甜品", emoji: "🧊", priority: "推荐", note: "解暑必备，鸭母捻/豆花", status: "mid" },
    { name: "梅汁水果", emoji: "🍊", priority: "推荐", note: "甘草水果，路边随买", status: "mid" },
    { name: "蚝烙", emoji: "🦪", priority: "有空就吃", note: "潮汕版蚵仔煎", status: "low" },
  ];

  const mealSlots = chaoshanDays <= 2 ? "约5-6顿" : chaoshanDays <= 3 ? "约8-9顿" : "约10+顿";

  return (
    <div style={{
      background: COLORS.card, borderRadius: 12,
      border: `1px solid ${COLORS.border}`, padding: 16,
      marginTop: 16,
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 12,
      }}>
        <h3 style={{
          fontFamily: fontStack, fontSize: 16, color: COLORS.text, margin: 0,
        }}>
          🍽️ 美食清单
        </h3>
        <span style={{
          fontSize: 12, color: COLORS.textLight, fontFamily: sansStack,
          background: COLORS.tagBg, padding: "3px 10px", borderRadius: 20,
        }}>
          潮汕 {chaoshanDays} 天 ≈ {mealSlots}
        </span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {foods.map((f) => {
          const priorityColor = f.status === "must" ? COLORS.accent :
            f.status === "high" ? COLORS.gold :
            f.status === "mid" ? COLORS.textLight : "#aaa";
          return (
            <div key={f.name} style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "6px 0",
              borderBottom: `1px solid ${COLORS.border}22`,
            }}>
              <span style={{ fontSize: 18, width: 28, textAlign: "center" }}>{f.emoji}</span>
              <span style={{
                fontFamily: sansStack, fontSize: 14, fontWeight: 600,
                color: COLORS.text, minWidth: 90,
              }}>{f.name}</span>
              <span style={{
                fontSize: 11, color: priorityColor, fontWeight: 600,
                fontFamily: sansStack, minWidth: 48,
              }}>{f.priority}</span>
              <span style={{
                fontSize: 12, color: COLORS.textLight, fontFamily: sansStack,
              }}>{f.note}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function TripPlanner() {
  const [totalDays, setTotalDays] = useState(4);
  const [hkDays, setHkDays] = useState(1);
  const [hkAccom, setHkAccom] = useState("hk");
  const [hkToSt, setHkToSt] = useState("direct");
  const [outbound, setOutbound] = useState("fly");       // fly / redeye / sleeper
  const [returnMode, setReturnMode] = useState("jy_fly"); // jy_fly / sz
  const [visitJy, setVisitJy] = useState(true);

  // Validation
  const chaoshanDays = totalDays - hkDays;
  const isValid = chaoshanDays >= 1;

  const itinerary = useMemo(() => {
    if (!isValid) return [];
    const days = [];

    // Determine start date based on HK days
    const startDay = hkDays === 2 ? 24 : 25;

    // === HK Days ===
    const arrivalDesc = outbound === "fly" ? "✈️ 北京飞香港（白天航班，~3.5h）"
      : outbound === "redeye" ? "✈️ 红眼航班凌晨到达，先补觉！"
      : "🚄 高铁卧铺早上到达（前晚北京出发）";
    const arrivalTime = outbound === "fly" ? "上午出发"
      : outbound === "redeye" ? "凌晨到达"
      : "早上到达";

    if (hkDays === 2) {
      days.push({
        date: "7/24", weekday: "五", location: "香港",
        activities: [
          { time: arrivalTime, desc: arrivalDesc },
          ...(outbound === "redeye" ? [{ time: "上午", desc: "😴 酒店补觉到中午" }] : []),
          { time: "下午", desc: "🎨 尖沙咀闲逛 / 莫奈展 / 坂本龙一展" },
          { time: "晚餐", desc: "🍽️ 随缘：茶餐厅 / 点心 / Jollibee" },
          { time: "晚上", desc: "🌃 维港夜景" },
        ],
      });
      days.push({
        date: "7/25", weekday: "六", location: "香港",
        activities: [
          { time: "上午", desc: "🎨 香港故宫 / K11 MUSEA / 继续看展" },
          { time: "午餐", desc: "🥟 早茶/点心" },
          { time: "下午", desc: "☕ 休息，为晚上蓄能" },
          { time: "20:00", desc: "🎭 JCS — 香港文化中心大剧院", highlight: true },
          { time: "散场", desc: "🌃 维港夜景 + 宵夜" },
        ],
      });
    } else {
      days.push({
        date: "7/25", weekday: "六", location: hkAccom === "sz" ? "深圳 → 香港" : "香港",
        activities: [
          { time: arrivalTime, desc: arrivalDesc },
          ...(outbound === "redeye" ? [{ time: "上午", desc: "😴 先补觉，下午再出动" }] : []),
          { time: "下午", desc: "🚶 尖沙咀随逛 + 随缘吃" },
          { time: "20:00", desc: "🎭 JCS — 香港文化中心大剧院", highlight: true },
          { time: "散场", desc: hkAccom === "sz" ? "🌃 维港夜景，返回深圳住宿" : "🌃 维港夜景" },
        ],
      });
    }

    // === Travel Day (HK → Shantou) ===
    const travelDate = hkDays === 2 ? "7/26" : "7/26";
    const travelWeekday = hkDays === 2 ? "日" : "日";

    const travelDay = {
      date: travelDate, weekday: travelWeekday,
      location: hkAccom === "sz" ? "深圳 → 汕头" : (hkToSt === "direct" ? "香港 → 汕头" : "香港 → 深圳 → 汕头"),
      activities: [],
    };

    if (hkAccom === "sz") {
      // Staying in Shenzhen - depart from Shenzhen
      travelDay.location = "深圳 → 汕头";
      travelDay.activities = [
        { time: "早上", desc: "🥟 深圳吃个早餐" },
        { time: "上午", desc: "🚄 深圳 → 汕头（班次多，约2-2.5h）" },
        { time: "中午", desc: "🏨 到达汕头，check-in" },
        { time: "下午", desc: "❄️ 酒店空调躺平，等太阳下去" },
        { time: "傍晚", desc: "🔥 出动！老城区小公园片区" },
        { time: "晚餐", desc: "🥩 牛肉火锅！！（第一顿给最重要的）", highlight: true },
        { time: "宵夜", desc: "🍊 甘草水果 + 功夫茶消食" },
      ];
    } else if (hkToSt === "direct") {
      travelDay.activities = [
        { time: "早上", desc: "🥟 最后一顿港式早茶" },
        { time: "上午", desc: "🚄 西九龙站 → 汕头站（~2h50min）" },
        { time: "中午", desc: "🏨 到达汕头，check-in" },
        { time: "下午", desc: "❄️ 酒店空调躺平，等太阳下去" },
        { time: "傍晚", desc: "🔥 出动！老城区小公园片区" },
        { time: "晚餐", desc: "🥩 牛肉火锅！！（第一顿给最重要的）", highlight: true },
        { time: "宵夜", desc: "🍊 甘草水果 + 功夫茶消食" },
      ];
    } else {
      travelDay.activities = [
        { time: "上午", desc: "🚄 香港 → 深圳 → 转车去汕头" },
        { time: "下午", desc: "🏨 到达汕头，check-in" },
        { time: "傍晚", desc: "❄️ 休息后出动" },
        { time: "晚餐", desc: "🥩 牛肉火锅！！", highlight: true },
        { time: "宵夜", desc: "🍊 甘草水果 + 功夫茶" },
      ];
    }
    days.push(travelDay);

    // === Remaining Chaoshan Days ===
    const remainingFull = chaoshanDays - 1; // minus travel day
    let dayCounter = 0;

    for (let i = 0; i < remainingFull; i++) {
      const dateNum = 27 + i;
      const weekdays = { 27: "一", 28: "二", 29: "三", 30: "四", 31: "五" };
      const isLast = i === remainingFull - 1;
      const isSecondToLast = i === remainingFull - 2;

      // When enough days + visiting Jieyang: dedicate last 2 days
      const jyExpanded = visitJy && remainingFull >= 3;

      if (isLast) {
        // Last day - go home
        const day = {
          date: `7/${dateNum}`, weekday: weekdays[dateNum] || "?",
          location: "",
          activities: [],
        };

        if (returnMode === "sz") {
          // Return via Shenzhen
          day.location = "汕头 → 深圳 → 北京";
          day.activities = [
            { time: "早餐", desc: "🥟 肠粉 / 粿汁（最后一顿！）" },
            { time: "上午", desc: "🎁 买伴手礼（腐乳饼/老药桔）" },
            { time: "中午", desc: "🚄 汕头 → 深圳（~2-2.5h）" },
            { time: "傍晚", desc: "✈️ 深圳 → 北京（或高铁卧铺夕发朝至）" },
          ];
        } else if (visitJy && jyExpanded) {
          // Already in Jieyang from yesterday
          day.location = "揭阳觅食 → 飞北京";
          day.activities = [
            { time: "早餐", desc: "🍜 揭阳早餐（粿条/肠粉/粿汁）" },
            { time: "上午", desc: "🔥 揭阳市区继续扫街觅食" },
            { time: "午餐", desc: "🥩 揭阳乙鸽鸽 / 当地特色", highlight: true },
            { time: "下午", desc: "🎁 买伴手礼（腐乳饼/老药桔）" },
            { time: "傍晚", desc: "✈️ 揭阳潮汕机场 → 北京" },
          ];
        } else if (visitJy) {
          day.location = "汕头 → 揭阳觅食 → 飞北京";
          day.activities = [
            { time: "早餐", desc: "🥟 肠粉 / 粿汁（最后一顿早餐！）" },
            { time: "上午", desc: "🚗 前往揭阳（~40min）" },
            { time: "午餐", desc: "🍜 揭阳美食探索" },
            { time: "下午", desc: "🎁 买伴手礼（腐乳饼/老药桔）" },
            { time: "傍晚", desc: "✈️ 揭阳潮汕机场 → 北京" },
          ];
        } else {
          day.location = "汕头 → 揭阳机场 → 北京";
          day.activities = [
            { time: "早餐", desc: "🥟 肠粉 / 粿汁" },
            { time: "上午", desc: "🎁 老城区最后一逛 + 买伴手礼" },
            { time: "下午", desc: "✈️ 揭阳潮汕机场 → 北京" },
          ];
        }
        days.push(day);
      } else if (isSecondToLast && jyExpanded) {
        // Transfer to Jieyang day - morning in Shantou, afternoon/evening in Jieyang
        days.push({
          date: `7/${dateNum}`, weekday: weekdays[dateNum] || "?",
          location: "汕头 → 揭阳",
          activities: [
            { time: "自然醒", desc: "😴 汕头最后一个早上" },
            { time: "早午餐", desc: "🍜 粿条 / 粿汁（最后的汕头早餐）" },
            { time: "下午", desc: "🚗 出发去揭阳（~40min），入住酒店" },
            { time: "下午茶", desc: "🧊 揭阳冰室探索" },
            { time: "傍晚", desc: "🔥 揭阳老城扫街" },
            { time: "晚餐", desc: "🍜 揭阳特色美食", highlight: true },
            { time: "宵夜", desc: "🍮 甜品 + 功夫茶" },
          ],
        });
        dayCounter++;
      } else {
        // Full Shantou day
        days.push({
          date: `7/${dateNum}`, weekday: weekdays[dateNum] || "?",
          location: "汕头（躺吃模式 🛋️）",
          activities: [
            { time: "自然醒", desc: "😴 不设闹钟是旅行的底线" },
            { time: "早午餐", desc: "🍜 粿条 / 粿汁 + 卤味拼盘" },
            { time: "回酒店", desc: "❄️ 空调躺平，刷手机，午睡" },
            { time: "下午茶", desc: "🧊 冰室 + 🍊 梅汁水果" },
            { time: "傍晚", desc: "🔥 出动！小公园扫街" },
            { time: "晚餐", desc: "🦐 砂锅粥 + 生腌", highlight: true },
            { time: "宵夜", desc: "🍮 鸭母捻 / 🪿 卤鹅夜宵档" },
          ],
        });
        dayCounter++;
      }
    }

    // Edge case: if chaoshanDays === 1, the travel day IS the last day
    if (chaoshanDays === 1) {
      const lastDay = days[days.length - 1];
      if (returnMode === "sz") {
        lastDay.location += " → 回深圳 → 北京";
        lastDay.activities.push(
          { time: "深夜", desc: "🚄 赶回深圳，再飞/卧铺回京（很赶！）" }
        );
      } else {
        lastDay.location += " → 揭阳飞北京";
        lastDay.activities.push(
          { time: "深夜", desc: "✈️ 揭阳潮汕机场红眼航班？（很赶！）" }
        );
      }
    }

    return days;
  }, [totalDays, hkDays, hkAccom, hkToSt, outbound, returnMode, visitJy, isValid, chaoshanDays]);

  // Warnings
  const warnings = [];
  if (chaoshanDays <= 1) {
    warnings.push("⚠️ 潮汕只有1天，会非常赶！建议增加总天数或减少香港天数");
  }
  if (hkDays === 2 && totalDays === 4) {
    warnings.push("💡 香港2天 + 潮汕2天 = 潮汕实际只有~1.5天吃喝时间");
  }
  if (hkAccom === "sz") {
    warnings.push("💡 住深圳更便宜，且去汕头的高铁班次比香港出发更多");
  }

  return (
    <div style={{
      background: COLORS.bg, minHeight: "100vh", fontFamily: sansStack,
      padding: "0",
    }}>
      {/* Header */}
      <div style={{
        background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.gold})`,
        padding: "28px 20px 20px",
        color: "#fff",
      }}>
        <h1 style={{
          fontFamily: fontStack, fontSize: 22, margin: 0, fontWeight: 700,
          letterSpacing: 1,
        }}>
          🎭 香港 × 潮汕 行程规划器
        </h1>
        <p style={{
          margin: "6px 0 0", fontSize: 13, opacity: 0.9,
        }}>
          切换选项 → 自动生成行程方案 → 截图发给朋友讨论
        </p>
      </div>

      <div style={{ padding: "16px 16px 40px" }}>
        {/* Decision Toggles */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: 10, marginBottom: 20,
        }}>
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

          <OptionCard label="香港停留" icon="🏙️">
            <Toggle
              options={[
                { value: 1, label: "1天（看戏就走）" },
                { value: 2, label: "2天（多逛逛）" },
              ]}
              value={hkDays}
              onChange={(v) => {
                setHkDays(v);
                if (v >= totalDays) setTotalDays(v + 1);
              }}
            />
          </OptionCard>

          <OptionCard label="香港住哪" icon="🏨">
            <Toggle
              options={[
                { value: "hk", label: "住香港" },
                { value: "sz", label: "住深圳（省钱）" },
              ]}
              value={hkAccom}
              onChange={setHkAccom}
            />
          </OptionCard>

          <OptionCard label="北京→香港" icon="✈️">
            <Toggle
              options={[
                { value: "fly", label: "白天航班" },
                { value: "redeye", label: "红眼（便宜）" },
                { value: "sleeper", label: "高铁卧铺" },
              ]}
              value={outbound}
              onChange={setOutbound}
            />
            {outbound === "redeye" && (
              <div style={{
                marginTop: 6, padding: "6px 10px", background: COLORS.accentLight,
                borderRadius: 6, fontSize: 12, color: COLORS.accentDark, fontFamily: sansStack,
              }}>
                💡 便宜但凌晨到，朋友可能嫌累
              </div>
            )}
            {outbound === "sleeper" && (
              <div style={{
                marginTop: 6, padding: "6px 10px", background: COLORS.goldLight,
                borderRadius: 6, fontSize: 12, color: COLORS.gold, fontFamily: sansStack,
              }}>
                🚄 前一晚北京出发，早上到港/深（价格≈机票）
              </div>
            )}
          </OptionCard>

          <OptionCard label="去汕头交通" icon="🚄">
            {hkAccom === "sz" ? (
              <div style={{
                padding: "8px 12px", background: COLORS.tagBg, borderRadius: 8,
                fontSize: 13, color: COLORS.textLight, fontFamily: sansStack,
              }}>
                🚄 深圳直达汕头（班次多，~2-2.5h）
              </div>
            ) : (
              <Toggle
                options={[
                  { value: "direct", label: "西九龙直达（~3h）" },
                  { value: "via_sz", label: "经深圳中转" },
                ]}
                value={hkToSt}
                onChange={setHkToSt}
              />
            )}
          </OptionCard>

          <OptionCard label="回北京" icon="🏠">
            <Toggle
              options={[
                { value: "jy_fly", label: "揭阳直飞" },
                { value: "sz", label: "回深圳走" },
              ]}
              value={returnMode}
              onChange={(v) => {
                setReturnMode(v);
                if (v === "sz") setVisitJy(false);
              }}
            />
            {returnMode === "sz" && (
              <div style={{
                marginTop: 6, padding: "6px 10px", background: COLORS.tagBg,
                borderRadius: 6, fontSize: 12, color: COLORS.textLight, fontFamily: sansStack,
              }}>
                汕头→深圳 ~2.5h，然后飞/高铁卧铺回京
              </div>
            )}
          </OptionCard>

          {returnMode === "jy_fly" && (
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
          )}
        </div>

        {/* Summary Bar */}
        <div style={{
          display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12,
        }}>
          {[
            { label: `香港 ${hkDays}天`, color: COLORS.hk },
            { label: `潮汕 ${chaoshanDays}天`, color: COLORS.st },
            ...(visitJy ? [{ label: visitJy && chaoshanDays >= 4 ? "揭阳 1.5天" : "揭阳觅食", color: COLORS.jy }] : []),
          ].map((tag) => (
            <span key={tag.label} style={{
              fontSize: 12, fontWeight: 600, color: tag.color,
              background: `${tag.color}18`, padding: "4px 12px",
              borderRadius: 20, fontFamily: sansStack,
            }}>
              {tag.label}
            </span>
          ))}
        </div>

        {/* Warnings */}
        {warnings.length > 0 && (
          <div style={{ marginBottom: 16 }}>
            {warnings.map((w, i) => (
              <div key={i} style={{
                fontSize: 13, color: COLORS.accentDark, fontFamily: sansStack,
                background: COLORS.accentLight, padding: "8px 12px",
                borderRadius: 8, marginBottom: 4, lineHeight: 1.5,
              }}>
                {w}
              </div>
            ))}
          </div>
        )}

        {/* Timeline */}
        <h2 style={{
          fontFamily: fontStack, fontSize: 18, color: COLORS.text,
          margin: "20px 0 16px", fontWeight: 700,
        }}>
          📋 行程方案
        </h2>

        {itinerary.map((day, i) => (
          <DayCard key={`${day.date}-${i}`} day={day} index={i} />
        ))}

        {/* Food Checklist */}
        <FoodChecklist chaoshanDays={chaoshanDays} />

        {/* Footer */}
        <div style={{
          textAlign: "center", marginTop: 24, padding: "16px",
          color: COLORS.textLight, fontSize: 12, fontFamily: sansStack,
          borderTop: `1px solid ${COLORS.border}`,
        }}>
          JCS 🎭 7/25 20:00 @ 香港文化中心大剧院
          <br />
          切换上方选项，行程自动更新 ✨
        </div>
      </div>
    </div>
  );
}
