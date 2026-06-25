// 行程生成 = 纯逻辑（选方案、算日期），文案全在 data/content.js。
// 想改文字 → 去 content.js；想改"哪个方案出现哪几天" → 改这里。
import { content as C } from "../data/content.js";

const WD = { 24: "五", 25: "六", 26: "日", 27: "一", 28: "二", 29: "三", 30: "四", 31: "五" };

export function buildItinerary({ totalDays, hkPlan, outbound, visitJy }) {
  const hkDays = hkPlan === "hk2sz" ? 2 : 1;
  const chaoshanDays = totalDays - hkDays;
  if (chaoshanDays < 1) return [];

  const days = [];
  const arrival = C.arrival[outbound === "fly" ? "fly" : "sleeper"];
  const stayHkNight1 = hkPlan !== "sz1"; // hk1/hk2sz 第一晚住香港；sz1 当晚回深圳

  // === 7/25 到港 + 看下午场 ===
  days.push({
    date: "7/25",
    weekday: "六",
    location: stayHkNight1 ? C.locations.hkStay : C.locations.hkToSz,
    activities: [
      arrival,
      stayHkNight1 ? C.lunch25StayHk : C.lunch25ToSz,
      ...C.show,
      ...(stayHkNight1 ? C.evening25StayHk : C.evening25ToSz),
    ],
  });

  // === hk2sz：7/26 香港玩一天，晚上去深圳 ===
  if (hkPlan === "hk2sz") {
    days.push({
      date: "7/26",
      weekday: "日",
      location: C.locations.hkToSz,
      activities: C.hk2szDay26,
    });
  }

  // === 去汕头那天 ===
  const travelDateNum = hkDays === 2 ? 27 : 26;
  const fromSz = hkPlan !== "hk1"; // sz1 / hk2sz 从深圳出发
  days.push({
    date: `7/${travelDateNum}`,
    weekday: WD[travelDateNum],
    location: fromSz ? C.locations.szToShantou : C.locations.hkToShantou,
    activities: fromSz ? C.toShantouFromSz : C.toShantouFromHk,
  });

  // === 潮汕剩余天数 ===
  const remainingFull = chaoshanDays - 1; // 去掉去汕头那天
  const startDateNum = travelDateNum + 1;

  for (let i = 0; i < remainingFull; i++) {
    const dateNum = startDateNum + i;
    const weekday = WD[dateNum] || "?";
    const isLast = i === remainingFull - 1;
    const isSecondToLast = i === remainingFull - 2;
    const jyExpanded = visitJy && remainingFull >= 3;

    if (isLast) {
      let activities, location;
      if (visitJy && jyExpanded) {
        activities = C.lastDayJyExpanded;
        location = C.locations.lastJyExpanded;
      } else if (visitJy) {
        activities = C.lastDayVisitJy;
        location = C.locations.lastVisitJy;
      } else {
        activities = C.lastDayDirect;
        location = C.locations.lastDirect;
      }
      days.push({ date: `7/${dateNum}`, weekday, location, activities });
    } else if (isSecondToLast && jyExpanded) {
      days.push({
        date: `7/${dateNum}`,
        weekday,
        location: C.locations.shantouToJieyang,
        activities: C.shantouToJieyang,
      });
    } else {
      days.push({
        date: `7/${dateNum}`,
        weekday,
        location: C.locations.shantouFull,
        activities: C.shantouFullDay,
      });
    }
  }

  return days;
}

// 顶部提示条
export function buildWarnings({ totalDays, hkPlan }) {
  const hkDays = hkPlan === "hk2sz" ? 2 : 1;
  const chaoshanDays = totalDays - hkDays;
  const warnings = [];
  if (hkPlan === "hk2sz") warnings.push(C.warnings.hk2sz);
  if (hkPlan === "sz1") warnings.push(C.warnings.sz1);
  if (hkPlan === "hk1") warnings.push(C.warnings.hk1);
  if (chaoshanDays <= 1) warnings.push(C.warnings.chaoshanTight);
  return warnings;
}
