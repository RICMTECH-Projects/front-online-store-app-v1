"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangeEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import { HttpError } from "@/modules/shared/providers/http/http.interface";
import { createProductColumns } from "../columns/products.columns";
import { PRODUCT_FORM_DEFAULTS } from "../constants/product.constants";
import {
	type AdminProduct,
	type ProductImportResult,
	useAdminProductReferences,
	useAdminProducts,
} from "../index";
import {
	type ProductFormValues,
	type ProductParsedValues,
	productImageSchema,
	productSchema,
} from "../schemas/product.schema";

export function useProductsPage() {
	const {
		productsQuery,
		createMutation,
		statusMutation,
		imageMutation,
		importMutation,
	} = useAdminProducts();
	const { sellersQuery, categoriesQuery, brandsQuery } =
		useAdminProductReferences();
	const [createdDrafts, setCreatedDrafts] = useState<AdminProduct[]>([]);
	const [showCreate, setShowCreate] = useState(false);
	const [imageFor, setImageFor] = useState<number | null>(null);
	const [knownProductId, setKnownProductId] = useState("");
	const [knownStatus, setKnownStatus] =
		useState<AdminProduct["status"]>("ACTIVE");
	const [search, setSearch] = useState("");
	const [csvResult, setCsvResult] = useState<ProductImportResult | null>(null);
	const [csvError, setCsvError] = useState("");
	const [formError, setFormError] = useState("");
	const createForm = useForm<ProductFormValues, undefined, ProductParsedValues>(
		{
			resolver: zodResolver(productSchema),
			defaultValues: PRODUCT_FORM_DEFAULTS,
		},
	);
	const imageForm = useForm<
		z.input<typeof productImageSchema>,
		undefined,
		z.output<typeof productImageSchema>
	>({
		resolver: zodResolver(productImageSchema),
		defaultValues: {
			url: "",
			altText: "",
			position: 0,
			primary: false,
		},
	});
	const rows = useMemo(() => {
		const byId = new Map<number, AdminProduct>();
		for (const item of productsQuery.data ?? []) byId.set(item.id, item);
		for (const item of createdDrafts) byId.set(item.id, item);
		return [...byId.values()].filter((item) =>
			`${item.name} ${item.sku} ${item.slug}`
				.toLowerCase()
				.includes(search.toLowerCase()),
		);
	}, [productsQuery.data, createdDrafts, search]);
	const submitProduct = createForm.handleSubmit(async (parsed) => {
		setFormError("");
		const body = {
			...parsed,
			brandId: parsed.brandId ? Number(parsed.brandId) : null,
			description: parsed.description.trim() || null,
			currency: parsed.currency.toUpperCase(),
			images: [],
		};
		try {
			const created = await createMutation.mutateAsync(body);
			setCreatedDrafts((drafts) => [
				created,
				...drafts.filter((item) => item.id !== created.id),
			]);
			setShowCreate(false);
			createForm.reset(PRODUCT_FORM_DEFAULTS);
		} catch {
			setFormError(
				"No se pudo crear el producto. Comprueba referencias, SKU y slug.",
			);
		}
	});
	const submitImage = imageForm.handleSubmit(async (values) => {
		if (imageFor === null) return;
		try {
			await imageMutation.mutateAsync({
				id: imageFor,
				body: { ...values, altText: values.altText.trim() || null },
			});
			setImageFor(null);
			imageForm.reset();
		} catch {
			setFormError("No se pudo agregar la URL de imagen.");
		}
	});
	const importCsv = async (file?: File) => {
		setCsvResult(null);
		setCsvError("");
		if (!file) return;
		if (!file.name.toLowerCase().endsWith(".csv")) {
			setCsvError("Selecciona un archivo .csv.");
			return;
		}
		try {
			const csv = await file.text();
			if (csv.length > 10_000_000) {
				setCsvError(
					"El archivo supera el límite de 10 MB indicado por el backend.",
				);
				return;
			}
			const result = await importMutation.mutateAsync(csv);
			setCsvResult(result);
		} catch (error) {
			const details = error instanceof HttpError ? error.details : undefined;
			const parsed =
				typeof details === "object" && details !== null && "details" in details
					? (details as { details?: ProductImportResult }).details
					: (details as ProductImportResult | undefined);
			if (parsed && typeof parsed === "object" && "receivedRows" in parsed)
				setCsvResult(parsed);
			else
				setCsvError(
					error instanceof Error
						? error.message
						: "No se pudo procesar el CSV. El resultado de red puede ser incierto; no lo reenvíes sin revisar catálogo.",
				);
		}
	};
	const isLoading =
		productsQuery.isLoading ||
		sellersQuery.isLoading ||
		categoriesQuery.isLoading ||
		brandsQuery.isLoading;
	const hasReferenceError =
		sellersQuery.isError || categoriesQuery.isError || brandsQuery.isError;
	const sellerOptions = (sellersQuery.data ?? [])
		.filter((item) => item.status === "ACTIVE")
		.map((item) => ({
			value: String(item.id),
			label: `${item.legalName} · #${item.id}`,
		}));
	const categoryOptions = (categoriesQuery.data ?? [])
		.filter((item) => item.active)
		.map((item) => ({
			value: String(item.id),
			label: `${item.name} · #${item.id}`,
		}));
	const brandOptions = (brandsQuery.data ?? [])
		.filter((item) => item.active)
		.map((item) => ({
			value: String(item.id),
			label: `${item.name} · #${item.id}`,
		}));
	const sellerNames = new Map(
		(sellersQuery.data ?? []).map((seller) => [seller.id, seller.legalName]),
	);
	const columns = createProductColumns({
		sellerNames,
		pending: statusMutation.isPending,
		onAddImage: (product) => {
			setImageFor(product.id);
			setFormError("");
			imageForm.reset({
				url: "",
				altText: "",
				position: product.images.length,
				primary: product.images.length === 0,
			});
		},
		onChangeStatus: activate,
	});
	function activate(product: AdminProduct) {
		const next = product.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
		if (
			next === "INACTIVE" &&
			!window.confirm(`¿Desactivar “${product.name}”?`)
		)
			return;
		statusMutation.mutate({ id: product.id, status: next });
	}
	const openCreate = () => {
		setFormError("");
		createForm.reset(PRODUCT_FORM_DEFAULTS);
		setShowCreate(true);
	};
	const canActOnKnownProduct =
		Number.isSafeInteger(Number(knownProductId)) && Number(knownProductId) > 0;
	const changeKnownStatus = () => {
		if (canActOnKnownProduct)
			statusMutation.mutate({
				id: Number(knownProductId),
				status: knownStatus,
			});
	};
	const changeKnownStatusValue = (value: string) =>
		setKnownStatus(value as AdminProduct["status"]);
	const addImageToKnownProduct = () => {
		if (!canActOnKnownProduct) return;
		setFormError("");
		setImageFor(Number(knownProductId));
		imageForm.reset({ url: "", altText: "", position: 0, primary: false });
	};
	const retry = () => {
		void productsQuery.refetch();
		void sellersQuery.refetch();
		void categoriesQuery.refetch();
		void brandsQuery.refetch();
	};
	const changeSearch = (event: ChangeEvent<HTMLInputElement>) =>
		setSearch(event.target.value);
	const changeKnownProductId = (event: ChangeEvent<HTMLInputElement>) =>
		setKnownProductId(event.target.value);
	const selectCsv = (event: ChangeEvent<HTMLInputElement>) =>
		void importCsv(event.target.files?.[0]);
	const closeCreate = () => setShowCreate(false);
	const closeImage = () => setImageFor(null);

	return {
		changeSearch,
		changeKnownProductId,
		selectCsv,
		closeCreate,
		closeImage,
		canActOnKnownProduct,
		changeKnownStatus,
		changeKnownStatusValue,
		addImageToKnownProduct,
		retry,
		sellerOptions,
		categoryOptions,
		brandOptions,
		openCreate,
		productsQuery,
		createMutation,
		statusMutation,
		imageMutation,
		importMutation,
		sellersQuery,
		categoriesQuery,
		brandsQuery,
		createdDrafts,
		showCreate,
		setShowCreate,
		imageFor,
		setImageFor,
		knownProductId,
		setKnownProductId,
		knownStatus,
		setKnownStatus,
		search,
		setSearch,
		csvResult,
		csvError,
		formError,
		setFormError,
		createForm,
		imageForm,
		rows,
		submitProduct,
		submitImage,
		importCsv,
		isLoading,
		hasReferenceError,
		sellerNames,
		columns,
	};
}
