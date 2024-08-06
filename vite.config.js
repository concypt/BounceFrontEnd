import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "https://bounce.extrasol.co.uk",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
