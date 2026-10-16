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

export type ImportRowError = { row: number; field: string; message: string };
export type ProductImportResult = {
	receivedRows: number;
	importedCount: number;
	errors: ImportRowError[];
};
