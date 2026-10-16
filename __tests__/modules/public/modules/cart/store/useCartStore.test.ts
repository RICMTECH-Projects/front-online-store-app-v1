import { beforeEach, describe, expect, it } from "vitest";
import {
	selectCartItems,
	useCartStore,
} from "@/modules/public/modules/cart/store";

describe("cart context isolation", () => {
	beforeEach(() => {
		useCartStore.setState({ activeContext: "guest", baskets: {} });
	});

	it("merges guest quantities into matching signed-in products", () => {
		useCartStore.getState().add(45, 2);
		useCartStore.getState().useUserContext(20);
		useCartStore.getState().add(45, 3);
		useCartStore.getState().useGuestContext();
		useCartStore.getState().add(45, 1);
		useCartStore.getState().useUserContext(20);

		expect(selectCartItems(useCartStore.getState())).toEqual([
			{ productId: 45, quantity: 6 },
		]);
	});

	it("keeps each user's cart separate and removes private cart on logout", () => {
		useCartStore.getState().useUserContext(20);
		useCartStore.getState().add(45, 1);
		useCartStore.getState().useUserContext(21);
		expect(selectCartItems(useCartStore.getState())).toEqual([]);

		useCartStore.getState().useUserContext(20);
		expect(selectCartItems(useCartStore.getState())).toEqual([
			{ productId: 45, quantity: 1 },
		]);
		useCartStore.getState().useGuestContext(true);
		useCartStore.getState().useUserContext(20);
		expect(selectCartItems(useCartStore.getState())).toEqual([]);
	});
});
