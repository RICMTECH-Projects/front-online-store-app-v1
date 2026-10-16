"use client";

import { FormCheckbox } from "@/modules/shared/components/forms/FormCheckbox";
import { FormInput } from "@/modules/shared/components/forms/FormInput";
import type { useProductsPage } from "../hooks/use-products-page";

type Model = ReturnType<typeof useProductsPage>;
export function ProductImageDialog({ model }: { model: Model }) {
	const { imageFor, submitImage, imageForm, formError, closeImage } = model;
	return (
		<>
			{imageFor !== null && (
				<div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
					<section
						role="dialog"
						aria-modal="true"
						aria-labelledby="image-form-title"
						className="w-full max-w-lg border bg-white p-6"
					>
						<h2
							id="image-form-title"
							className="font-antonio text-xl font-semibold uppercase"
						>
							Agregar URL de imagen · Producto #{imageFor}
						</h2>
						<form onSubmit={submitImage} className="mt-5 space-y-4">
							<FormInput
								control={imageForm.control}
								name="url"
								label="URL"
								type="url"
								className="h-11"
							/>
							<FormInput
								control={imageForm.control}
								name="altText"
								label="Texto alternativo"
								maxLength={250}
								className="h-11"
							/>
							<FormInput
								control={imageForm.control}
								name="position"
								label="Posición"
								type="number"
								min="0"
								className="h-11"
							/>
							<FormCheckbox
								control={imageForm.control}
								name="primary"
								label="Imagen principal"
							/>
							{formError && (
								<p role="alert" className="text-sm text-red-700">
									{formError}
								</p>
							)}
							<div className="flex justify-end gap-3 border-t pt-4">
								<button
									type="button"
									onClick={closeImage}
									className="min-h-10 px-4 underline"
								>
									Cancelar
								</button>
								<button
									type="submit"
									disabled={imageForm.formState.isSubmitting}
									className="min-h-10 bg-zinc-950 px-5 text-sm text-white disabled:opacity-50"
								>
									Guardar URL
								</button>
							</div>
						</form>
					</section>
				</div>
			)}
		</>
	);
}
