// 各城住宿候选（2026-06 调研，参考价为旺季估算，实时价/取消政策点链接查）。
// key 与 lib/plan.js 的 buildStays 返回值对应。
// url 为预订详情页（携程/Trip.com），手机点开可看实时价。深圳/揭阳为通用建议，无固定链接。
export const stayInfo = {
  hk: {
    city: "🇭🇰 香港",
    area: "尖沙咀 / 佐敦",
    reason: "步行可达香港文化中心，地铁四通八达",
    options: [
      {
        name: "港青酒店 YMCA",
        price: "¥700+/晚",
        note: "🎭 文化中心隔壁步行 2min！泳池 + 部分海景",
        url: "https://hotels.ctrip.com/hotels/458487.html",
      },
      {
        name: "宝御酒店 Hotel Pravo",
        price: "¥700+/晚",
        note: "近海港城、房间大；离文化中心步行约 10min",
        url: "https://hotels.ctrip.com/hotels/2213797.html",
      },
    ],
  },
  sz: {
    city: "🌃 深圳",
    area: "深圳北站旁",
    reason: "西九龙高铁直达深圳北(~23min)，次日同站发车去汕头——纯换乘睡一晚",
    options: [
      { name: "深圳北站连锁酒店", price: "¥200–350/晚", note: "汉庭/全季等，步行到站、赶早车方便；深圳只是换乘点，别期待美食" },
    ],
  },
  st: {
    city: "🦐 汕头",
    area: "小公园老城",
    reason: "觅食核心区，骑楼风情，扫街方便",
    options: [
      {
        name: "宿町酒店",
        price: "¥350–550/晚",
        note: "推窗即见小公园骑楼",
        url: "https://hotels.ctrip.com/hotels/125330822.html",
      },
      {
        name: "山禾里·宋代美学庭院",
        price: "¥560–800/晚",
        note: "汉服体验 + 中式下午茶",
        url: "https://hotels.ctrip.com/hotels/124112605.html",
      },
      {
        name: "里巷居酒店(小公园店)",
        price: "¥300–600/晚",
        note: "老城核心，性价比高",
        url: "https://hotels.ctrip.com/hotels/125207143.html",
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
