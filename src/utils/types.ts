// blockImage Sanity schema

// author Sanity schema
export interface AuthorObj {
  label: string;
  slug: string;
  image: BlockImage;
}

// blockImage Sanity schema
export interface BlockImage {
  imageRef: AssetReference;
  alt: string;
  dimensions: dimensionsObj;
}

export interface BlockVideo {
  url: string;
  width: number;
  height: number;
  poster: string;
}

// HomeCard Sanity schema
export interface HomeCard {
  cardType: string;
  headline: string;
  body: string;
  bodyMinimized?: string;
  media?: {
    type?: 'photo' | 'video';
    photo?: any;
    video?: any;
  };
  button?: {
    title?: string;
    url?: string;
    openNewWindow?: boolean;
  };
}

// Paginated-type pages
// Homepage, author list of posts, tag list of posts, etc.
export interface paginatedPageObj {
  data: dataObj[];
  start: number;
  end: number;
  size: number;
  total: number;
  currentPage: number;
  lastPage: number;
  url: urlObj;
}

interface dataObj {
  excerpt: any;
  slug: string;
  featuredImage: any;
  author: any;
  title: string;
}

interface urlObj {
  current: string;
  next: string | undefined;
  prev: string | undefined;
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
