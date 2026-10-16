import type { z } from "zod";
import type { customerAddressSchema } from "../schemas/customer-address.schema";

export type AddressFormInput = z.input<typeof customerAddressSchema>;
export type AddressFormValue = z.output<typeof customerAddressSchema>;

export const BLANK_ADDRESS: AddressFormInput = {
	label: "",
	recipientName: "",
	phone: "",
	line1: "",
	line2: "",
	district: "",
	city: "",
	region: "",
	countryCode: "PE",
	postalCode: "",
	defaultAddress: false,
};

export const ADDRESS_FIELDS: Array<{
	key: keyof Omit<AddressFormInput, "defaultAddress">;
	label: string;
	required?: boolean;
	maxLength: number;
}> = [
	{ key: "label", label: "Etiqueta", maxLength: 100 },
	{
		key: "recipientName",
		label: "Nombre de quien recibe",
		required: true,
		maxLength: 200,
	},
	{ key: "phone", label: "Teléfono", maxLength: 30 },
	{ key: "line1", label: "Dirección", required: true, maxLength: 200 },
	{ key: "line2", label: "Departamento, piso o referencia", maxLength: 200 },
	{ key: "district", label: "Distrito", maxLength: 100 },
	{ key: "city", label: "Ciudad", required: true, maxLength: 100 },
	{ key: "region", label: "Región", maxLength: 100 },
	{
		key: "countryCode",
		label: "País (código de 2 letras)",
		required: true,
		maxLength: 2,
	},
	{ key: "postalCode", label: "Código postal", maxLength: 20 },
];
