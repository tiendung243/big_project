import React, { useState, useEffect, useMemo } from 'react';
import axiosInstance from '../../axios';
import { useParams, useHistory} from 'react-router-dom';
import './postDetail.css';
//MaterialUI
import Container from '@material-ui/core/Container';
import ButtonAddQuestion from '../atoms/addQuestion';
import QuestionTop from '../molecules/Question';
import Comment from '../molecules/Comment';
import Button from '@material-ui/core/Button';

import {useSelector} from 'react-redux';
import {State} from '../../reducers/index';
import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Cookies from 'js-cookie';
import {handleDateTimeCreated} from '../../common';

const initialContext = {
	following: false, 
	author: {id:-1, }, 
	created: '', 
	tags: [''], 
	question_id: 0, 
	update_vote: (upvote:number, down_vote:number) => {},
	update_following: () => {},
};

export const TagContext = React.createContext(initialContext);


export default function Post() {
	const { id } : {id : string} = useParams();
	const history = useHistory();

	interface IAuthor {
		first_name: string,
		last_name: string,
		image: string,
		username: string,
		use_full_comment: number,
		id: number
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
		child_comments: any,
		following: boolean
	}

    interface Ipost {
		title: string,
		content: string,
		view: number,
		numberComment: number,
		created_at: string,
		last_update: string,
		comments: IComment[],
		upvote: number,
		down_vote: number,
		tags: string[],
		author: IAuthor,
		following: boolean
    };

	const [data, setData] = useState<Ipost>({
		title: '', content: '', numberComment:0, created_at:'', 
		following: false, last_update: '', comments: [], upvote: 0, 
		view: 0 ,down_vote: 0, tags: [],
		author: {id:-1, first_name: '', last_name: '', image: '', username: '', use_full_comment:0}
	});

	const userInfo = useSelector((state:State) => state.user);

	const updateVote = (upvote:number, down_vote:number) => {
		setData({
			...data,
			upvote: upvote,
			down_vote: down_vote
		})
	}

	const update_following = () => {
		setData({
			...data,
			following: !data.following
		})
	}

	const updateEditComment = (id:number, content: string) => {
		console.log(id, content);
		let temp_comments = [];
		for(let comment of data.comments){
			if (comment.id === id) {
				temp_comments.push({
					...comment,
					content: content
				})
			} else {
				temp_comments.push(comment);
			}
		}
		setData({
			...data,
			comments: temp_comments
		})
	}

	const [postComment, setPostComment] = useState("");

	function handleSubmit(e:any) {
		e.preventDefault();
		axiosInstance.post(`comment/create/`, {
			question: id,
			content: postComment,
		}).then((res) => {
			const new_comment = res.data;
			const comments = [...data.comments, {
				...new_comment,
				upvote: 0,
				down_vote: 0,
				author: userInfo,
				child_comments: []
			}];
			console.log('comments',comments);

			setData({...data, comments: comments, numberComment: data.numberComment + 1});
			setPostComment("");
		});
	}

	const handleDateTime = handleDateTimeCreated(data.created_at);

	const csrfCookie = Cookies.get('csrftoken');
	
	// function handleOnChange(e:any) {
	// 	setPostComment(e.target.value);
	// }

	useEffect(() => {
		axiosInstance.get('post/' + id).then((res) => {
			setData(res.data);
			console.log('post data',res.data);
		});
	}, [setData]);

	return (
		<Container component="main" maxWidth="md">
			<div className="PostDetail">
				<div className="PostDetail-header">
					<div className="header-left">
						<p className='header-title' >{data.title}</p>
						<div className="question-info">
							<p> Asked {handleDateTime}</p>
							<p> Viewed {data.view} times</p>
						</div>
					</div>
					<div className="header-right">
						<ButtonAddQuestion />
					</div>
				</div>
				<TagContext.Provider value={{ 
						following: data.following,
						author:data.author, 
						created:handleDateTime, 
						tags: data.tags, 
						question_id: + id, 
						update_vote: updateVote,
						update_following: update_following,
						}}>
					<QuestionTop upvote={data.upvote} down_vote={data.down_vote} content={data.content}/>
				</TagContext.Provider>
				<h4> {data.numberComment} Answers</h4>
				{data.comments.map(comment => 
					<Comment questionId={id} data={comment} updateComment={updateEditComment}/>
				)}
				{userInfo.id ? (
					<form onSubmit={(e) => handleSubmit(e)} className="form_comment">
						<h5> Write your comment </h5>
						<CKEditor
							editor={ClassicEditor}
							name="postComment"
							data={postComment}
						
							onChange={(event: any, editor: any) => {
								const data = editor.getData();
								setPostComment(data);
							}}
							onBlur={(event: any, editor: any) => {
								console.log("Blur.", editor);
							}}
							onFocus={(event: any, editor: any) => {
								console.log("Focus.", editor);
							}}
						/>
						<input type="submit" value="Submit" />
					</form>
				): (
					<div className="register-witch">
						<p className="register-switch-text"> Register to write your comment</p>
						<Button 
							color="primary" 
							variant="contained"
						> Go to register </Button>
					</div>
				)}
			</div>
		</Container>
	);
}