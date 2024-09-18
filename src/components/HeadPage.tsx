// import NextHeadSeo from 'next-head-seo'

type MyPageSeoProps = {
	path?: string;
	title: string;
	description?: string;
};

export const HeadPage: React.FC<MyPageSeoProps> = (props) => {
	const { title = '', description = '', path = '' } = props;

	return (
		<>
			<title>{title}</title>
			<meta name="description" content={description} />
		</>
	);
};
