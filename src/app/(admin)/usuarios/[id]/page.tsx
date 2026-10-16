import { UserDetailPage } from "@/modules/admin/modules/users/components/UserDetailPage";

export default async function UserDetailRoute({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const userId = Number(id);
	if (!Number.isInteger(userId) || userId < 1)
		return (
			<main className="mx-auto max-w-4xl px-4 py-8">
				ID de usuario inválido.
			</main>
		);
	return <UserDetailPage userId={userId} />;
}
