export function money(amount: number, currency: string): string {
	return new Intl.NumberFormat("es-PE", { style: "currency", currency }).format(
		amount,
	);
}
