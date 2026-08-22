import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { AUTH_BRAND, AUTH_ROUTES } from "@/modules/auth/constants/auth.const";

type AuthShellProps = {
	children: ReactNode;
	panelCopy: string;
};

export const AuthShell = ({ children, panelCopy }: AuthShellProps) => {
	return (
		<div className="flex min-h-screen">
			<div className="relative hidden w-1/2 lg:block">
				<Image
					src={AUTH_BRAND.image}
					alt={AUTH_BRAND.name}
					fill
					priority
					className="object-cover object-center"
				/>
				<div className="absolute inset-0 bg-black/60" />

				<div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-12">
					<Link href={AUTH_ROUTES.home} className="group">
						<span className="font-anton text-6xl uppercase tracking-widest text-white transition-transform duration-300 group-hover:scale-105">
							{AUTH_BRAND.name}
						</span>
					</Link>
					<p className="mt-6 max-w-sm text-center font-inter text-sm leading-relaxed text-white/60">
						{panelCopy}
					</p>
				</div>
			</div>

			<div className="flex w-full items-center justify-center p-6 sm:p-12 lg:w-1/2">
				<div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
					<div className="mb-12 text-center lg:hidden">
						<Link href={AUTH_ROUTES.home} className="inline-block">
							<span className="font-anton text-4xl uppercase tracking-widest">
								{AUTH_BRAND.name}
							</span>
						</Link>
					</div>

					{children}
				</div>
			</div>
		</div>
	);
};
