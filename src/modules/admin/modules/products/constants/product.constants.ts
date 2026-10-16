import type { ProductFormValues } from "../schemas/product.schema";

export const PRODUCT_FORM_DEFAULTS: ProductFormValues = {
	sellerId: 0,
	categoryId: 0,
	brandId: "",
	sku: "",
	name: "",
	slug: "",
	description: "",
	price: 0,
	currency: "PEN",
};

export const PRODUCT_STATUS_OPTIONS = [
	"DRAFT",
	"ACTIVE",
	"INACTIVE",
	"ARCHIVED",
] as const;
export const PRODUCT_CSV_TEMPLATE =
	"data:text/csv;charset=utf-8,sellerId%2CcategoryId%2Csku%2Cname%2Cslug%2Cprice%2CbrandId%2Cdescription%2Ccurrency%2Cstatus%0A3%2C1%2CTEC-CSV-001%2CTeclado%2Cteclado-001%2C159.90%2C%2C%2CPEN%2CDRAFT";
