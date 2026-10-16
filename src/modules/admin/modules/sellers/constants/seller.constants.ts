import type { z } from "zod";
import type { AdminSeller, sellerSchema } from "../index";

export type SellerForm = z.infer<typeof sellerSchema>;
export const SELLER_FORM_DEFAULTS: SellerForm = {
	legalName: "",
	taxId: "",
	email: "",
	status: "ACTIVE",
};
export const EMPTY_ADMIN_SELLERS: AdminSeller[] = [];
