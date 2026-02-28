'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff } from 'lucide-react';

export default function RegisterPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
						Únete a la comunidad. Crea tu cuenta y descubre lo último en moda urbana.
					</p>
				</div>
			</div>

			{/* Right — Register form */}
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

					{/* Title */}
					<div className="mb-10">
						<h1 className="text-3xl font-anton tracking-wide uppercase">
							CREAR CUENTA
						</h1>
						<p className="mt-2 text-sm text-muted-foreground">
							Completa tus datos para registrarte
						</p>
					</div>

					{/* Form */}
					<form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
						{/* Name fields */}
						<div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
							<div className="flex flex-col gap-2">
								<label htmlFor="firstName" className="text-sm font-medium text-foreground">
									Nombre
								</label>
								<input
									type="text"
									id="firstName"
									autoComplete="given-name"
									className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
									placeholder="Juan"
								/>
							</div>
							<div className="flex flex-col gap-2">
								<label htmlFor="lastName" className="text-sm font-medium text-foreground">
									Apellido
								</label>
								<input
									type="text"
									id="lastName"
									autoComplete="family-name"
									className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
									placeholder="Pérez"
								/>
							</div>
						</div>

						{/* Email */}
						<div className="flex flex-col gap-2">
							<label htmlFor="email" className="text-sm font-medium text-foreground">
								Correo electrónico
							</label>
							<input
								type="email"
								id="email"
								autoComplete="email"
								className="w-full px-4 py-3 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
								placeholder="tu@correo.com"
							/>
						</div>

						{/* Password */}
						<div className="flex flex-col gap-2">
							<label htmlFor="password" className="text-sm font-medium text-foreground">
								Contraseña
							</label>
							<div className="relative">
								<input
									type={showPassword ? 'text' : 'password'}
									id="password"
									autoComplete="new-password"
									className="w-full px-4 py-3 pr-12 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
									placeholder="Mínimo 8 caracteres"
								/>
								<button
									type="button"
									onClick={() => setShowPassword(!showPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
									aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
								>
									{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
								</button>
							</div>
						</div>

						{/* Confirm password */}
						<div className="flex flex-col gap-2">
							<label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">
								Confirmar contraseña
							</label>
							<div className="relative">
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									id="confirmPassword"
									autoComplete="new-password"
									className="w-full px-4 py-3 pr-12 bg-background border border-border text-sm focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
									placeholder="Repite tu contraseña"
								/>
								<button
									type="button"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors p-1"
									aria-label={showConfirmPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
								>
									{showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
								</button>
							</div>
						</div>

						{/* Submit */}
						<button
							type="submit"
							className="w-full py-3.5 bg-foreground text-background font-medium text-sm uppercase tracking-wider hover:opacity-90 transition-opacity mt-2"
						>
							Crear cuenta
						</button>
					</form>

					{/* Divider */}
					<div className="flex items-center gap-4 my-8">
						<div className="flex-1 h-px bg-border" />
						<span className="text-xs text-muted-foreground uppercase tracking-wider">
							o regístrate con
						</span>
						<div className="flex-1 h-px bg-border" />
					</div>

					{/* Google sign-up */}
					<button
						type="button"
						className="w-full flex items-center justify-center gap-3 py-3.5 border border-border text-sm font-medium hover:bg-muted/50 transition-colors"
					>
						<svg className="size-5" viewBox="0 0 24 24" aria-hidden="true">
							<path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
							<path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
							<path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
							<path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
						</svg>
						Continuar con Google
					</button>

					{/* Login link */}
					<p className="mt-8 text-center text-sm text-muted-foreground">
						¿Ya tienes una cuenta?{' '}
						<Link
							href="/login"
							className="text-foreground font-medium underline underline-offset-4 hover:opacity-80 transition-opacity"
						>
							Inicia sesión
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
