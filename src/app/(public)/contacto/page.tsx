import Link from "next/link";
import { ContactHero } from "@/modules/public/modules/contact/components/ContactHero";

const ContactPage = () => {
	return (
		<div className="w-full pb-16 font-inter">
			<ContactHero />

			<section className="mx-auto mt-12 max-w-3xl rounded-lg border border-border bg-card p-8 lg:mt-16">
				<h2 className="font-anton text-3xl uppercase">Atención al cliente</h2>
				<p className="mt-4 text-muted-foreground">
					El canal de contacto aún no está habilitado. Publicaremos aquí los
					datos verificados cuando estén disponibles.
				</p>
				<p className="mt-4 text-muted-foreground">
					Si buscas información de un pedido, consulta su seguimiento desde tu
					cuenta.
				</p>
				<Link
					href="/mi-cuenta"
					className="mt-5 inline-flex min-h-11 items-center underline"
				>
					Ir a mi cuenta
				</Link>
			</section>
		</div>
	);
};

export default ContactPage;
