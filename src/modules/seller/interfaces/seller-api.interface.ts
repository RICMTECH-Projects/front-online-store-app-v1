export type SellerStatus = "ACTIVE" | "INACTIVE";
export type SellerProductStatus = "DRAFT" | "ACTIVE" | "INACTIVE" | "ARCHIVED";

export interface SellerTenant {
	sellerId: number;
	legalName: string;
	status: SellerStatus;
	owner: boolean;
}

export interface SellerProfile {
	id: number;
	legalName: string;
	taxId: string;
	email: string;
	status: SellerStatus;
}

export interface SellerProductImage {
	id: number;
	productId: number;
	url: string;
	altText: string | null;
	position: number;
	primary: boolean;
}

export interface SellerProduct {
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
	status: SellerProductStatus;
	images: SellerProductImage[];
}

export interface SellerProductPage {
	items: SellerProduct[];
	page: number;
	size: number;
	totalElements: number;
	totalPages: number;
}

export interface SellerProductRequest {
	brandId?: number | null;
	categoryId: number;
	sku: string;
	name: string;
	slug: string;
	description?: string;
	price: number;
	currency?: "PEN";
	images?: Array<{
		url: string;
		altText?: string;
		position?: number;
		primary?: boolean;
	}>;
}

export interface SellerImageRequest {
	url: string;
	altText?: string;
	position?: number;
	primary?: boolean;
}
