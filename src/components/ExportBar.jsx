import { useState } from "react";
import { COLORS, sansStack } from "../theme.js";
import { useAnnotations } from "../annotations/AnnotationContext.jsx";

// 固定在底部：把所有批注汇总成带定位的文本，一键复制，粘贴给 Claude。
export default function ExportBar() {
  const { annos, clearAll } = useAnnotations();
  const [copied, setCopied] = useState(false);
  const entries = Object.values(annos).filter((a) => a.text);

  if (entries.length === 0) return null;

  const handleCopy = async () => {
    const txt =
      `📋 行程批注（共 ${entries.length} 条）\n\n` +
      entries.map((e) => `【${e.label}】${e.text}`).join("\n");
    try {
      await navigator.clipboard.writeText(txt);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.prompt("复制下面的批注发给 Claude：", txt);
    }
  };

  return (
    <div
      style={{
        position: "sticky",
        bottom: 0,
        zIndex: 20,
        display: "flex",
        gap: 8,
        padding: "10px 12px",
        background: "rgba(253,246,236,0.95)",
        backdropFilter: "blur(6px)",
        borderTop: `1px solid ${COLORS.border}`,
      }}
    >
      <button
        onClick={handleCopy}
        style={{
          flex: 1,
          border: "none",
          borderRadius: 9,
          padding: "11px 14px",
          background: COLORS.accent,
          color: "#fff",
          fontFamily: sansStack,
          fontSize: 14,
          fontWeight: 600,
          cursor: "pointer",
        }}
      >
        {copied
          ? "✓ 已复制，粘贴给 Claude 即可"
          : `📋 复制全部批注（${entries.length} 条）发给 Claude`}
      </button>
      <button
        onClick={() => {
          if (window.confirm("清空所有批注？")) clearAll();
        }}
        title="清空批注"
        style={{
          border: `1px solid ${COLORS.border}`,
          borderRadius: 9,
          padding: "11px 12px",
          background: COLORS.card,
          color: COLORS.textLight,
          fontFamily: sansStack,
          fontSize: 13,
          cursor: "pointer",
        }}
      >
        🗑️
      </button>
    </div>
  );
}
