import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath } from "node:url";

const raiz = (p: string) => fileURLToPath(new URL(p, import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: [
      { find: "@/lib/utils", replacement: raiz("./src/visual/utils.ts") },
      { find: "@/components", replacement: raiz("./src/visual") },
      { find: "@", replacement: raiz("./src") },
    ],
  },
  build: { outDir: "dist", emptyOutDir: true, sourcemap: false },
});
