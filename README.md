![Tlon logo](/website/public/icon.svg)

# Tlon

A network-native social computer doesn’t exist. Unless?

## Up and running

Monorepo contains both the website and the CMS. Each has their own respective `package.json` configs ([sanity](/sanity/package.json), [website](/website/package.json)). Optionally, a global [`package.json`](/package.json) has been set up to manage a subset of common scripts for convenience:

| Command                     | Action                                           |
| :-------------------------- | :----------------------------------------------- |
| `npm run postinstall`       | Installs dependencies for Sanity and Astro       |
| `npm run dev:astro`         | Starts Astro dev server at `localhost:2222`      |
| `npm run dev:astro:host`    | Spins up Astro IP address for testing            |
| `npm run dev:sanity`        | Starts Sanity dev server at `localhost:3333`     |
| `npm run dev:sanity:deploy` | Deploys Sanity Studio on a `*.sanity.studio` URL |

## .env config

- Supports the following formats:

  - `.env` and `.env.production` - Publically available variables stored within this repo.
  - `.env.development` - To be used locally. Must be created on your own machine.
  - [More info here](https://docs.astro.build/en/guides/environment-variables).

- Current default [`.env`](/website/.env) values:
  - `siteName` - OpenGraph information.
  - `siteURL` - OpenGraph information.
  - `mailchimpSignup` - `POST` method for newsletter signups.
  - `postsPerPage` - Controls number of posts before paginated on homepage, author pages, and tag pages.

## Manual values

- Sanity `projectId` is managed directly within [`sanity.config.ts`](/sanity/sanity.config.ts) and [`astro.config.mjs`](/website/astro.config.mjs).
