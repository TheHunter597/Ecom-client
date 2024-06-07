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
export interface PreviewProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  countInStock: number;
  creator: {
    id: string;
  };
  tags: string[];
  colors: Array<{
    name: string;
    hex: string;
    id: string;
  }>;
  sizes: Array<{
    name: string;
    abbreviation: string;
    id: string;
  }>;
  features: Array<{
    name: string;
    description: string;
  }>;
  createdAt: string;
  updatedAt: string;
  discount: number;
}

export interface IOrder {
  id: string;
  product: {
    id: string;
    title: string;
    price: string;
    image: string;
    countInStock: string;
  };
  user: {
    id: string;
    email: string;
    new: false;
    active: false;
  };
  size: string;
  color: string;
  createdAt: string;
  quantity: string;
}
export interface IProduct {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  countInStock: number;
  creator: {
    id: string;
  };
  rating: number;
  reviews: IReview[];
  tags: string[];
  colors: Array<{
    name: string;
    hex: string;
    id: string;
  }>;
  sizes: Array<{
    name: string;
    abbreviation: string;
    id: string;
  }>;
  features: Array<{
    name: string;
    description: string;
  }>;
  createdAt: string;
  updatedAt: string;
  discount: number;
}

export interface FirstProductSectionProps {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  countInStock: number;

  rating?: number;
  reviews?: IReview[];
  tags: string[];
  colors: Array<{
    name: string;
    hex: string;
    id?: string;
  }>;
  sizes: Array<{
    name: string;
    abbreviation: string;
    id?: string;
  }>;
  features: Array<{
    name: string;
    description: string;
  }>;
  createdAt: string;
  updatedAt: string;
  discount: number;
}

export interface CartProductData {
  title: string;
  image: string;
  price: number;
}

export interface ICartItem {
  id: string;
  cartId: string;
  productId: string;
  product: CartProductData;
  quantity: number;
  size: {
    name: string;
    abbreviation: string;
  };
  color: {
    name: string;
    hex: string;
  };
}

export interface ICategory {
  _id: string;
  name: string;
  image: string;
}

export interface IFetchedUserData {
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  is_superuser: boolean;
  is_staff: boolean;
  city: string;
  state: string;
  country: string;
  interests: string[];
  avatar: string;
  is_active: boolean;
  account_confirmed: boolean;
  id: string;
  phone_number: string;
  zip_code: string;
}
