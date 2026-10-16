import { AuthShell } from "@/modules/auth/components/AuthShell";
import { PasswordRecoveryForm } from "@/modules/auth/components/PasswordRecoveryForm";
import { AUTH_PANEL_COPY } from "@/modules/auth/constants/auth.const";

export default function ForgotPasswordPage() {
	return (
		<AuthShell panelCopy={AUTH_PANEL_COPY.recoverPassword}>
			<PasswordRecoveryForm />
		</AuthShell>
	);
}
