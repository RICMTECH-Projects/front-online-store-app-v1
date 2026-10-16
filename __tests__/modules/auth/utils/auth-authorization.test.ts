import { describe, expect, it } from "vitest";
import {
	canAccessAdminRoute,
	getRoleHomeRoute,
	isGuestOnlyRoute,
} from "@/modules/auth/utils/auth-authorization";

describe("auth authorization rules", () => {
	it("prefers admin home when account has multiple roles", () => {
		expect(getRoleHomeRoute(["CUSTOMER", "SELLER", "ADMIN"])).toBe(
			"/dashboard",
		);
		expect(getRoleHomeRoute(["CUSTOMER", "SELLER"])).toBe("/vendedor");
	});

	it("limits administration routes to ADMIN", () => {
		expect(canAccessAdminRoute("/fulfillment", ["ADMIN"])).toBe(true);
		expect(canAccessAdminRoute("/fulfillment/81", ["SELLER"])).toBe(false);
		expect(canAccessAdminRoute("/fulfillment-evil", ["ADMIN"])).toBe(false);
	});

	it("classifies guest-only routes by exact or nested path", () => {
		expect(isGuestOnlyRoute("/login")).toBe(true);
		expect(isGuestOnlyRoute("/registro/confirmar")).toBe(true);
		expect(isGuestOnlyRoute("/login-ayuda")).toBe(false);
	});
});
