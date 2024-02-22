> [!TIP]
> This website is built with the Astro web framework, and it's served via Vercel.

To get started developing this repository:

1. Run `npm -i`
2. Run `git lfs install`
3. Finally, run `npm run dev` to serve the site locally

Implementation notes:

1. This site is built using [Astro](https://astro.build), which is a pretty simple web framework similar to Django or Jekyll. It uses javascript as its templating language.
2. Astro is cool because you can treat it as a means to add templating/components to simple/plain `.html` pages without needing to use additional javascript libraries. This is how Astro is used in this repository.
3. Most pages in this repository are `.astro` pages. For all intents and purposes, these are just `.html` pages with [frontmatter](https://docs.astro.build/en/basics/astro-syntax/).
4. The frontmatter in `.astro` pages are key-values like you'd expect, but it also facilitates javascript to be executed for importing/templating reasons.
5. Notably, Astro frontmatter isn't used heavily/extensively in this repository. It's mainly used for importing the `Base.astro` and `Writing.astro` [layouts](https://docs.astro.build/en/basics/layouts/), which inform the structure of pages that import them.
6. This repository is ready to go in terms of working with [Astro content collections](https://docs.astro.build/en/guides/content-collections/). The blog located at `src/pages/writing` is populated with the collection of `.mdx` pages in `src/content/writing`.
7. Images, media, and other content intended to be used in `.mdx` posts in `src/pages/writing` should be placed in a directory named the same as the associated post: For example, a post named `src/pages/writing/post_name.mdx` with several images should have its image assets placed in a `src/assets/post_name` directory. Images are imported and referenced in blog posts using Astro's Image component. Read [this guide](https://docs.astro.build/en/guides/images/#images-in-astro-files) to learn more about this approach.

```
"Everybody deserves a new computer."
   /
 /\_/\    
( o.o )  
 > ^ <
```
