// 构建时生成 public/plan.md —— 页面是 JS 渲染的 SPA，爬虫/AI 抓不到内容，
// 这份纯 Markdown 快照给它们看：https://codante.github.io/hongkong2026/plan.md
// 数据直接复用 src/ 的模块，跑 npm run build 自动重新生成，不会跟页面脱节。
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import { buildItinerary } from "../src/lib/itinerary.js";
import { buildLegs, buildStays } from "../src/lib/plan.js";
import { stayInfo } from "../src/data/accommodation.js";
import { legs as legData } from "../src/data/transport.js";
import { foods } from "../src/data/foods.js";

// 与 App.jsx 保持一致的已定方案
const OPTS = { totalDays: 5, hkPlan: "hk2sz", outbound: "sleeper", visitJy: true };

const itinerary = buildItinerary(OPTS);
const stays = buildStays(OPTS);

const lines = [];
const push = (s = "") => lines.push(s);

push("# 香港 × 潮汕 行程（已定稿）");
push();
push("> 本文件由构建脚本自动生成，与网页版同步。网页版：https://codante.github.io/hongkong2026/");
push(">");
push("> 5天 · 7/24（五）晚出发 · 高铁动卧 · 香港2天 → 深圳1晚 → 汕头 · 7/29 返京。");
push("> 唯一未定项：最后一天是否顺路去揭阳觅食（下文按「去」生成；不去则最后一天直接汕头逛+去机场）。");
push();

push("## 每日行程");
push();
for (const day of itinerary) {
  push(`### ${day.date}（${day.weekday}）｜${day.location}`);
  push();
  for (const a of day.activities) {
    push(`- **${a.time}** ${a.desc}${a.highlight ? "　⭐" : ""}`);
  }
  push();
}

push("## 跨城交通（已定班次）");
push();
for (const leg of buildLegs(OPTS)) {
  push(`### ${leg.label}｜${leg.mode}`);
  push();
  push(`- 班次：${leg.carrier}`);
  push(`- 时长：${leg.duration}｜参考价：${leg.price}`);
  if (leg.note) push(`- 备注：${leg.note}`);
  push();
}

push("## 住宿（已预订）");
push();
for (const s of stays) {
  const info = stayInfo[s.key];
  if (!info) continue;
  push(`### ${info.city} · ${info.area} · ${s.nights}晚`);
  push();
  push(`- 选点理由：${info.reason}`);
  for (const opt of info.options) {
    push(`- ${opt.name}（${opt.price}）— ${opt.note}`);
  }
  push();
}

push("## 潮汕美食清单");
push();
for (const f of foods) {
  push(`- ${f.emoji} **${f.name}**（${f.priority}）— ${f.note}`);
}
push();

push("## 台风红霞应对预案（2026-07-24 制定）");
push();
push("- 7/25 六 🟡：戏照看（八号风球才取消，留意主办方公告）；晚上风雨渐大，维港夜景改室内觅食");
push("- 7/26 日 🔴：红霞凌晨在惠来～汕头一带登陆——别提前去汕头！香港走室内动线，看风球脸色过深圳；高铁停就走东铁→罗湖口岸（八达通直接刷）");
push("- 7/27 一 🔴：早班 C7220 有停运风险，停运 12306 自动全退、改当天下午班次；红霞下午已远去韶关方向");
push("- 7/28+ 🟢：台风过境后放晴，汕头躺吃 + 7/29 返京航班基本不受影响");
push("- 已预购：7/26 下午西九龙→深圳北两班备选 + 7/27 早 C7220（停运均自动全退）");
push();
push("---");
push();
push(`核心锚点：7/25（六）15:00 JCS《万世巨星》下午场 @ 香港文化中心大剧院（约 2h）。`);
push();

const outDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "plan.md"), lines.join("\n"), "utf8");
console.log(`✓ public/plan.md 已生成（${itinerary.length} 天）`);
