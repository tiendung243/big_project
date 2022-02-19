import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

import PaginatedItems from '../molecules/QuestionPagination';

const Search = () => {
	const search = 'search';
	interface IAuthor {
		id: number,
		first_name: string
	}
    interface IPost {
        id: number,
		title: string,
		comment: number,
		view: number,
		vote: number,
		created: string,
		author: IAuthor,
		tags: string[]
    }
    interface IAppState {
        search: string,
        posts: Array<IPost>,
    }
	const [appState, setAppState] = useState<IAppState>({
		search: '',
		posts: [],
	});

	useEffect(() => {
		axiosInstance.get(search + '/' + window.location.search).then((res) => {
			const allPosts:Array<IPost> = res.data;
			console.log(res);
			setAppState({...appState, posts: allPosts });
		});
	}, [setAppState]);
	console.log("post_searched", appState.posts)
	if (!appState.posts || appState.posts.length === 0) return <p>Can not find any posts.</p>;
	return (
		<Container maxWidth="md" component="main" className="ListQuestionPage">
			<Paper>
				<TableContainer>
					<Table stickyHeader aria-label="sticky table">
						<TableBody>
							<PaginatedItems itemsPerPage={10} items={appState.posts} type="home"/>
						</TableBody>
					</Table>
				</TableContainer>
			</Paper>
		</Container>
	);
};
export default Search;
