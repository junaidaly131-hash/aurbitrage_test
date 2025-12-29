/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import path from "path";
import dotenv from "dotenv";

// https://vitejs.dev/config/
export default defineConfig(() => {
  dotenv.config();
  return {
    define: {
      "process.env": process.env,
    },
    plugins: [
      // react(),
      react({
        jsxImportSource: "@emotion/react",
        babel: {
          plugins: ["@emotion/babel-plugin"],
        },
      }),
      // eslintPlugin({
      //   cache: false,
      //   include: ['./src/**/*.js', './src/**/*.jsx'],
      //   exclude: []
      // }),
    ],
    optimizeDeps: {
      include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"],
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "/\\.js$/": ".jsx",
      },
    },
    server: {
      port: 5173,
      strictPort: true,
      proxy: {
        "/api": {
          target: process.env.API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
        "/dashboard/api": {
          target: process.env.API_BASE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/dashboard/, ""),
        },
        "/socket.io/": {
          target: process.env.API_BASE_URL,
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
    },
  };
});
