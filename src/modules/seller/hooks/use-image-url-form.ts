"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { SELLER_IMAGE_FORM_DEFAULTS } from "../constants/seller-image-form.constants";
import { sellerImageSchema } from "../schemas/seller-image.schema";

type OnAdd = (
	body: { url: string; altText?: string; position: number; primary: boolean },
	onSuccess: () => void,
) => void;

export function useImageUrlForm(onAdd: OnAdd) {
	const form = useForm<
		z.input<typeof sellerImageSchema>,
		undefined,
		z.output<typeof sellerImageSchema>
	>({
		resolver: zodResolver(sellerImageSchema),
		defaultValues: SELLER_IMAGE_FORM_DEFAULTS,
	});
	const submit = form.handleSubmit(({ url, altText }) =>
		onAdd(
			{ url, altText: altText || undefined, position: 0, primary: false },
			() => form.reset(),
		),
	);
	return { form, submit };
}
