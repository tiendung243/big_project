import Posts from './posts';

interface Iprops {
    isLoading : boolean,
    posts: any
}

function PostLoading({ isLoading, ...props }: Iprops) {
	if (!isLoading) return <Posts {...props} />;
	return (
		<p style={{ fontSize: '25px' }}>
			We are waiting for the data to load!...
		</p>
	);
};
export default PostLoading;
