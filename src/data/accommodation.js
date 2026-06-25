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
      { name: "待定（你调研中）", price: "—", note: "深圳北站旁，纯换乘睡一晚，回头发我补上" },
    ],
  },
  st: {
    city: "🦐 汕头",
    area: "小公园老城",
    reason: "觅食核心区，骑楼风情，扫街方便",
    options: [
      { name: "待定（你调研中）", price: "—", note: "你有更平价的选择，回头发我补上" },
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
