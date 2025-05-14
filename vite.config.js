import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  assetsInclude: ["**/*.node"],
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt", "apple-touch-icon.png"],
      manifest: {
        name: "Morak",
        short_name: "Morak",
        description: "Morak",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024, // 5MB까지 허용
      },
    }),
  ],
  server: {
    open: true,
    host: true,
    proxy: {
      "/api": {
        target: "https://api.morak.site",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
    historyApiFallback: true, // 리액트 라우터 경로 새로고침 시 index.html로 리디렉션
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
      "@components": path.resolve("./src/components"),
      "@pages": path.resolve("./src/pages"),
      "@utils": path.resolve("./src/utils"),
      "@assets": path.resolve("./src/assets"),
      "@hooks": path.resolve("./src/hooks"),
      "@constants": path.resolve("./src/constants"),
      "@apis": path.resolve("./src/apis"),
      "@routes": path.resolve("./src/routes"),
      "@styles": path.resolve("./src/styles"),
    },
  },
});
