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

export interface APIDefaultResponseType {
  success: boolean;
  status: number;
  code: number;
  data: any;
}
