export const AUTH_ROUTES = {
	home: "/",
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
		"Diseño urbano, esencia unica. Inicia sesion para acceder a tu cuenta y explorar lo nuevo.",
	register:
		"Unete a la comunidad. Crea tu cuenta y descubre lo ultimo en moda urbana.",
	recoverPassword:
		"No te preocupes, te ayudamos a recuperar el acceso a tu cuenta de forma rapida y segura.",
	resetPassword:
		"Elige una contraseña segura para volver a acceder a tu cuenta.",
} as const;

export const AUTH_FIELD_CLASS =
	"h-auto rounded-none border-border bg-background px-4 py-3 text-sm placeholder:text-muted-foreground/50 focus-visible:border-foreground focus-visible:ring-4 focus-visible:ring-foreground/10";

export const AUTH_SUBMIT_CLASS =
	"mt-2 w-full bg-foreground py-3.5 text-sm font-medium uppercase tracking-wider text-background transition-opacity hover:opacity-90";
