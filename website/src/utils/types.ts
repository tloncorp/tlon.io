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
  dimensions: dimensionsObj;
}

interface dimensionsObj {
  height: number;
  width: number;
  aspectRatio: number;
}

interface AssetReference {
  _type: string;
  _ref: string;
}
