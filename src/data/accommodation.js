// 各城住宿候选（2026-06 调研，参考价，实时房价以携程/Agoda 为准）。
// key 与 lib/plan.js 的 buildStays 返回值对应。
export const stayInfo = {
  hk: {
    city: "🇭🇰 香港",
    area: "尖沙咀 / 佐敦",
    reason: "步行可达香港文化中心，地铁四通八达",
    options: [
      { name: "康境酒店 Hotel Stage", price: "¥600–900/晚", note: "佐敦尖沙咀交界，精品质感" },
      { name: "港青酒店 YMCA", price: "¥900–1300/晚", note: "尖沙咀站 3min，泳池 + 部分海景" },
      { name: "宝御酒店 Hotel Pravo", price: "¥683 起/晚", note: "海港城旁，房间大、性价比高" },
    ],
  },
  sz: {
    city: "🌃 深圳",
    area: "福田 / 罗湖（近口岸）",
    reason: "过关方便，去汕头高铁班次多、房价更低",
    options: [
      { name: "福田/罗湖连锁商务酒店", price: "¥300–500/晚", note: "近福田口岸或罗湖站，选连锁更稳" },
    ],
  },
  st: {
    city: "🦐 汕头",
    area: "小公园老城",
    reason: "觅食核心区，骑楼风情，扫街方便",
    options: [
      { name: "宿町酒店", price: "¥200–400/晚", note: "推窗即见小公园骑楼" },
      { name: "山河里·宋朝美学庭院", price: "¥300–500/晚", note: "汉服体验 + 中式下午茶" },
      { name: "里巷居酒店(小公园店)", price: "¥200–350/晚", note: "老城核心，性价比高" },
    ],
  },
  jy: {
    city: "🍜 揭阳",
    area: "市区",
    reason: "仅『顺路觅食过夜』方案需要",
    options: [
      { name: "市区经济连锁", price: "¥150–300/晚", note: "汉庭/锦江之星等，住一晚即可" },
    ],
  },
};
