// 航班 / 车次数据 —— 结构化占位，等 Coda 发截图后填充。
//
// 每条记录的推荐字段：
//   {
//     id:       唯一标识，如 "ca1331"
//     mode:     "flight" | "train"
//     carrier:  航司 / 铁路，如 "国航" / "G79"
//     no:       航班号 / 车次号，如 "CA1331" / "G79"
//     dep:      出发，如 "PEK 08:00" （站/机场 + 时间）
//     arr:      到达，如 "HKG 11:30"
//     duration: 时长，如 "3h30m"
//     price:    参考价（数字或字符串，如 1200 或 "1200起"）
//     note:     备注，如 "红眼" / "经停深圳"
//   }
//
// 填好后，lib/itinerary.js 可按需引用具体班次来丰富行程描述。

export const flights = {
  bj_hk: [], // 北京 → 香港
  jy_bj: [], // 揭阳 → 北京
  sz_bj: [], // 深圳 → 北京
};

export const trains = {
  hk_st: [], // 西九龙 → 汕头
  sz_st: [], // 深圳 → 汕头
  st_sz: [], // 汕头 → 深圳
};
