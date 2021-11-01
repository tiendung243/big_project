
interface Iprops {
    isLoading : boolean,
    posts: any
}

function PostLoading(Component:any) {
	return function PostLoadingComponent({ isLoading, ...props }: Iprops) {
		if (!isLoading) return <Component {...props} />;
		return (
			<p style={{ fontSize: '25px' }}>
				We are waiting for the data to load!...
			</p>
		);
	};
}
export default PostLoading;
