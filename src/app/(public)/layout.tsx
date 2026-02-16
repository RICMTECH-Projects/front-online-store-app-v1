import Navbar from '@/modules/shared/components/Navbar/Navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='max-w-7xl w-full mx-auto'>
			<Navbar />
			<main className='w-full px-5 lg:px-20'>{children}</main>
		</div>
	);
};

export default layout;
