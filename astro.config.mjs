import { defineConfig } from "astro/config";
import { SITE_CONFIG } from "./site.config.mjs";

export default defineConfig({
  site: SITE_CONFIG.siteUrl,
  output: "static",
});
