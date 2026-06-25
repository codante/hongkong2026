// 行程生成纯函数：根据选项算出每天的活动时间线。
// hkPlan 三选一：
//   "hk1"   — 香港 1 天，看完戏住香港，次日中午 G6392 直达汕头
//   "sz1"   — 香港 1 天，看完戏回深圳，次日早上 深圳→汕头
//   "hk2sz" — 香港 2 天，第一晚住香港、第二晚回深圳，次日早上 深圳→汕头

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

  // 看戏当天（7/25）下午场，散场后随方案不同
  const showActivities = [
    { time: "14:30", desc: "🎟️ 入场，香港文化中心大剧院" },
    { time: "15:00", desc: "🎭 JCS 下午场（约 2h）", highlight: true },
  ];

  if (hkPlan === "hk2sz") {
    // 7/24 到港，住香港
    days.push({
      date: "7/24",
      weekday: "五",
      location: "香港",
      activities: [
        { time: arrivalTime, desc: arrivalDesc },
        { time: "上午", desc: "🏨 港青寄存行李，轻装出动" },
        { time: "下午", desc: "🎨 尖沙咀闲逛 / 莫奈展 / 坂本龙一展" },
        { time: "晚餐", desc: "🍽️ 随缘：茶餐厅 / 点心 / Jollibee" },
        { time: "晚上", desc: "🌃 维港夜景，住香港" },
      ],
    });
    // 7/25 看戏，晚上回深圳
    days.push({
      date: "7/25",
      weekday: "六",
      location: "香港 → 深圳",
      activities: [
        { time: "上午", desc: "🎨 香港故宫 / K11 MUSEA / 继续看展" },
        { time: "午餐", desc: "🥟 早茶/点心（早点吃，别误场）" },
        { time: "退房", desc: "🧳 退房寄存行李，轻装看戏" },
        ...showActivities,
        { time: "17:00", desc: "🌅 散场，取行李" },
        { time: "傍晚", desc: "🚄 西九龙 → 深圳（约 20min 过关），入住深圳" },
        { time: "晚餐", desc: "🍜 深圳吃个晚饭" },
      ],
    });
  } else {
    // 1 天方案：7/25 当天到港、看戏
    const stayHk = hkPlan === "hk1";
    days.push({
      date: "7/25",
      weekday: "六",
      location: stayHk ? "香港" : "香港 → 深圳",
      activities: [
        { time: arrivalTime, desc: arrivalDesc },
        {
          time: "午餐",
          desc: stayHk
            ? "🍜 尖沙咀快速午餐（到港别耽搁，赶下午场）"
            : "🍜 尖沙咀午餐（行李先寄存西九龙站）",
        },
        ...showActivities,
        ...(stayHk
          ? [
              { time: "17:00", desc: "🌅 散场，尖沙咀海滨长廊散步" },
              { time: "晚餐", desc: "🍽️ 尖沙咀觅食" },
              { time: "晚上", desc: "🌃 维港夜景，住香港" },
            ]
          : [
              { time: "17:00", desc: "🌅 散场，海滨散步 + 早晚餐" },
              { time: "傍晚", desc: "🚄 取行李，西九龙 → 深圳（约 20min 过关），入住深圳" },
            ]),
      ],
    });
  }

  // === Travel Day (去汕头, 7/26) ===
  const fromSz = hkPlan !== "hk1"; // sz1 / hk2sz 从深圳出发
  const travelDay = {
    date: "7/26",
    weekday: "日",
    location: fromSz ? "深圳 → 汕头" : "香港 → 汕头",
    activities: fromSz
      ? [
          { time: "早上", desc: "🥟 深圳吃个早餐" },
          { time: "上午", desc: "🚄 深圳 → 汕头（约 2-2.5h，¥200）" },
          { time: "中午", desc: "🏨 到达汕头，check-in" },
          { time: "下午", desc: "❄️ 酒店空调躺平，等太阳下去" },
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
  };
  days.push(travelDay);

  // === Remaining Chaoshan Days ===
  const remainingFull = chaoshanDays - 1; // minus travel day

  for (let i = 0; i < remainingFull; i++) {
    const dateNum = 27 + i;
    const weekdays = { 27: "一", 28: "二", 29: "三", 30: "四", 31: "五" };
    const isLast = i === remainingFull - 1;
    const isSecondToLast = i === remainingFull - 2;
    const jyExpanded = visitJy && remainingFull >= 3;

    if (isLast) {
      const day = {
        date: `7/${dateNum}`,
        weekday: weekdays[dateNum] || "?",
        location: "",
        activities: [],
      };

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
        weekday: weekdays[dateNum] || "?",
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
        weekday: weekdays[dateNum] || "?",
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
  if (hkPlan === "hk2sz" && totalDays === 4) {
    warnings.push("💡 香港 2 天 + 潮汕 2 天 = 潮汕实际只有 ~1.5 天吃喝时间");
  }
  if (hkPlan !== "hk1") {
    warnings.push("💡 回深圳住更省钱、深圳去汕头班次多；但看完戏当晚要拖行李过关");
  }
  if (hkPlan === "hk1") {
    warnings.push("💡 住香港最省心：看完戏悠闲过夜，次日中午 G6392 直达汕头");
  }
  return warnings;
}
