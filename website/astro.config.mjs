import { defineConfig } from "astro/config";
import { sanityIntegration } from "@sanity/astro";

import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

import globals from "./src/utils/globals";

// https://astro.build/config
export default defineConfig({
  site: globals.siteURL,
  integrations: [
    sanityIntegration({
      projectId: globals.sanityProjectId,
      dataset: globals.sanityDataset,
      useCdn: false,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
