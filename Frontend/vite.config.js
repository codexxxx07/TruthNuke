import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    // The Tailwind CLI truncates output.css before rewriting it. Without this,
    // Vite can pick up (and cache) the empty file mid-write and styles vanish.
    watch: {
      awaitWriteFinish: {
        stabilityThreshold: 200,
        pollInterval: 50,
      },
    },
  },
});
