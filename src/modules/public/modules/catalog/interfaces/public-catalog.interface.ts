export interface PublicProductImage {
	id: number;
	productId: number;
	url: string;
	altText: string | null;
	position: number;
	primary: boolean;
}
export interface PublicProduct {
	id: number;
	sellerId: number;
	brandId: number | null;
	categoryId: number;
	sku: string;
	name: string;
	slug: string;
	description: string | null;
	price: number;
	currency: string;
	status: string;
	images: PublicProductImage[];
}
