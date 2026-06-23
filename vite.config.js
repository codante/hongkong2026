import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// base: "./" 使用相对路径，部署到 GitHub Pages 子路径时资源不会 404，
// 也避免硬编码仓库名。
export default defineConfig({
  base: "./",
  plugins: [react()],
});
