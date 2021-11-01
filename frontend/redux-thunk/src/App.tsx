import { useEffect, useState } from 'react';
import './App.css';
import Posts from './components/posts';
import PostLoading from './components/postloading';
import axiosInstance from './axios';

function App() {
	const PostLoadingComponent = PostLoading(Posts);
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
    console.log("getdata");
		axiosInstance.get('').then((res) => {
			const allPosts = res.data;
			setAppState({ loading: false, posts: allPosts });
			console.log(res.data);
		});
	}, [setAppState]);
	return (
		<div className="App">
			<h1>Latest Posts</h1>
			<PostLoadingComponent isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}
export default App;
