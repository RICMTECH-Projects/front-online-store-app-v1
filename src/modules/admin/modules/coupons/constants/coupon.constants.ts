import type { AdminCoupon } from "../index";
import type { CouponFormValues } from "../schemas/coupon.schema";

export const COUPON_FORM_DEFAULTS: CouponFormValues = {
	code: "",
	discountType: "PERCENTAGE",
	discountValue: 10,
	minOrderAmount: "",
	maxDiscountAmount: "",
	startsAt: "",
	endsAt: "",
	usageLimit: "",
	perUserLimit: "",
	productIds: "",
	categoryIds: "",
	userIds: "",
};
export const EMPTY_ADMIN_COUPONS: AdminCoupon[] = [];

export const DISCOUNT_TYPE_OPTIONS = [
	{ value: "PERCENTAGE", label: "Porcentaje" },
	{ value: "FIXED", label: "Importe fijo (PEN)" },
];
