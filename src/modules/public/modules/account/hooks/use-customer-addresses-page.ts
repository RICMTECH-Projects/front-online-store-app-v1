"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
	useCustomerAddresses,
	useDeleteCustomerAddress,
	useSaveCustomerAddress,
} from "../../customer/hooks/use-customer-commerce";
import type {
	CustomerAddress,
	CustomerAddressRequest,
} from "../../customer/interfaces/customer-commerce.interface";
import {
	type AddressFormInput,
	type AddressFormValue,
	BLANK_ADDRESS,
} from "../constants/address-form.constants";
import { customerAddressSchema } from "../schemas/customer-address.schema";

export function useCustomerAddressesPage() {
	const addresses = useCustomerAddresses();
	const save = useSaveCustomerAddress();
	const remove = useDeleteCustomerAddress();
	const [editing, setEditing] = useState<CustomerAddress | null>(null);
	const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
	const form = useForm<AddressFormInput, undefined, AddressFormValue>({
		resolver: zodResolver(customerAddressSchema),
		defaultValues: BLANK_ADDRESS,
	});
	const startEdit = (address: CustomerAddress) => {
		setEditing(address);
		form.reset({
			label: address.label ?? "",
			recipientName: address.recipientName,
			phone: address.phone ?? "",
			line1: address.line1,
			line2: address.line2 ?? "",
			district: address.district ?? "",
			city: address.city,
			region: address.region ?? "",
			countryCode: address.countryCode,
			postalCode: address.postalCode ?? "",
			defaultAddress: address.defaultAddress,
		});
	};
	const startCreate = () => {
		setEditing(null);
		form.reset(BLANK_ADDRESS);
	};
	const submit = form.handleSubmit((values) => {
		const body: CustomerAddressRequest =
			values satisfies CustomerAddressRequest;
		save.mutate(
			{ id: editing?.id, body },
			{
				onSuccess: () => {
					startCreate();
				},
			},
		);
	});
	const retry = () => void addresses.refetch();
	const askDelete = (id: number) => setConfirmDelete(id);
	const cancelDelete = () => setConfirmDelete(null);
	const confirmRemove = (id: number) =>
		remove.mutate(id, { onSuccess: cancelDelete });
	const addressRows = (addresses.data ?? []).map((address) => ({
		...address,
		recipientLabel: `${address.recipientName}${address.phone ? ` · ${address.phone}` : ""}`,
		locationLabel: [
			address.line1,
			address.line2,
			address.district,
			address.city,
			address.region,
			address.countryCode,
			address.postalCode,
		]
			.filter(Boolean)
			.join(", "),
	}));
	return {
		addresses,
		addressRows,
		save,
		remove,
		editing,
		confirmDelete,
		form,
		startEdit,
		startCreate,
		submit,
		retry,
		askDelete,
		cancelDelete,
		confirmRemove,
	};
}
