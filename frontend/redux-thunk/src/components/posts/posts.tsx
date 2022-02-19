import React from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import './posts.css';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';

import PaginatedItems from '../molecules/QuestionPagination';

const Posts = (props:any) => {
	const { posts } = props;
	console.log(posts);
	const history = useHistory();

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

	if (!posts || posts.length === 0) return <p>Can not find any posts</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main" className="ListQuestionPage">
				<Paper>
					<TableContainer>
						<Table stickyHeader aria-label="sticky table">
							<TableBody>
								<PaginatedItems itemsPerPage={10} items={posts} type="home"/>
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};
export default Posts;
