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
