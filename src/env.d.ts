/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
/// <reference types="@sanity/astro/module" />

interface ImportMetaEnv {
  readonly siteName: string;
  readonly siteUrl: string;
  readonly PUBLIC_MAILCHIMP_SIGNUP: string;
  readonly postsPerPage: number;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
