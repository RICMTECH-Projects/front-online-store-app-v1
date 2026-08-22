type AuthHeaderProps = {
	description: string;
	title: string;
};

export const AuthHeader = ({ description, title }: AuthHeaderProps) => {
	return (
		<div className='mb-10'>
			<h1 className='font-anton text-3xl uppercase tracking-wide'>{title}</h1>
			<p className='mt-2 text-sm text-muted-foreground'>{description}</p>
		</div>
	);
};
