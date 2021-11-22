import React from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import './posts.css';

import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';

import QuestionRow from '../molecules/QuestionRow';

const useStyles = makeStyles((theme) => ({
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	cardHeader: {
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[200]
				: theme.palette.grey[700],
	},
	postTitle: {
		fontSize: '16px',
		textAlign: 'left',
	},
	postText: {
		display: 'flex',
		justifyContent: 'left',
		alignItems: 'baseline',
		fontSize: '12px',
		textAlign: 'left',
		marginBottom: theme.spacing(2),
	},
}));

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

	function handleDelete(e:any, id:number){
		e.preventDefault();
		axiosInstance
			.delete('post/delete/' + id)
			.catch(function (error:any) {
				if (error.response) {
					console.log(error.response.data);
					console.log(error.response.status);
					console.log(error.response.headers);
				}
			})
			.then(function () {
					history.push({
						pathname: '/',
					});
					window.location.reload();
			});
	}

	if (!posts || posts.length === 0) return <p>Can not find any posts, sorry</p>;
	return (
		<React.Fragment>
			<Container maxWidth="md" component="main" className="ListQuestionPage">
				<Paper>
					<TableContainer>
						<Table stickyHeader aria-label="sticky table">
							<TableBody>
								{posts.map((post:IPost) => {
									return (
										<TableRow>
											<QuestionRow post={post}/>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					</TableContainer>
				</Paper>
			</Container>
		</React.Fragment>
	);
};
export default Posts;
