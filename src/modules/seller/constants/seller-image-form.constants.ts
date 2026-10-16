import type { z } from "zod";
import type { sellerImageSchema } from "../schemas/seller-image.schema";

export const SELLER_IMAGE_FORM_DEFAULTS: z.input<typeof sellerImageSchema> = {
	url: "",
	altText: "",
};
