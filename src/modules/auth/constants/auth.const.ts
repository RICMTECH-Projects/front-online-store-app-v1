export const AUTH_ROUTES = {
	home: "/",
	account: "/mi-cuenta",
	accountSecurity: "/mi-cuenta/seguridad",
	adminProfile: "/perfil",
	adminSecurity: "/perfil/seguridad",
	login: "/login",
	register: "/registro",
	recoverPassword: "/recuperar-contrasena",
} as const;

export const AUTH_BRAND = {
	name: "URBNVOID",
	image: "/landing/about-us.avif",
} as const;

export const AUTH_PANEL_COPY = {
	login:
		"Diseño urbano, esencia única. Inicia sesión para acceder a tu cuenta y explorar lo nuevo.",
	register:
		"Únete a la comunidad. Crea tu cuenta y descubre lo último en moda urbana.",
	recoverPassword: "Solicita ayuda para recuperar el acceso a tu cuenta.",
	resetPassword:
		"Elige una contraseña segura para volver a acceder a tu cuenta.",
} as const;

export const AUTH_FIELD_CLASS =
	"h-auto rounded-none border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus-visible:border-foreground focus-visible:ring-4 focus-visible:ring-foreground/10";

export const AUTH_SUBMIT_CLASS =
	"mt-2 w-full bg-foreground py-3.5 text-sm font-medium uppercase tracking-wider text-background transition-opacity hover:opacity-90";
