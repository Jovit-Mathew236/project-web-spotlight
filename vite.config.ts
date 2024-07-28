import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2015",
    rollupOptions: {
      output: {
        format: "iife",
        entryFileNames: "bundle.js",
        chunkFileNames: "[name].js",
        assetFileNames: "[name].[ext]",
        manualChunks: undefined,
      },
    },
    cssCodeSplit: false,
    assetsInlineLimit: 0,
    minify: "terser",
    terserOptions: {
      compress: { drop_console: true, drop_debugger: true },
    },
  },
});
