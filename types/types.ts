import { TProduct } from "./product";

export type RootStackParamList = {
  ProductDetail: {
    name: string;
    image: string;
    price: number;
    rating: number;
    time: string;
    id: string;
  };
  CheckoutScreen: {
    cart : {
      productId : TProduct;
      quantity: number;
    }[]
  };
  AddressScreen : {
    userId : string;
  };
  Login : {
    
  }
};

export type Address = {
  id?: string
  zip?: string
  createdAt?: string
  updatedAt?: string
  userId?: string
  kabupaten?: string
  kecamatan?: string
  keterangan?: string
  kelurahan?: string
  deletedAt?: string
}

