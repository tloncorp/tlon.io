export interface ImageObj {
  image: string;
  alt: string;
}

export interface AuthorObj {
  name: string;
  avatar: string;
  slug: string;
}

export interface AssetReference {
  _type: string;
  asset: assetObj;
}

interface assetObj {
  _ref: string;
  _type: string;
}
