"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateSellerProfile } from "../hooks/use-seller-portal";
import {
	type SellerProfileFormValues,
	sellerProfileSchema,
} from "../schemas/seller-profile.schema";

export function useSellerProfileForm(
	sellerId: number,
	profile: { legalName: string; taxId: string; email: string },
) {
	const mutation = useUpdateSellerProfile(sellerId);
	const form = useForm<SellerProfileFormValues>({
		resolver: zodResolver(sellerProfileSchema),
		defaultValues: {
			legalName: profile.legalName,
			taxId: profile.taxId,
			email: profile.email,
		},
	});
	useEffect(
		() =>
			form.reset({
				legalName: profile.legalName,
				taxId: profile.taxId,
				email: profile.email,
			}),
		[form, profile],
	);
	const submit = form.handleSubmit((values) => mutation.mutate(values));
	return { mutation, form, submit };
}
