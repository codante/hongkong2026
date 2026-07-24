// 各城住宿 —— 三家已预订（2026-07-24 确认），价格以订单为准。
// key 与 lib/plan.js 的 buildStays 返回值对应。
export const stayInfo = {
  hk: {
    city: "🇭🇰 香港",
    area: "尖沙咀",
    reason: "步行可达香港文化中心，地铁四通八达",
    options: [
      {
        name: "香港基督教青年会（港青酒店 YMCA）",
        price: "已预订 ✅",
        note: "🎭 文化中心隔壁步行 2min！泳池 + 部分海景",
        url: "https://hotels.ctrip.com/hotels/458487.html",
      },
    ],
  },
  sz: {
    city: "🌃 深圳",
    area: "龙华 · 深圳北站",
    reason: "西九龙高铁直达深圳北(~23min)，次日同站发车去汕头——纯换乘睡一晚",
    options: [
      {
        name: "汇德隆酒店（深圳北站汇德大厦店）",
        price: "已预订 ✅",
        note: "深圳北站旁，落地即睡，早上赶车不慌",
      },
    ],
  },
  st: {
    city: "🦐 汕头",
    area: "万象城一带",
    reason: "商圈周边生活便利，打车去老城小公园片区也方便",
    options: [
      {
        name: "逸朵酒店（万象城店）",
        price: "已预订 ✅",
        note: "连住 2 晚，躺吃大本营",
      },
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
