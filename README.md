![Tlon logo](/website/public/icon.svg)

# Tlon

A network-native social computer doesn’t exist. Unless?

### Up and running

Monorepo contains both the website and the CMS. Each has their own respective `package.json` configs ([sanity](/sanity/package.json), [website](/website/package.json)). However, a global [`package.json`](/package.json) has been set up to manage common scripts:

| Command                     | Action                                           |
| :-------------------------- | :----------------------------------------------- |
| `npm run postinstall`       | Installs dependencies                            |
| `npm run dev:website`       | Starts Astro dev server at `localhost:2222`      |
| `npm run dev:website:host`  | Spins up Astro IP address for testing            |
| `npm run dev:sanity`        | Starts Sanity dev server at `localhost:3333`     |
| `npm run dev:sanity:deploy` | Deploys Sanity Studio on a `*.sanity.studio` URL |

### Common variables / configs

- Sanity `projectId` can be found in [`astro.config.mjs`](/website/astro.config.mjs) and [`sanity.config.ts`](/sanity/sanity.config.ts)
- Website has various [`globals.ts`](/website/src/utils/globals.ts) for the following:
  - `siteName` - OpenGraph information.
  - `siteURL` - OpenGraph information.
  - `mailchimpSignup` - `POST` method for newsletter signups.
  - `postsPerPage` - Controls number of posts before paginated on homepage, author pages, and tag pages.
