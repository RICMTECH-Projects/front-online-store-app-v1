export type UpdateCustomerProfileRequest = {
	firstName: string;
	lastName: string;
};

export type CustomerProfileResponse = {
	email: string;
	firstName: string;
	id: number;
	lastName: string;
	status: string;
};
