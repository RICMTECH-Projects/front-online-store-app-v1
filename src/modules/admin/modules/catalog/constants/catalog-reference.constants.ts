import type {
	AdminBrand,
	AdminCategory,
} from "../interfaces/catalog-reference.interface";
import type { CatalogReferenceFormValues } from "../schemas/catalog-reference.schema";

export const EMPTY_CATALOG_REFERENCES: (AdminBrand | AdminCategory)[] = [];

export const DEFAULT_CATALOG_REFERENCE_FORM: CatalogReferenceFormValues = {
	name: "",
	slug: "",
	active: true,
	parentId: "",
};
