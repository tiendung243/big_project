import React, { useState, useEffect } from 'react';
import './Comment.css';
import axiosInstance from '../../axios';
import QuestionShare from '../atoms/sharingQuetion'; 
import AuthorInfo from '../atoms/authorInfo';
import VotePoint from '../atoms/votePoint';
import CommentContent from '../atoms/commentContent';
import ChildComment from './ChildComment';
import {useSelector} from 'react-redux';
import {State} from '../../reducers/index';

function Comment(props:any) {
	const [postReply, setPostReply] = useState();
    console.log(props.data);
    const [childComments, setChildComment] = useState(props.data.child_comments);
    const data = props.data;
    const userInfo = useSelector((state:State) => state.user);

	function handleSubmit(e:any) {
		e.preventDefault();
        axiosInstance.post(`comment/create/`, {
            parent_comment: data.id,
			content: postReply,
		}).then((res) => {
            console.log('current data', childComments);
			const new_comment = res.data;
            console.log('new comment', new_comment);
            console.log(userInfo);
			setChildComment([...childComments, {
                content: new_comment.content, 
                created: new_comment.created_at,
                author:[userInfo.id, userInfo.first_name, userInfo.image, userInfo.last_name]
            }]);
		});
	}

	function handleOnChange(e:any){
		setPostReply(e.target.value);
	}
    return (
        <div>
            <div className="QuestionContent">
                <VotePoint number_vote={data.upvote - data.downvote}/>
                <CommentContent content={data.content}/>
            </div>
            <div className="QuestionTop">
                <QuestionShare />
                <AuthorInfo {...data.author}/>
            </div>
            <div className="ListChildComments">
                {
                    childComments.length ? childComments.map((childComment:any) => 
                        <ChildComment content={childComment.content} time={childComment.time} author={childComment.author}/>
                    ) : ''
                }
            </div>
            <div className="ReplyCreate">
                <p>Create a reply</p>
                <form onSubmit={(e) => handleSubmit(e)} className="form_reply">
					<input className="post_reply" name="postComment" value={postReply} onChange={handleOnChange} />
					<input type="submit" value="Submit" />
				</form>
            </div>
            <br/>
        </div>
    )
}

export default Comment;
