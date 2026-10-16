"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { type ChangeEvent, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { createCatalogReferenceColumns } from "../columns/catalog-reference.columns";
import {
	DEFAULT_CATALOG_REFERENCE_FORM,
	EMPTY_CATALOG_REFERENCES,
} from "../constants/catalog-reference.constants";
import type {
	AdminBrand,
	AdminCategory,
	CatalogReference,
} from "../interfaces/catalog-reference.interface";
import {
	type CatalogReferenceFormValues,
	catalogReferenceSchema,
} from "../schemas/catalog-reference.schema";
import { useCatalogReferenceDetail } from "./useCatalogReferenceDetail";
import { useCatalogReferences } from "./useCatalogReferences";

export function useCatalogReferencePage(kind: "brand" | "category") {
	const isCategory = kind === "category";
	const resource = useCatalogReferences(kind);
	const [editing, setEditing] = useState<AdminBrand | AdminCategory | null>(
		null,
	);
	const [createDialogOpen, setCreateDialogOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [formError, setFormError] = useState("");
	const form = useForm<CatalogReferenceFormValues>({
		resolver: zodResolver(catalogReferenceSchema),
		defaultValues: DEFAULT_CATALOG_REFERENCE_FORM,
	});
	const rows = resource.query.data ?? EMPTY_CATALOG_REFERENCES;
	const categories = isCategory ? (rows as AdminCategory[]) : [];
	const detailQuery = useCatalogReferenceDetail(
		kind,
		editing as CatalogReference | null,
	);
	const visibleRows = useMemo(
		() =>
			rows.filter((row) =>
				`${row.name} ${row.slug}`.toLowerCase().includes(search.toLowerCase()),
			),
		[rows, search],
	);

	useEffect(() => {
		if (!editing) return;
		const item = detailQuery.data ?? editing;
		form.reset({
			name: item.name,
			slug: item.slug,
			active: item.active,
			parentId:
				"parentId" in item && item.parentId ? String(item.parentId) : "",
		});
	}, [detailQuery.data, editing, form]);

	const close = () => {
		setEditing(null);
		setCreateDialogOpen(false);
		setFormError("");
	};
	const openCreate = () => {
		setEditing(null);
		setCreateDialogOpen(true);
		setFormError("");
		form.reset(DEFAULT_CATALOG_REFERENCE_FORM);
	};
	const submit = form.handleSubmit(async (values) => {
		setFormError("");
		const body = isCategory
			? {
					name: values.name,
					slug: values.slug,
					active: values.active,
					parentId: values.parentId ? Number(values.parentId) : null,
				}
			: { name: values.name, slug: values.slug, active: values.active };
		try {
			if (editing)
				await resource.updateMutation.mutateAsync({ id: editing.id, body });
			else await resource.createMutation.mutateAsync(body);
			close();
		} catch {
			setFormError(
				"No se pudo guardar. Revisa los datos y vuelve a intentarlo.",
			);
		}
	});
	async function deactivate(row: AdminBrand | AdminCategory) {
		if (
			!window.confirm(
				`¿Desactivar ${isCategory ? "la categoría" : "la marca"} “${row.name}”?`,
			)
		)
			return;
		try {
			await resource.deactivateMutation.mutateAsync(row.id);
		} catch {
			setFormError("No se pudo desactivar el registro.");
		}
	}
	const columns = createCatalogReferenceColumns({
		isCategory,
		categories,
		pending: resource.deactivateMutation.isPending,
		onEdit: (row) => {
			setFormError("");
			setEditing(row);
		},
		onDeactivate: (row) => void deactivate(row),
	});
	const parentCategoryOptions = categories
		.filter((item) => item.id !== editing?.id)
		.map((item) => ({
			value: String(item.id),
			label: `${item.name}${item.active ? "" : " (inactiva)"}`,
		}));
	const changeSearch = (event: ChangeEvent<HTMLInputElement>) =>
		setSearch(event.target.value);

	return {
		changeSearch,
		isCategory,
		resource,
		rows,
		categories,
		editing,
		createDialogOpen,
		search,
		setSearch,
		formError,
		form,
		detailQuery,
		visibleRows,
		columns,
		parentCategoryOptions,
		close,
		openCreate,
		submit,
		retry: () => void resource.query.refetch(),
	};
}
