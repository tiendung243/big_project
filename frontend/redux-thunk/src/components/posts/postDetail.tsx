import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams, useHistory} from 'react-router-dom';
import './postDetail.css';
//MaterialUI
import Container from '@material-ui/core/Container';
import ButtonAddQuestion from '../atoms/addQuestion';
import QuestionTop from '../molecules/Question';
import Comment from '../molecules/Comment';

export default function Post() {
	const { id } : {id : string} = useParams();
	const history = useHistory();

	interface IAuthor {
		first_name: string,
		last_name: string,
		image: string
	}

	interface IComment {
		content: string,
		author: IAuthor,
		confirmed: boolean,
		last_update: string,
		created_at: string,
		upvote: number,
		down_vote: number
	}

    interface Ipost {
		title: string,
		content: string,
		numberComment: number,
		created_at: string,
		last_update: string,
		comments: IComment[],
		upvote: number,
		down_vote: number
    };

	const [data, setData] = useState<Ipost>({
		title: '', content: '', numberComment:0, created_at:'', last_update: '', comments: [], upvote: 0, down_vote: 0
	});

	const [postComment, setPostComment] = useState();
	// const [comments, setComments] = useState();

	function handleSubmit(e:any) {
		e.preventDefault();
		console.log(postComment, id);
		axiosInstance.post(`comment/create/`, {
			question: id,
			content: postComment,
		}).then((res) => {
			history.push('/');
		});
	}

	function handleOnChange(e:any){
		console.log(e.target.value);
		setPostComment(e.target.value);
	}

	useEffect(() => {
		axiosInstance.get('post/' + id).then((res) => {
			setData(res.data);
			console.log(res.data);
		});
	}, [setData]);

	// useEffect(() => {
	// 	axiosInstance.get('comments/' + id).then((res) => {
	// 		console.log(res.data);
	// 	});
	// }, [setComments]);
	console.log('data', data.comments);
	return (
		<Container component="main" maxWidth="md">
			<div className="PostDetail">
				<div className="PostDetail-header">
					<div className="header-left">
						<p className='header-title'>{data.title}</p>
						<div className="question-info">
							<p> Asked 7 years, 6 months ago</p>
							<p>Viewed 58k times</p>
						</div>
					</div>
					<div className="header-right">
						<ButtonAddQuestion />
					</div>
				</div>
				<QuestionTop number_vote={data.upvote - data.down_vote}/>
				<h2> {data.numberComment} Answers</h2>
				{data.comments.map(comment => 
					<Comment questionId={id} data={comment}/>
				)}
				<form onSubmit={(e) => handleSubmit(e)} className="form_comment">
					<textarea className="post_comment" name="postComment" value={postComment} onChange={handleOnChange} />
					<input type="submit" value="Submit" />
				</form>
			</div>
		</Container>
	);
}