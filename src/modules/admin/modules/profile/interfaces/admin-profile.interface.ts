export type UpdateAdminProfileRequest = {
	firstName: string;
	lastName: string;
	status: string;
};

export type AdminProfileResponse = {
	email: string;
	firstName: string;
	id: number;
	lastName: string;
	roles: string[];
	status: string;
};
