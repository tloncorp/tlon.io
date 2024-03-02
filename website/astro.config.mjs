import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import globals from "./src/utils/globals";

// https://astro.build/config
export default defineConfig({
  site: globals.siteURL,
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
