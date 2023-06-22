export interface ProductType {
  productId: number;
  categoryId: number;
  title: string;
  createdAt: string;
  town: { townId: number; name: string };
  status: string; // TODO: API 협의 후 number로 변경
  price: number;
  countInfo: { chatCount: number; likeCount: number };
  imgUrl: string;
}

export interface LikeProductsType {
  products: ProductType[];
  categoryIds: number[];
}

export interface APIDefaultResponseType {
  success: boolean;
  status: number;
  code: number;
  data: any;
}
