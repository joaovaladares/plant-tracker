import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/plant-tracker/",
  server: {
    host: true, // expõe automaticamente na rede local (Wi-Fi)
    port: 5173,
  },
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/*.png", "icons/*.svg"],
      manifest: {
        name: "Plant Tracker",
        short_name: "Plantas",
        description: "Acompanhe a rega das suas plantas",
        theme_color: "#4a7c59",
        background_color: "#f0fdf4",
        display: "standalone",
        scope: "/plant-tracker/",
        start_url: "/plant-tracker/",
        lang: "pt-BR",
        icons: [
          { src: "icons/icon-192.png", sizes: "192x192", type: "image/png" },
          {
            src: "icons/icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "icons/icon-512-maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,json,woff,woff2}"],
      },
    }),
  ],
});
