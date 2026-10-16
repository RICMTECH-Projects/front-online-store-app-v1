import type { SellerProductFormValues } from "../schemas/seller-product.schema";

export const SELLER_PRODUCT_FORM_DEFAULTS: SellerProductFormValues = {
	name: "",
	sku: "",
	slug: "",
	description: "",
	price: 0,
	categoryId: "",
	brandId: "",
	imageUrl: "",
};
