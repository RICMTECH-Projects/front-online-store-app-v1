import Navbar from '@/modules/shared/components/Navbar/Navbar';

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className='max-w-7xl w-full mx-auto'>
			<Navbar />
			{children}
		</div>
	);
};

export default layout;
