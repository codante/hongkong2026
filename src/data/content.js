// ============================================================
//  所有行程文案集中在这里 —— 改文字只动这个文件即可。
//  不用碰 itinerary.js 的分支逻辑，不怕改坏方案切换。
//  每条格式：{ time: "左侧时间标签", desc: "描述", highlight?: true }
//  （highlight: true 会高亮成金色，用于"主餐/重点"那行）
// ============================================================

export const content = {
  // —— 去程到港（北京 → 香港），按"白天航班 / 高铁动卧"二选一 ——
  arrival: {
    fly: {
      time: "07:25 起飞",
      desc: "✈️ 国泰 CX345 北京T3 07:25 → 香港 11:00（~3.5h）",
    },
    sleeper: {
      time: "07:19 到港",
      desc: "🚄 G897 动卧 前晚 21:01 北京发 → 07:19 到西九龙（¥1280 起）",
    },
  },

  // —— 7/25 看戏（下午场，三种方案都一样）——
  show: [
    { time: "14:30", desc: "🎟️ 入场，香港文化中心大剧院" },
    { time: "15:00", desc: "🎭 JCS 下午场（约 2h）", highlight: true },
  ],

  // —— 7/25 看戏前的午餐 ——
  lunch25StayHk: { time: "午餐", desc: "🍜 寄存行李，午餐觅食" },
  lunch25ToSz: { time: "午餐", desc: "🍜 寄存行李，午餐觅食" },

  // —— 7/25 看戏后：住香港 / 当晚回深圳 ——
  evening25StayHk: [
    { time: "17:00", desc: "🌅 散场，酒店 check-in" },
    { time: "晚餐", desc: "🍽️ 觅食" },
    { time: "晚上", desc: "🌃 维港夜景，太平山 (optional)，住香港" },
  ],
  evening25ToSz: [
    { time: "17:00", desc: "🌅 散场，自由活动+觅食" },
    { time: "傍晚", desc: "🚄 取行李，西九龙 → 深圳北，入住站旁酒店（纯换乘）" },
  ],

  // —— hk2sz 专属：7/26 香港玩一天 → 晚上去深圳 ——
  hk2szDay26: [
    { time: "上午", desc: "🎨 退房，香港故宫 / K11 MUSEA / 海港城购物" },
    { time: "午餐", desc: "🥟 觅食" },
    { time: "下午", desc: "🚶 尖沙咀 / 中环 citywalk（或太平山顶）" },
    { time: "晚上", desc: "🧳 西九龙 → 深圳北" },
    { time: "夜里", desc: "🏨 深圳北站旁酒店，早睡赶早车" },
  ],

  // —— 去汕头那天：从深圳出发 / 从香港直达 ——
  toShantouFromSz: [
    { time: "07:54 发车", desc: "🚄 C7220 深圳北 07:54 → 汕头 10:03（¥148）" },
    { time: "10:03 到", desc: "🏨 到汕头，寄存行李" },
    { time: "中午", desc: "🍜 午餐觅食，垫一垫" },
    { time: "下午", desc: "❄️ 酒店 check-in" },
    { time: "傍晚", desc: "🔥 出动！老城区小公园片区？" },
    { time: "晚餐", desc: "🍽️ 晚餐觅食", highlight: true },
    { time: "宵夜", desc: "🌙 宵夜觅食" },
  ],
  toShantouFromHk: [
    { time: "早上", desc: "🥟 觅食，自由活动，退房" },
    { time: "12:55 发车", desc: "🚄 G6392 西九龙 12:55 → 汕头 15:10（¥305）" },
    { time: "15:10 到", desc: "🏨 到达汕头，check-in" },
    { time: "下午", desc: "❄️ 酒店空调躺平，等太阳下去" },
    { time: "傍晚", desc: "🔥 出动！老城区小公园片区？" },
    { time: "晚餐", desc: "🍽️ 晚餐觅食", highlight: true },
    { time: "宵夜", desc: "🌙 宵夜觅食" },
  ],

  // —— 汕头躺吃整天（潮汕中间的每一天都用这套）——
  shantouFullDay: [
    { time: "自然醒", desc: "😴 不设闹钟是旅行的底线" },
    { time: "早午餐", desc: "🍜 早午餐觅食" },
    { time: "回酒店", desc: "❄️ 空调躺平，刷手机，午睡" },
    { time: "下午茶", desc: "🧊 下午茶 / 解暑觅食" },
    { time: "傍晚", desc: "🔥 自由活动" },
    { time: "晚餐", desc: "🍽️ 晚餐觅食", highlight: true },
    { time: "宵夜", desc: "🌙 宵夜觅食（糖水 / 卤味 / 粥 / 促肉粿条）" },
  ],

  // —— 汕头 → 揭阳转场日（仅天数够 + 去揭阳时出现）——
  shantouToJieyang: [
    { time: "自然醒", desc: "😴 汕头最后一个早上" },
    { time: "早午餐", desc: "🍜 早午餐觅食（最后的汕头早餐）" },
    { time: "下午", desc: "🚗 出发去揭阳（~40min），入住酒店" },
    { time: "下午茶", desc: "🧊 揭阳下午茶 / 冰室" },
    { time: "傍晚", desc: "🔥 揭阳老城扫街" },
    { time: "晚餐", desc: "🍽️ 揭阳晚餐觅食", highlight: true },
    { time: "宵夜", desc: "🌙 宵夜觅食" },
  ],

  // —— 最后一天返程（三选一，看是否去揭阳 / 是否已在揭阳）——
  lastDayJyExpanded: [
    { time: "早餐", desc: "🍜 早餐觅食" },
    { time: "上午", desc: "🔥 揭阳市区继续扫街觅食" },
    { time: "午餐", desc: "🍽️ 午餐觅食", highlight: true },
    { time: "下午", desc: "🎁 买伴手礼（腐乳饼/老药桔？）" },
    { time: "20:30 起飞", desc: "✈️ 南航 CZ8868 揭阳潮汕 20:30 → 北京大兴 23:25（¥540 起）" },
  ],
  lastDayVisitJy: [
    { time: "早餐", desc: "🥟 早餐觅食（最后一顿！）" },
    { time: "上午", desc: "🚗 前往揭阳（~40min）" },
    { time: "午餐", desc: "🍽️ 揭阳午餐觅食" },
    { time: "下午", desc: "🎁 买伴手礼（腐乳饼/老药桔？）" },
    { time: "20:30 起飞", desc: "✈️ 南航 CZ8868 揭阳潮汕 20:30 → 北京大兴 23:25（¥540 起）" },
  ],
  lastDayDirect: [
    { time: "早餐", desc: "🥟 早餐觅食" },
    { time: "上午", desc: "🎁 老城区最后一逛 + 买伴手礼" },
    { time: "20:30 起飞", desc: "✈️ 南航 CZ8868 揭阳潮汕 20:30 → 北京大兴 23:25（¥540 起）" },
  ],

  // —— 每天右上角那个"地点"小标签 ——
  locations: {
    hkStay: "香港",
    hkToSz: "香港 → 深圳",
    szToShantou: "深圳 → 汕头",
    hkToShantou: "香港 → 汕头",
    shantouFull: "汕头（躺吃模式 🛋️）",
    shantouToJieyang: "汕头 → 揭阳",
    lastJyExpanded: "揭阳觅食 → 飞北京",
    lastVisitJy: "汕头 → 揭阳觅食 → 飞北京",
    lastDirect: "汕头 → 揭阳机场 → 北京",
  },

  // —— 顶部提示条（每个方案一条）——
  warnings: {
    hk2sz: "💡 香港玩 2 天，第二晚住深圳省房钱（深圳北 ~¥200 vs 香港 ~¥700），玩够了晚上才过关",
    sz1: "💡 看完戏当晚就回深圳省钱，但要拖行李过关（赶一点）",
    hk1: "💡 最省心：看完戏悠闲住香港，次日中午 G6392 直达汕头（但香港房贵 ~¥700）",
    chaoshanTight: "⚠️ 潮汕只剩 1 天，会很赶，建议加总天数",
  },
};
