import { TanstackProvider } from "@/modules/shared/providers/tanstack-query/TanstackProvider";
import "./globals.css";
import { Anton, Antonio, Inter } from "next/font/google";
import { Toaster } from "@/modules/shared/components/ui/sonner";

const anton = Anton({
	subsets: ["latin"],
	weight: "400",
	variable: "--font-anton",
});

const antonio = Antonio({
	subsets: ["latin"],
	weight: ["400", "600", "700"],
	variable: "--font-antonio",
});

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
});

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="es">
			<body
				className={`${anton.variable} ${antonio.variable} ${inter.variable} min-h-screen antialiased`}
			>
				<TanstackProvider>
					{children}
					<Toaster />
				</TanstackProvider>
			</body>
		</html>
	);
}
