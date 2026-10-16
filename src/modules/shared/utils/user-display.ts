export function userInitial(name: string) {
	return name.trim().charAt(0).toUpperCase();
}

export function userFullName(firstName: string, lastName: string) {
	return `${firstName} ${lastName}`.trim();
}
