// 由当前方案选项派生「跨城交通段」与「住宿过夜」列表。
import { legs } from "../data/transport.js";

// 返回当前方案涉及的跨城交通段（按出行顺序）
export function buildLegs({
  outbound,
  hkAccom,
  hkToSt,
  visitJy,
  totalDays,
  hkDays,
}) {
  const keys = [];

  // 北京 → 香港
  keys.push(outbound === "fly" ? "bj_hk_fly" : "bj_hk_sleeper");

  // 香港/深圳 → 汕头
  if (hkAccom === "sz") {
    keys.push("sz_st");
  } else {
    keys.push(hkToSt === "direct" ? "hk_st_direct" : "hk_st_via_sz");
  }

  // 返程（含汕头→揭阳接驳）
  if (visitJy) keys.push("st_jy");
  keys.push("jy_bj_fly");

  return keys.map((k) => ({ key: k, ...legs[k] }));
}

// 返回当前方案各城过夜：[{ key, nights }]，最后一天离开不计过夜
export function buildStays({ totalDays, hkDays, hkAccom, visitJy }) {
  const chaoshanDays = totalDays - hkDays;
  const remainingFull = chaoshanDays - 1; // 去掉抵达当天的赶路
  const jyExpanded = visitJy && remainingFull >= 3;

  const stays = [];

  // 香港期间：住香港 or 住深圳
  stays.push({ key: hkAccom === "sz" ? "sz" : "hk", nights: hkDays });

  // 潮汕过夜总数（最后一天离开不过夜）
  const chaoshanNights = chaoshanDays - 1;
  if (jyExpanded) {
    stays.push({ key: "st", nights: chaoshanNights - 1 });
    stays.push({ key: "jy", nights: 1 });
  } else {
    stays.push({ key: "st", nights: chaoshanNights });
  }

  return stays.filter((s) => s.nights > 0);
}
