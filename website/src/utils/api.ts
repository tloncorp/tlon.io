import { sanityClient } from "sanity:client";

// Homepage post excerpts with author information
export async function getHomePosts() {
  const query = `*[_type == "post"] {
    "slug": slug.current,
    "featuredImage": featuredImage.image {
      "image": asset,
      alt
    },
    "author": author-> {
      name,
      "slug": slug.current,
      "avatar": image,
    },
    title,
    excerpt
  }`;
  const data = await sanityClient.fetch(query);
  return data;
}

// Tag page with all posts related to that tag
export async function getTagPage() {
  const query = `*[_type == "tag"] {
  title,
  "slug": slug.current,
  "posts": *[_type == "post" && references(^._id)] {
    title,
    "slug": slug.current
  }
}`;
  return paramMap(await sanityClient.fetch(query));
}

// Get all posts and list of related posts based on tag
export async function getPosts() {
  const query = `*[_type == "post"] | order(_createdAt desc) {
    slug,
    excerpt,
    "featuredImage": featuredImage.image {
      "image": asset,
      alt
    },
    "author": author-> {
      name,
      "avatar": image,
      "slug": slug.current,
    },
    title,
    body,
    "video": video.asset->url,
    "relatedPosts": *[_type == "post" && slug.current != ^.slug.current && count(tags[@._ref in ^.^.tags[]._ref]) > 0] | order(publishedAt desc, _createdAt desc) [0..3] {
    title,
    "slug": slug.current,
    "created": _createdAt,
    "featuredImage": featuredImage.image {
      "image": asset,
      alt
    },
    "author": author-> {
      name,
      "avatar": image,
    },
    }, 
    metaTitle,
    metaDescription
  }`;
  return paramMap(await sanityClient.fetch(query));
}

// Get all basic pages
export async function getPages() {
  const query = `*[_type == "page"] {
  slug,
  title,
  body,
}`;
  return paramMap(await sanityClient.fetch(query));
}

// Get header nav
export async function getHeaderNav() {
  const query = `*[_type == "menu" && title == "Header"][0]  {
    "links": blocks[] {
      text,
      url,
      blank,
      displayButton
    }
  }`;
  const data = await sanityClient.fetch(query);
  return data.links;
}

// Get footer nav
export async function getFooterNav() {
  const query = `*[_type == "menu" && title == "Footer"][0]  {
    "links": blocks[] {
      text,
      url,
      blank
    }
  }`;
  const data = await sanityClient.fetch(query);
  return data.links;
}

function paramMap(items: any) {
  return items.map((item: any) => {
    return {
      params: {
        slug: item.slug?.current || "",
      },
      props: { ...item },
    };
  });
}
