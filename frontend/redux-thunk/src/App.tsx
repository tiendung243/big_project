import React,{ useEffect, useState } from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

import PostLoading from './components/posts/postloading';
import ListQuestionTop from './components/atoms/listQuestionTop';
import axiosInstance from './axios';

import Register from './components/auth/register';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Single from './components/posts/postDetail';
import Search from './components/posts/search';
import Edit from './components/posts/postEdit';
import Create from './components/posts/postCreate';
import LeftBar from './components/leftBar';
import User from './components/user/user';

import {useDispatch} from 'react-redux';

function Posts () {
	const [appState, setAppState] = useState({
		loading: true,
		posts: null,
	});

	useEffect(() => {
		axiosInstance.get('').then((res) => {
			const allPosts = res.data.questions;
			setAppState({ loading: false, posts: allPosts });
			console.log('posts data', res.data.questions);
		});
	}, [setAppState]);
	return (
		<div className="App">
			<ListQuestionTop />
			<PostLoading isLoading={appState.loading} posts={appState.posts} />
		</div>
	);
}

function App() {
	const dispatch = useDispatch();
	useEffect(() => {
		axiosInstance.get('/user/getinfo/').then((res) => {
			console.log('user info', res.data);
			dispatch({type: 'SET_USER_INFO', payload: res.data});
		});
	}, []);

	const router = (
		<Router>
			<React.StrictMode>
			<Header />
			<div className="RootContent">
				<LeftBar/>
				<Switch>
					<Route exact path="/" component={Posts}/>
					<Route path="/register" component={Register}/>
					<Route path="/login" component={Login}/>
					<Route path="/logout" component={Logout}/>
					<Route path="/search" component={Search} />
					<Route path="/user" component={User} />
					<Route exact path="/post/create" component={Create} />
					<Route exact path="/post/:id" component={Single}/>
					<Route exact path="/post/edit/:id" component={Edit} />
				</Switch>
			</div>
			{/* <Footer /> */}
			</React.StrictMode>
		</Router>
	)
	return router;
}
export default App;
