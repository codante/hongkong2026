import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

const globalStyle = document.createElement("style");
globalStyle.textContent = `
  * { box-sizing: border-box; }
  html, body, #root { margin: 0; padding: 0; min-height: 100%; }
  body { -webkit-font-smoothing: antialiased; background: #0E1217; }
  ::selection { background: rgba(87,201,154,.3); }
  .ms {
    font-family: 'Material Symbols Rounded';
    font-weight: 300;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    font-variation-settings: 'opsz' 24, 'wght' 300, 'FILL' 0, 'GRAD' 0;
  }
`;
document.head.appendChild(globalStyle);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
