export const createMockRows = <TRow extends Record<string, string>>(
	prefix: string,
	values: string[][],
	columns: string[],
): TRow[] =>
	values.map(
		(value, index) =>
			Object.fromEntries([
				...columns.map((column, position) => [column, value[position] ?? "-"]),
				["id", `${prefix}-${index + 1}`],
			]) as TRow,
	);
