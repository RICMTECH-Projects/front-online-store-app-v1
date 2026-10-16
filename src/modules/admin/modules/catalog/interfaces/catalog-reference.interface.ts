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
export type CatalogReference = AdminBrand | AdminCategory;
