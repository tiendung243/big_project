import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams, useHistory} from 'react-router-dom';
import './postDetail.css';
//MaterialUI
import Container from '@material-ui/core/Container';
import ButtonAddQuestion from '../atoms/addQuestion';
import QuestionTop from '../molecules/Question';
import Comment from '../molecules/Comment';

import {useSelector} from 'react-redux';
import {State} from '../../reducers/index';

export const TagContext = React.createContext({tags: [''], question_id: 0, update_vote: (type:string) => {}});

export default function Post() {
	const { id } : {id : string} = useParams();
	const history = useHistory();

	interface IAuthor {
		first_name: string,
		last_name: string,
		image: string,
		username: string
	}

	interface IComment {
		id: number,
		content: string,
		author: IAuthor,
		confirmed: boolean,
		last_update: string,
		created_at: string,
		upvote: number,
		down_vote: number,
		child_comments: any
	}

    interface Ipost {
		title: string,
		content: string,
		numberComment: number,
		created_at: string,
		last_update: string,
		comments: IComment[],
		upvote: number,
		down_vote: number,
		tags: string[]
    };

	const [data, setData] = useState<Ipost>({
		title: '', content: '', numberComment:0, created_at:'', last_update: '', comments: [], upvote: 0, down_vote: 0, tags: []
	});

	const userInfo = useSelector((state:State) => state.user);

	const updateVote = (type: string) => {
		console.log("12312312");
		if (type === 'upvote'){
			setData({
				...data,
				upvote: data.upvote + 1
			})
		}else{
			setData({
				...data,
				down_vote: data.down_vote + 1
			})
		}
	}

	const [postComment, setPostComment] = useState();
	// const [comments, setComments] = useState();

	function handleSubmit(e:any) {
		e.preventDefault();
		axiosInstance.post(`comment/create/`, {
			question: id,
			content: postComment,
		}).then((res) => {
			const new_comment = res.data;
			const comments = [...data.comments, {
				...new_comment,
				author: userInfo,
				child_comments: []
			}];

			setData({...data, comments: comments});
		});
	}

	function handleOnChange(e:any) {
		console.log(e.target.value);
		setPostComment(e.target.value);
	}

	useEffect(() => {
		axiosInstance.get('post/' + id).then((res) => {
			setData(res.data);
			console.log(res.data);
		});
	}, [setData]);

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
				<TagContext.Provider value={{tags: data.tags, question_id: +id, update_vote: updateVote}}>
					<QuestionTop number_vote={data.upvote - data.down_vote}/>
				</TagContext.Provider>
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