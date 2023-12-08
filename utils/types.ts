export interface IReview {
  id: string;
  rating: number;
  creator: {
    first_name: string;
    last_name: string;
    avatar: string;
    email: string;
  };
  product: string;
  review: string;
  createdAt: string;
  updatedAt: string;
  image: string;
}

export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  countInStock: number;
  creator: string;
  rating: number;
  reviews: IReview[];
  tags: string[];
  colors: Array<{
    name: string;
    hex: string;
  }>;
  sizes: Array<{
    name: string;
    abbreviation: string;
  }>;
  features: Array<{
    name: string;
    description: string;
  }>;
  createdAt: string;
  updatedAt: string;
}
