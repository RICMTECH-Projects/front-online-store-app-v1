import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface CartItem {
	productId: number;
	quantity: number;
}
type ContextKey = "guest" | `user:${number}`;
type CartState = {
	activeContext: ContextKey;
	baskets: Partial<Record<ContextKey, CartItem[]>>;
	add: (productId: number, quantity?: number) => void;
	setQuantity: (productId: number, quantity: number) => void;
	remove: (productId: number) => void;
	clear: () => void;
	useUserContext: (userId: number) => void;
	useGuestContext: (removePrivate?: boolean) => void;
};

const merge = (first: CartItem[], second: CartItem[]) => {
	const quantities = new Map<number, number>();
	for (const item of [...first, ...second])
		quantities.set(
			item.productId,
			(quantities.get(item.productId) ?? 0) + item.quantity,
		);
	return [...quantities].map(([productId, quantity]) => ({
		productId,
		quantity,
	}));
};

const activeItems = (state: CartState) =>
	state.baskets[state.activeContext] ?? [];

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			activeContext: "guest",
			baskets: {},
			add: (productId, quantity = 1) =>
				set((state) => {
					const items = activeItems(state);
					const existing = items.find((item) => item.productId === productId);
					const next = existing
						? items.map((item) =>
								item.productId === productId
									? { ...item, quantity: item.quantity + quantity }
									: item,
							)
						: [...items, { productId, quantity }];
					return { baskets: { ...state.baskets, [state.activeContext]: next } };
				}),
			setQuantity: (productId, quantity) =>
				set((state) => ({
					baskets: {
						...state.baskets,
						[state.activeContext]:
							quantity < 1
								? activeItems(state).filter(
										(item) => item.productId !== productId,
									)
								: activeItems(state).map((item) =>
										item.productId === productId ? { ...item, quantity } : item,
									),
					},
				})),
			remove: (productId) =>
				set((state) => ({
					baskets: {
						...state.baskets,
						[state.activeContext]: activeItems(state).filter(
							(item) => item.productId !== productId,
						),
					},
				})),
			clear: () =>
				set((state) => ({
					baskets: { ...state.baskets, [state.activeContext]: [] },
				})),
			useUserContext: (userId) =>
				set((state) => {
					const userContext: ContextKey = `user:${userId}`;
					const merged = merge(
						state.baskets.guest ?? [],
						state.baskets[userContext] ?? [],
					);
					const baskets = { ...state.baskets };
					delete baskets.guest;
					return {
						activeContext: userContext,
						baskets: { ...baskets, [userContext]: merged },
					};
				}),
			useGuestContext: (removePrivate = false) =>
				set((state) => {
					const baskets = { ...state.baskets };
					if (removePrivate && state.activeContext !== "guest")
						delete baskets[state.activeContext];
					return { activeContext: "guest", baskets };
				}),
		}),
		{
			name: "urbnvoid-cart-v1",
			storage: createJSONStorage(() => localStorage),
			partialize: (state) => ({ baskets: state.baskets }) as CartState,
		},
	),
);

export const selectCartItems = (state: CartState) =>
	state.baskets[state.activeContext] ?? [];
export const selectCartCount = (state: CartState) =>
	selectCartItems(state).reduce((sum, item) => sum + item.quantity, 0);
