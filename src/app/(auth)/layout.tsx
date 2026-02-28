export default function AuthLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="min-h-screen w-full font-inter">
			{children}
		</div>
	);
}
