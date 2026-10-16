export type AdminUser = {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	status: string;
	roles: string[];
};

export type AdminRole = { id: number; code: string; name: string };
export type SellerMembership = {
	id: number;
	userId: number;
	sellerId: number;
	owner: boolean;
	active: boolean;
};
export type AdminSeller = {
	id: number;
	legalName: string;
	taxId: string;
	email: string;
	status: string;
};
export type AdminBrand = {
	id: number;
	name: string;
	slug: string;
	active: boolean;
};
export type AdminCategory = {
	id: number;
	parentId: number | null;
	name: string;
	slug: string;
	active: boolean;
};
export type AdminProductImage = {
	id: number;
	productId: number;
	url: string;
	altText: string | null;
	position: number;
	primary: boolean;
};
export type AdminProduct = {
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
	status: "DRAFT" | "ACTIVE" | "INACTIVE" | "ARCHIVED";
	images: AdminProductImage[];
};
export type AdminCoupon = {
	id: number;
	code: string;
	discountType: "FIXED" | "PERCENTAGE";
	discountValue: number;
	minOrderAmount: number | null;
	maxDiscountAmount: number | null;
	startsAt: string;
	endsAt: string;
	usageLimit: number | null;
	perUserLimit: number | null;
	usageCount: number;
	active: boolean;
	productIds: number[];
	categoryIds: number[];
	userIds: number[];
};
export type ImportRowError = { row: number; field: string; message: string };
export type ProductImportResult = {
	receivedRows: number;
	importedCount: number;
	errors: ImportRowError[];
};
