"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
	selectCartCount,
	useCartStore,
} from "@/modules/public/modules/cart/store";

export function NavbarCartLink() {
	const count = useCartStore(selectCartCount);
	return (
		<Link
			href="/carrito"
			aria-label={`Ver bolsa${count ? `, ${count} productos` : ""}`}
			className="group relative inline-flex size-10 items-center justify-center rounded-full text-foreground/80 transition-colors hover:bg-muted/50 hover:text-foreground"
		>
			<ShoppingCart className="size-5 transition-transform group-hover:scale-110" />
			{count > 0 && (
				<span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-foreground px-1 text-[10px] font-semibold leading-5 text-background">
					{count > 99 ? "99+" : count}
				</span>
			)}
		</Link>
	);
}
