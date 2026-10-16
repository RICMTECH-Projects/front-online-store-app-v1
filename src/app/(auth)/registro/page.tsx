import { AuthShell } from "@/modules/auth/components/AuthShell";
import { RegisterForm } from "@/modules/auth/components/RegisterForm";
import { AUTH_PANEL_COPY } from "@/modules/auth/constants/auth.const";

export default function RegisterPage() {
	return (
		<AuthShell panelCopy={AUTH_PANEL_COPY.register}>
			<RegisterForm />
		</AuthShell>
	);
}
