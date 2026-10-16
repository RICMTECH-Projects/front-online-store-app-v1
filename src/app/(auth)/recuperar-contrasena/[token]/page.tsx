import { AuthShell } from "@/modules/auth/components/AuthShell";
import { ResetPasswordForm } from "@/modules/auth/components/ResetPasswordForm";
import { AUTH_PANEL_COPY } from "@/modules/auth/constants/auth.const";

type ResetPasswordPageProps = {
	params: Promise<{ token: string }>;
};

export default async function ResetPasswordPage({
	params,
}: ResetPasswordPageProps) {
	const { token } = await params;

	return (
		<AuthShell panelCopy={AUTH_PANEL_COPY.resetPassword}>
			<ResetPasswordForm token={token} />
		</AuthShell>
	);
}
