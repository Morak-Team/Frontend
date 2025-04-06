import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  assetsInclude: ["**/*.node"],
  plugins: [react()],
  server: {
    open: true,
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
