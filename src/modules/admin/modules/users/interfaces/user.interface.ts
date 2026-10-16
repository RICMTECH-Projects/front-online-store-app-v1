export type AdminUser = {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
	status: string;
	roles: string[];
};

export type UserCreateRequest = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	status: "ACTIVE" | "INACTIVE";
	roleCodes: string[];
};

export type UserUpdateRequest = Pick<
	UserCreateRequest,
	"firstName" | "lastName" | "status"
>;
