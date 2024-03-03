// blockImage Sanity schema

// author Sanity schema
export interface AuthorObj {
  name: string;
  slug: string;
  image: BlockImage;
}

// blockImage Sanity schema
export interface BlockImage {
  imageRef: AssetReference;
  alt: string;
}

interface AssetReference {
  _type: string;
  _ref: string;
}
