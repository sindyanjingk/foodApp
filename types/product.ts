export type ProductImage = {
    id: string;
    url: string;
    productId: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
};

export type TProduct = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    sellerName: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    images: ProductImage;
};

export type TCartItems = {
    cartId: string,
    createdAt: string,
    id: string,
    product: TProduct,
    productId: string,
    quantity: number,
    updatedAt: string
}