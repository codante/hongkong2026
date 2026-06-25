import { useState } from "react";
import { COLORS, sansStack } from "../theme.js";
import { useAnnotations } from "../annotations/AnnotationContext.jsx";

// 包裹任意"一项"，右侧加 ✏️ 批注入口，有批注时在项下方显示。
// annoKey 需稳定唯一；label 是导出时的人类可读定位。
export default function Annotatable({ annoKey, label, children }) {
  const { get, set } = useAnnotations();
  const [editing, setEditing] = useState(false);
  const text = get(annoKey);

  return (
    <div style={{ position: "relative" }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 6 }}>
        <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
        <button
          onClick={() => setEditing((e) => !e)}
          title="批注"
          style={{
            flexShrink: 0,
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontSize: 13,
            lineHeight: 1,
            padding: "2px 3px",
            opacity: text ? 1 : 0.3,
            filter: text ? "none" : "grayscale(1)",
          }}
        >
          ✏️
        </button>
      </div>
      {(text || editing) && (
        <div
          style={{
            margin: "5px 0 2px",
            padding: "6px 9px",
            background: COLORS.goldLight,
            border: `1px solid ${COLORS.gold}55`,
            borderRadius: 7,
            fontSize: 12.5,
            fontFamily: sansStack,
            color: COLORS.text,
          }}
        >
          {editing ? (
            <textarea
              autoFocus
              defaultValue={text}
              placeholder="写给 Claude 的批注…（点别处自动保存）"
              onBlur={(e) => {
                set(annoKey, label, e.target.value);
                setEditing(false);
              }}
              rows={2}
              style={{
                width: "100%",
                boxSizing: "border-box",
                border: `1px solid ${COLORS.border}`,
                borderRadius: 5,
                padding: "5px 7px",
                fontSize: 12.5,
                fontFamily: sansStack,
                color: COLORS.text,
                resize: "vertical",
                outline: "none",
              }}
            />
          ) : (
            <div
              onClick={() => setEditing(true)}
              style={{ cursor: "text", lineHeight: 1.5, whiteSpace: "pre-wrap" }}
            >
              📝 {text}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
