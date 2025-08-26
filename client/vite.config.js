import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Proxy all requests starting with /author-api to your backend
      "/author-api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
      // If you have other API routes, add them here too
      "/user-api": {
        target: "http://localhost:3000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
