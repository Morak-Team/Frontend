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
        name: "My PWA App",
        short_name: "PWAApp",
        description: "React + Vite 기반 PWA",
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
    }),
  ],
  server: {
    open: true,
    host: true,
    // proxy: {
    //   "/api": {
    //     target: "https://api.morak.site",
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, ""),
    //   },
    // },
    allowedHosts: [".ngrok-free.app"],
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
