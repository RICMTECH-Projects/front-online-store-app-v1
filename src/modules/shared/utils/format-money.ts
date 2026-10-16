export function formatMoney(value: number, currency: string) {
	return new Intl.NumberFormat("es-PE", { style: "currency", currency }).format(
		value,
	);
}
