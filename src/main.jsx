import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// 全局重置，保证页面铺满且无默认外边距
const globalStyle = document.createElement("style");
globalStyle.textContent = `
  * { box-sizing: border-box; }
  html, body, #root { margin: 0; padding: 0; min-height: 100%; }
  body { -webkit-font-smoothing: antialiased; }
`;
document.head.appendChild(globalStyle);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
