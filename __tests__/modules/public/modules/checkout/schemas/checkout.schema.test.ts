import { describe, expect, it } from "vitest";
import {
	checkoutSchema,
	parseCouponCodes,
} from "@/modules/public/modules/checkout/schemas/checkout.schema";

describe("checkout input", () => {
	it("coerces a positive address ID from an HTML form", () => {
		expect(
			checkoutSchema.parse({ shippingAddressId: "27", couponText: "" })
				.shippingAddressId,
		).toBe(27);
	});

	it.each(["", "0", "-2", "not-an-id"])(
		"rejects invalid address ID %s",
		(shippingAddressId) => {
			expect(checkoutSchema.safeParse({ shippingAddressId }).success).toBe(
				false,
			);
		},
	);

	it("trims coupon codes and drops blank entries", () => {
		expect(parseCouponCodes(" SAVE10, , FREESHIP  ")).toEqual([
			"SAVE10",
			"FREESHIP",
		]);
	});
});
