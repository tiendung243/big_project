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
import {handleDateTimeCreated} from '../../common';

function Comment(props:any) {
	const [postReply, setPostReply] = useState('');
    const [childComments, setChildComment] = useState(props.data.child_comments);
    const data = props.data;
    const userInfo = useSelector((state:State) => state.user);
    const [showCreateComment, setShowCreateComment] = useState(false);

	function handleSubmit(e:any) {
		e.preventDefault();
        if (!postReply.trim()) {
            return;
        }
        axiosInstance.post(`comment/create/`, {
            parent_comment: data.id,
			content: postReply,
		}).then((res) => {
			const new_comment = res.data;
            console.log('new child comment',userInfo);
			setChildComment([...childComments, {
                content: new_comment.content,
                created: new_comment.created_at,
                author: [userInfo.id, userInfo.user_name, userInfo.image, userInfo.last_name]
            }]);
            setPostReply('');
		});
	}

	function handleOnChange(e:any) {
		setPostReply(e.target.value);
	}

    return (
        <div>
            <div className="QuestionContent">
                <VotePoint upvote={data.upvote} down_vote={data.down_vote} type='comment' comment_id={data.id}/>
                <CommentContent content={data.content}/>
            </div>
            <div className="QuestionTop">
                <QuestionShare />
                <AuthorInfo author={data.author} isAsk={false} created={data.created_at ? handleDateTimeCreated(data.created_at): '1 minute '}/>
            </div>
            <div className="ListChildComments">
                {
                    childComments.length ? childComments.map((childComment:any) => 
                        <ChildComment content={childComment.content} time={childComment.time} author={childComment.author}/>
                    ) : ''
                }
            </div>
            <div className="ReplyCreate">
                <p onClick={()=> setShowCreateComment(true)}>Create a reply</p>
                {
                    showCreateComment ? (<form onSubmit={(e) => handleSubmit(e)} className="form_reply">
                        <input className="post_reply" name="postComment" placeholder="Your reply" value={postReply} onChange={handleOnChange} />
                        <input type="submit" value="Submit" />
				    </form>) : ''
                }
                
            </div>
            <br/>
        </div>
    )
}

export default Comment;
