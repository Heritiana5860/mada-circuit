import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  base: "/",
  server: {
    host: "::",
    port: 5173,
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  assetsInclude: ["**/*.JPG"],
  build: {
    rollupOptions: {
      external: (id) => {
        // Ne pas externaliser les fichiers CSS
        if (id.endsWith(".css")) {
          return false;
        }
        return false;
      },
    },
  },
  optimizeDeps: {
    include: ["leaflet"],
  },
}));
