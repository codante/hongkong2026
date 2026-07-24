// 🌀 台风红霞应对预案（2026-07 行程期间的临时组件，行程结束可整体删除）。
// 实时信号来自香港天文台开放 API（CORS 全开），拉取失败时优雅降级为纯静态预案。
import { useEffect, useState } from "react";
import { COLORS, fontStack, monoStack } from "../theme.js";

const HKO_API =
  "https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=tc";

const RISK_DAYS = [
  {
    date: "7/25 六",
    level: "🟡",
    color: COLORS.gold,
    text: "戏照看（八号风球才取消，留意主办方公告）；晚上风雨渐大，维港夜景改室内觅食",
  },
  {
    date: "7/26 日",
    level: "🔴",
    color: COLORS.warn,
    text: "红霞凌晨在惠来～汕头一带登陆——别提前去汕头！香港走室内动线，看风球脸色过深圳：高铁停就走东铁→罗湖口岸（八达通直接刷，不用抢票）",
  },
  {
    date: "7/27 一",
    level: "🔴",
    color: COLORS.warn,
    text: "早班 C7220 有停运风险（厦深线刚被扫过）——停运 12306 自动全退，改当天下午班次即可，红霞下午已远去韶关方向",
  },
  {
    date: "7/28+",
    level: "🟢",
    color: COLORS.accent,
    text: "台风过境后放晴，汕头躺吃 + 7/29 返京航班基本不受影响",
  },
];

const CHECKLIST = [
  "7/26 下午 西九龙→深圳北 预购 2 班（如 15:00 + 18:00 备胎），停运自动全退",
  "7/27 早 C7220 深圳北→汕头 照常预购，同样退改无损",
  "装好：香港天文台 App（盯风球）· 12306（停运公告提前一晚发）",
  "便携雨衣（台风天伞是废的）· 充电宝充满",
];

const LINKS = [
  { label: "天文台·热带气旋", url: "https://www.hko.gov.hk/tc/informtc/tcMain.htm" },
  { label: "Windy 路径", url: "https://www.windy.com/?23.5,116.5,7" },
  { label: "12306", url: "https://www.12306.cn/" },
];

export default function TyphoonBanner() {
  const [open, setOpen] = useState(false);
  const [signal, setSignal] = useState(null); // { name, updateTime } | "none" | null(加载中/失败)

  useEffect(() => {
    fetch(HKO_API)
      .then((r) => r.json())
      .then((w) => {
        const tc = w && w.WTCSGNL;
        if (tc && tc.actionCode !== "CANCEL") {
          setSignal({ name: tc.name, time: tc.updateTime || tc.issueTime });
        } else {
          setSignal("none");
        }
      })
      .catch(() => setSignal(null));
  }, []);

  const signalChip =
    signal && signal !== "none" ? (
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 700,
          color: COLORS.warn,
          background: COLORS.warnBg,
          border: `1px solid rgba(232,118,90,.35)`,
          padding: "3px 10px",
          borderRadius: 20,
          whiteSpace: "nowrap",
        }}
      >
        ● 现挂 {signal.name}
      </span>
    ) : signal === "none" ? (
      <span
        style={{
          fontSize: 11.5,
          fontWeight: 600,
          color: COLORS.accent,
          background: COLORS.accentDim,
          border: `1px solid ${COLORS.accentBorder}`,
          padding: "3px 10px",
          borderRadius: 20,
          whiteSpace: "nowrap",
        }}
      >
        ○ 港暂无风球
      </span>
    ) : null;

  return (
    <div
      style={{
        marginBottom: 14,
        background: COLORS.warnBg,
        border: `1px solid rgba(232,118,90,.28)`,
        borderRadius: 13,
        overflow: "hidden",
      }}
    >
      {/* Header：始终可见，点击展开 */}
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          width: "100%",
          padding: "13px 15px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          fontFamily: "inherit",
        }}
      >
        <span style={{ fontSize: 17, flexShrink: 0 }}>🌀</span>
        <span
          style={{
            fontFamily: fontStack,
            fontSize: 14.5,
            fontWeight: 700,
            color: COLORS.text,
            flexShrink: 0,
          }}
        >
          台风红霞 · 应对预案
        </span>
        {signalChip}
        <span
          className="ms"
          style={{
            marginLeft: "auto",
            fontSize: 20,
            color: COLORS.warn,
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform .2s",
          }}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div style={{ padding: "2px 15px 15px" }}>
          {/* 三日风险 */}
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {RISK_DAYS.map((d) => (
              <div key={d.date} style={{ display: "flex", gap: 9 }}>
                <span
                  style={{
                    fontFamily: monoStack,
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: d.color,
                    flexShrink: 0,
                    width: 62,
                    paddingTop: 2,
                  }}
                >
                  {d.date}
                </span>
                <span
                  style={{
                    fontSize: 12.5,
                    color: COLORS.textMid,
                    lineHeight: 1.6,
                  }}
                >
                  {d.level} {d.text}
                </span>
              </div>
            ))}
          </div>

          {/* 行前清单 */}
          <div
            style={{
              marginTop: 12,
              padding: "10px 12px",
              background: COLORS.cardDark,
              borderRadius: 9,
            }}
          >
            <div
              style={{
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: 2,
                color: COLORS.textDim,
                marginBottom: 7,
                fontFamily: monoStack,
              }}
            >
              CHECKLIST
            </div>
            {CHECKLIST.map((c, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 7,
                  fontSize: 12,
                  color: COLORS.textMuted,
                  lineHeight: 1.6,
                  marginBottom: i === CHECKLIST.length - 1 ? 0 : 5,
                }}
              >
                <span style={{ color: COLORS.accent, flexShrink: 0 }}>✓</span>
                <span>{c}</span>
              </div>
            ))}
          </div>

          {/* 快捷链接 */}
          <div
            style={{
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
              marginTop: 11,
            }}
          >
            {LINKS.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 4,
                  fontSize: 11.5,
                  fontWeight: 600,
                  color: COLORS.warn,
                  border: `1px solid rgba(232,118,90,.3)`,
                  padding: "4px 11px",
                  borderRadius: 20,
                  textDecoration: "none",
                }}
              >
                {l.label}
                <span className="ms" style={{ fontSize: 12 }}>
                  open_in_new
                </span>
              </a>
            ))}
          </div>

          <div
            style={{
              marginTop: 10,
              fontSize: 10.5,
              color: COLORS.textGhost,
              fontFamily: monoStack,
            }}
          >
            信号实时来自香港天文台开放数据 · 预案按 7/24 预报制定，以官方最新为准
          </div>
        </div>
      )}
    </div>
  );
}
