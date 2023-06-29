export interface ProductType {
  productId: number;
  categoryId: number;
  title: string;
  createdAt: string;
  town: { townId: number; name: string };
  status: number;
  price: number;
  countInfo: { chatCount: number; likeCount: number };
  imgUrl: string;
}

export interface LikeProductsType {
  products: ProductType[];
  categoryIds: number[];
}

export interface SaleHistoryProductsType {
  products: ProductType[];
}

export interface APIDefaultResponseType<T> {
  success: boolean;
  status: number;
  code: number;
  data: T;
}

export interface DetailProductType {
  isMine: boolean;
  seller: {
    name: string;
    memberId: number;
  };
  status: number;
  title: string;
  content: string;
  createdAt: string;
  category: {
    categoryId: number;
    name: string;
  };
  price: number;
  countInfo: {
    chatCount: number;
    likeCount: number;
    viewCount: number;
  };
  isLiked: boolean;
  imgUrls: string[];
  chatId: object;
}
