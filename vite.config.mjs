import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3256,
    host: "::",
    origin: "https://customer.sareh-nomow.xyz",
    allowedHosts: true
  },
});
