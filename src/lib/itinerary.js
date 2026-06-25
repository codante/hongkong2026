// 行程生成纯函数：根据选项算出每天的活动时间线。
// 所有方案都 7/25 当天到港看下午场。hkPlan 三选一：
//   "hk1"   — 香港 1 天：看完戏住香港，7/26 中午 G6392 直达汕头
//   "sz1"   — 香港 1 天：看完戏当晚回深圳，7/26 早上 深圳→汕头
//   "hk2sz" — 香港 2 天：7/25 看戏住香港、7/26 玩一天后晚上去深圳，7/27 早上去汕头（省房钱）

const WD = { 24: "五", 25: "六", 26: "日", 27: "一", 28: "二", 29: "三", 30: "四", 31: "五" };

export function buildItinerary({ totalDays, hkPlan, outbound, visitJy }) {
  const hkDays = hkPlan === "hk2sz" ? 2 : 1;
  const chaoshanDays = totalDays - hkDays;
  if (chaoshanDays < 1) return [];

  const days = [];

  const arrivalDesc =
    outbound === "fly"
      ? "✈️ 国泰 CX345 北京T3 07:25 → 香港 11:00（~3.5h）"
      : "🚄 G897 动卧 前晚 21:01 北京发 → 07:19 到西九龙（¥1280 起）";
  const arrivalTime = outbound === "fly" ? "07:25 起飞" : "07:19 到港";

  const showActivities = [
    { time: "14:30", desc: "🎟️ 入场，香港文化中心大剧院" },
    { time: "15:00", desc: "🎭 JCS 下午场（约 2h）", highlight: true },
  ];

  // === 7/25 到港 + 看下午场（所有方案）===
  const stayHkNight1 = hkPlan !== "sz1"; // hk1/hk2sz 第一晚住香港；sz1 当晚回深圳
  days.push({
    date: "7/25",
    weekday: "六",
    location: stayHkNight1 ? "香港" : "香港 → 深圳",
    activities: [
      { time: arrivalTime, desc: arrivalDesc },
      {
        time: "午餐",
        desc: stayHkNight1
          ? "🍜 尖沙咀快速午餐（到港别耽搁，赶下午场）"
          : "🍜 尖沙咀午餐（行李先寄存西九龙站）",
      },
      ...showActivities,
      ...(stayHkNight1
        ? [
            { time: "17:00", desc: "🌅 散场，尖沙咀海滨长廊散步" },
            { time: "晚餐", desc: "🍽️ 尖沙咀觅食" },
            { time: "晚上", desc: "🌃 维港夜景，住香港" },
          ]
        : [
            { time: "17:00", desc: "🌅 散场，海滨散步 + 早晚餐" },
            { time: "晚上", desc: "🚄 取行李，西九龙 → 深圳北（约 23min 过关），站旁酒店睡（纯换乘）" },
          ]),
    ],
  });

  // === hk2sz: 7/26 香港玩一天，晚上去深圳 ===
  if (hkPlan === "hk2sz") {
    days.push({
      date: "7/26",
      weekday: "日",
      location: "香港 → 深圳",
      activities: [
        { time: "上午", desc: "🎨 香港故宫 / K11 MUSEA / 海港城购物" },
        { time: "午餐", desc: "🥟 早茶 / 心仪餐厅" },
        { time: "下午", desc: "🚶 尖沙咀 / 中环 citywalk（或太平山顶）" },
        { time: "晚上", desc: "🧳 玩够了退房，西九龙 → 深圳北（约 23min 过关）" },
        { time: "夜里", desc: "🏨 深圳北站旁酒店（~¥200，纯换乘睡一晚），早睡赶早车" },
      ],
    });
  }

  // === Travel Day (去汕头) ===
  const travelDateNum = hkDays === 2 ? 27 : 26;
  const fromSz = hkPlan !== "hk1"; // sz1 / hk2sz 从深圳出发
  days.push({
    date: `7/${travelDateNum}`,
    weekday: WD[travelDateNum],
    location: fromSz ? "深圳 → 汕头" : "香港 → 汕头",
    activities: fromSz
      ? [
          { time: "07:54 发车", desc: "🚄 C7220 深圳北 07:54 → 汕头 10:03（¥148）" },
          { time: "10:03 到", desc: "🏨 到汕头，check-in 放行李" },
          { time: "中午", desc: "🍜 汕头第一口：粿条 / 牛肉丸垫垫" },
          { time: "下午", desc: "❄️ 酒店空调躺平，午睡，等太阳下去" },
          { time: "傍晚", desc: "🔥 出动！老城区小公园片区" },
          { time: "晚餐", desc: "🥩 牛肉火锅！！（第一顿给最重要的）", highlight: true },
          { time: "宵夜", desc: "🍊 甘草水果 + 功夫茶消食" },
        ]
      : [
          { time: "早上", desc: "🥟 最后一顿港式早茶（从容，下午才发车）" },
          { time: "12:55 发车", desc: "🚄 G6392 西九龙 12:55 → 汕头 15:10（¥305）" },
          { time: "15:10 到", desc: "🏨 到达汕头，check-in" },
          { time: "下午", desc: "❄️ 酒店空调躺平，等太阳下去" },
          { time: "傍晚", desc: "🔥 出动！老城区小公园片区" },
          { time: "晚餐", desc: "🥩 牛肉火锅！！（第一顿给最重要的）", highlight: true },
          { time: "宵夜", desc: "🍊 甘草水果 + 功夫茶消食" },
        ],
  });

  // === Remaining Chaoshan Days ===
  const remainingFull = chaoshanDays - 1; // minus travel day
  const startDateNum = travelDateNum + 1;

  for (let i = 0; i < remainingFull; i++) {
    const dateNum = startDateNum + i;
    const weekday = WD[dateNum] || "?";
    const isLast = i === remainingFull - 1;
    const isSecondToLast = i === remainingFull - 2;
    const jyExpanded = visitJy && remainingFull >= 3;

    if (isLast) {
      const day = { date: `7/${dateNum}`, weekday, location: "", activities: [] };

      if (visitJy && jyExpanded) {
        day.location = "揭阳觅食 → 飞北京";
        day.activities = [
          { time: "早餐", desc: "🍜 揭阳早餐（粿条/肠粉/粿汁）" },
          { time: "上午", desc: "🔥 揭阳市区继续扫街觅食" },
          { time: "午餐", desc: "🥩 揭阳乙鸽鸽 / 当地特色", highlight: true },
          { time: "下午", desc: "🎁 买伴手礼（腐乳饼/老药桔）" },
          { time: "20:30 起飞", desc: "✈️ 南航 CZ8868 揭阳潮汕 20:30 → 北京大兴 23:25（¥540 起）" },
        ];
      } else if (visitJy) {
        day.location = "汕头 → 揭阳觅食 → 飞北京";
        day.activities = [
          { time: "早餐", desc: "🥟 肠粉 / 粿汁（最后一顿早餐！）" },
          { time: "上午", desc: "🚗 前往揭阳（~40min）" },
          { time: "午餐", desc: "🍜 揭阳美食探索" },
          { time: "下午", desc: "🎁 买伴手礼（腐乳饼/老药桔）" },
          { time: "20:30 起飞", desc: "✈️ 南航 CZ8868 揭阳潮汕 20:30 → 北京大兴 23:25（¥540 起）" },
        ];
      } else {
        day.location = "汕头 → 揭阳机场 → 北京";
        day.activities = [
          { time: "早餐", desc: "🥟 肠粉 / 粿汁" },
          { time: "上午", desc: "🎁 老城区最后一逛 + 买伴手礼" },
          { time: "20:30 起飞", desc: "✈️ 南航 CZ8868 揭阳潮汕 20:30 → 北京大兴 23:25（¥540 起）" },
        ];
      }
      days.push(day);
    } else if (isSecondToLast && jyExpanded) {
      days.push({
        date: `7/${dateNum}`,
        weekday,
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
    } else {
      days.push({
        date: `7/${dateNum}`,
        weekday,
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
    }
  }

  return days;
}

// 行程提示/警告
export function buildWarnings({ totalDays, hkPlan }) {
  const hkDays = hkPlan === "hk2sz" ? 2 : 1;
  const chaoshanDays = totalDays - hkDays;
  const warnings = [];
  if (hkPlan === "hk2sz") {
    warnings.push("💡 香港玩 2 天，第二晚住深圳省房钱（深圳北 ~¥200 vs 香港 ~¥700），玩够了晚上才过关");
  }
  if (hkPlan === "sz1") {
    warnings.push("💡 看完戏当晚就回深圳省钱，但要拖行李过关（赶一点）");
  }
  if (hkPlan === "hk1") {
    warnings.push("💡 最省心：看完戏悠闲住香港，次日中午 G6392 直达汕头（但香港房贵 ~¥700）");
  }
  if (chaoshanDays <= 1) {
    warnings.push("⚠️ 潮汕只剩 1 天，会很赶，建议加总天数");
  }
  return warnings;
}
