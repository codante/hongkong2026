// 由当前方案选项派生「跨城交通段」与「住宿过夜」列表。
import { legs } from "../data/transport.js";

// 返回当前方案涉及的跨城交通段（按出行顺序）
export function buildLegs({ outbound, hkPlan, visitJy }) {
  const keys = [];

  // 北京 → 香港
  keys.push(outbound === "fly" ? "bj_hk_fly" : "bj_hk_sleeper");

  // 去汕头：住香港走 G6392 直达；回深圳走深圳→汕头
  keys.push(hkPlan === "hk1" ? "hk_st_direct" : "sz_st");

  // 返程
  keys.push("jy_bj_fly");

  return keys.map((k) => ({ key: k, ...legs[k] }));
}

// 返回当前方案各城过夜：[{ key, nights }]，最后一天离开不计过夜
export function buildStays({ totalDays, hkPlan, visitJy }) {
  const hkDays = hkPlan === "hk2sz" ? 2 : 1;
  const chaoshanDays = totalDays - hkDays;
  const remainingFull = chaoshanDays - 1;
  const jyExpanded = visitJy && remainingFull >= 3;

  const stays = [];

  // 香港段住宿
  if (hkPlan === "hk1") {
    stays.push({ key: "hk", nights: 1 });
  } else if (hkPlan === "sz1") {
    stays.push({ key: "sz", nights: 1 });
  } else {
    // hk2sz：第一晚香港、第二晚深圳
    stays.push({ key: "hk", nights: 1 });
    stays.push({ key: "sz", nights: 1 });
  }

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
