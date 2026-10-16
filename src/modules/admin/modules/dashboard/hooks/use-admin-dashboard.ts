import { useQuery } from "@tanstack/react-query";
import { BadgePercent, Boxes, Store, UsersRound } from "lucide-react";
import { adminApi } from "@/modules/admin/services/admin-api.service";

export function useAdminDashboard() {
	const productsQuery = useQuery({
		queryKey: ["admin", "products"],
		queryFn: () => adminApi.products.list(),
	});
	const sellersQuery = useQuery({
		queryKey: ["admin", "sellers"],
		queryFn: adminApi.sellers.list,
	});
	const usersQuery = useQuery({
		queryKey: ["admin", "users"],
		queryFn: adminApi.users.list,
	});
	const couponsQuery = useQuery({
		queryKey: ["admin", "coupons"],
		queryFn: adminApi.coupons.list,
	});
	const cards = [
		{
			label: "Productos activos",
			value: productsQuery.data?.length,
			href: "/productos",
			icon: Boxes,
			query: productsQuery,
		},
		{
			label: "Comercios activos",
			value: sellersQuery.data?.filter((seller) => seller.status === "ACTIVE")
				.length,
			href: "/vendedores",
			icon: Store,
			query: sellersQuery,
		},
		{
			label: "Usuarios",
			value: usersQuery.data?.length,
			href: "/usuarios",
			icon: UsersRound,
			query: usersQuery,
		},
		{
			label: "Cupones activos",
			value: couponsQuery.data?.filter((coupon) => coupon.active).length,
			href: "/cupones",
			icon: BadgePercent,
			query: couponsQuery,
		},
	];
	const busy = cards.some(({ query }) => query.isLoading);
	const failed = cards.some(({ query }) => query.isError);
	const retry = () => cards.forEach(({ query }) => void query.refetch());
	return { cards, busy, failed, retry };
}
