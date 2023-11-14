import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from "vite";
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return defineConfig({
    server: {
      port: 8080,
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          secure: false,
        }
      }
    },
    define: {
      "process.env": env,
    },
    plugins: [
      vue(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
  });
};
