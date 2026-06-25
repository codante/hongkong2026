import { createContext, useContext, useState, useCallback } from "react";

// 批注全部存在浏览器本地（localStorage），做功课时慢慢积累不丢。
// 结构：{ [annoKey]: { label, text } }
const STORAGE_KEY = "hk2026:annos:v1";

const AnnotationContext = createContext(null);

function load() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch {
    return {};
  }
}

export function AnnotationProvider({ children }) {
  const [annos, setAnnos] = useState(load);

  const set = useCallback((key, label, text) => {
    setAnnos((prev) => {
      const next = { ...prev };
      const t = (text || "").trim();
      if (t) next[key] = { label, text: t };
      else delete next[key]; // 清空内容即删除该批注
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    setAnnos({});
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
  }, []);

  const get = useCallback((key) => annos[key]?.text || "", [annos]);

  return (
    <AnnotationContext.Provider value={{ annos, get, set, clearAll }}>
      {children}
    </AnnotationContext.Provider>
  );
}

export function useAnnotations() {
  return useContext(AnnotationContext);
}
