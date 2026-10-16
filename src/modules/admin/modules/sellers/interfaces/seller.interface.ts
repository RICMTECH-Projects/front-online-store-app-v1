export type AdminSeller = {
	id: number;
	legalName: string;
	taxId: string;
	email: string;
	status: string;
};

export type SellerWriteRequest = Omit<AdminSeller, "id">;
