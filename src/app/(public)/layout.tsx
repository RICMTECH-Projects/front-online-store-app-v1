import { Footer } from "@/modules/shared/components/Footer/Footer";
import Navbar from "@/modules/shared/components/Navbar/Navbar";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="w-full min-h-screen">
			<Navbar />
			<main className="max-w-7xl w-full mx-auto px-5 lg:px-20 flex-grow">
				{children}
			</main>
			<Footer />
		</div>
	);
};

export default layout;
