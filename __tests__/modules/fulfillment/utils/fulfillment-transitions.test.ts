import { describe, expect, it } from "vitest";
import { nextFulfillmentStatuses } from "@/modules/fulfillment/utils/fulfillment-transitions";

describe("fulfillment transition rules", () => {
	it("permits only forward transitions and early cancellation", () => {
		expect(nextFulfillmentStatuses("PENDING")).toEqual([
			"PENDING",
			"READY_TO_SHIP",
			"CANCELLED",
		]);
		expect(nextFulfillmentStatuses("READY_TO_SHIP")).toEqual([
			"READY_TO_SHIP",
			"SHIPPED",
			"CANCELLED",
		]);
		expect(nextFulfillmentStatuses("SHIPPED")).toEqual([
			"SHIPPED",
			"DELIVERED",
		]);
	});

	it("keeps terminal states closed but allows same-state metadata updates", () => {
		expect(nextFulfillmentStatuses("DELIVERED")).toEqual(["DELIVERED"]);
		expect(nextFulfillmentStatuses("CANCELLED")).toEqual(["CANCELLED"]);
	});
});
