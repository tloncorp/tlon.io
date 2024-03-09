import { defineConfig } from "astro/config";
import { sanityIntegration } from "@sanity/astro";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  site: import.meta.env.siteURL,
  prefetch: true,
  integrations: [
    sanityIntegration({
      projectId: "4vy6phvk",
      dataset: "production",
      useCdn: false,
    }),
    tailwind({
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
