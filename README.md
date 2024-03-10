![Tlon logo](/public/icon.svg)

# Tlon

A network-native social computer doesn’t exist. Unless?

## Up and running

Monorepo contains both the website and the CMS. Each has their own respective `package.json` configs ([sanity](/sanity/package.json), [website](/package.json)). The root `/package.json` has also been updated with the following `npm` scripts for Sanity:

| Command                     | Action                                           |
| :-------------------------- | :----------------------------------------------- |
| `npm run sanity:install`    | Installs dependencies for Sanity                 |
| `npm run dev:sanity`        | Starts Sanity dev server at `localhost:3333`     |
| `npm run dev:sanity:deploy` | Deploys Sanity Studio on a `*.sanity.studio` URL |

## .env config

- Supports the following formats:

  - `.env` and `.env.production` - Publically available variables stored within this repo.
  - `.env.development` - To be used locally. Must be created on your own machine.
  - [More info here](https://docs.astro.build/en/guides/environment-variables).

- Current default [`.env`](/.env) values:
  - `siteName` - OpenGraph information.
  - `siteURL` - OpenGraph information.
  - `mailchimpSignup` - `POST` method for newsletter signups.
  - `postsPerPage` - Controls number of posts before paginated on homepage, author pages, and tag pages.

## Manual values

- Sanity `projectId` is managed directly within [`sanity.config.ts`](/sanity/sanity.config.ts) and [`astro.config.mjs`](/astro.config.mjs).
