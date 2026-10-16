import { AuthShell } from "@/modules/auth/components/AuthShell";
import { LoginForm } from "@/modules/auth/components/LoginForm";
import { AUTH_PANEL_COPY } from "@/modules/auth/constants/auth.const";

export default function LoginPage() {
	return (
		<AuthShell panelCopy={AUTH_PANEL_COPY.login}>
			<LoginForm />
		</AuthShell>
	);
}
