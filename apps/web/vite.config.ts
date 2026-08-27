import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import Icons from "unplugin-icons/vite";
import path from "node:path";

export default defineConfig(({ mode }) => {
  // Loads `.env`, `.env.local`, `.env.[mode]`, etc. from apps/web
  const env = loadEnv(mode, __dirname, "VITE_");

  return {
    envDir: __dirname,
    envPrefix: "VITE_",
    plugins: [
      react(),
      tailwindcss(),
      // Compiles only the icons we import — never ships the full set.
      Icons({
        compiler: "jsx",
        jsx: "react",
        scale: 1,
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      dedupe: ["react", "react-dom"],
    },
    define: {
      __CARTO_API_KEY__: JSON.stringify(env.VITE_CARTO_API_KEY ?? ""),
    },
    server: {
      port: 3000,
      strictPort: true,
      fs: {
        allow: [path.resolve(__dirname, "../..")],
      },
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
  };
});
