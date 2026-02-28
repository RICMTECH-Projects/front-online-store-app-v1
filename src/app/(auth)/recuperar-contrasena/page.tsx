'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
	const [email, setEmail] = useState('');
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (email.trim()) {
			setSubmitted(true);
		}
	};

	return (
		<div className="flex min-h-screen">
			{/* Left — Fashion image (hidden on mobile) */}
			<div className="hidden lg:block relative w-1/2">
				<Image
					src="/landing/about-us.avif"
					alt="URBNVOID"
					fill
					priority
					className="object-cover object-center"
				/>
				<div className="absolute inset-0 bg-black/60" />

				<div className="absolute inset-0 flex flex-col items-center justify-center z-10 p-12">
					<Link href="/" className="group">
						<span className="text-6xl font-anton tracking-widest text-white uppercase transition-transform group-hover:scale-105 duration-300">
							URBNVOID
						</span>
					</Link>
					<p className="mt-6 text-white/60 text-center text-sm max-w-sm font-inter leading-relaxed">
						No te preocupes, te ayudamos a recuperar el acceso a tu cuenta de forma rápida y segura.
					</p>
				</div>
			</div>

			{/* Right — Forgot password form */}
			<div className="flex w-full lg:w-1/2 items-center justify-center p-6 sm:p-12">
				<div className="w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
					{/* Mobile logo */}
					<div className="lg:hidden mb-12 text-center">
						<Link href="/" className="inline-block">
							<span className="text-4xl font-anton tracking-widest uppercase">
								URBNVOID
							</span>
						</Link>
					</div>

					{/* Back to login */}
					<Link
						href="/login"
						className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-10 group"
					>
						<ArrowLeft className="size-4 group-hover:-translate-x-1 transition-transform" />
						Volver a iniciar sesión
					</Link>

					{!submitted ? (
						<>
							{/* Title */}
							<div className="mb-10">
								<h1 className="text-3xl font-anton tracking-wide uppercase">
									RECUPERAR CONTRASEÑA
								</h1>
								<p className="mt-3 text-sm text-muted-foreground leading-relaxed">
									Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
								</p>
							</div>

							{/* Form */}
							<form className="flex flex-col gap-5" onSubmit={handleSubmit}>
								{/* Email */}
								<div className="flex flex-col gap-2">
									<label htmlFor="email" className="text-sm font-medium text-foreground">
										Correo electrónico
									</label>
									<div className="relative">
										<input
											type="email"
											id="email"
											value={email}
											onChange={(e) => setEmail(e.target.value)}
											autoComplete="email"
											required
											className="w-full px-4 py-3 pl-11 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
											placeholder="tu@correo.com"
										/>
										<Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
									</div>
								</div>

								{/* Submit */}
								<button
									type="submit"
									className="w-full py-3.5 bg-foreground text-background font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-opacity mt-2"
								>
									Enviar enlace de recuperación
								</button>
							</form>
						</>
					) : (
						/* Success state */
						<div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
							<div className="flex flex-col items-center text-center">
								<div className="p-4 rounded-full bg-primary/10 mb-6">
									<CheckCircle2 className="size-10 text-foreground" />
								</div>
								<h2 className="text-2xl font-anton tracking-wide uppercase mb-3">
									¡CORREO ENVIADO!
								</h2>
								<p className="text-sm text-muted-foreground leading-relaxed max-w-sm">
									Hemos enviado un enlace de recuperación a{' '}
									<span className="text-foreground font-medium">{email}</span>.
									Revisa tu bandeja de entrada y sigue las instrucciones.
								</p>
								<p className="text-xs text-muted-foreground/70 mt-4">
									¿No recibiste el correo? Revisa tu carpeta de spam o{' '}
									<button
										type="button"
										onClick={() => setSubmitted(false)}
										className="text-foreground underline underline-offset-4 hover:opacity-80 transition-opacity"
									>
										intenta de nuevo
									</button>
								</p>
							</div>
						</div>
					)}

					{/* Register link */}
					<p className="mt-10 text-center text-sm text-muted-foreground">
						¿No tienes una cuenta?{' '}
						<Link
							href="/registro"
							className="text-foreground font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
						>
							Regístrate
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
