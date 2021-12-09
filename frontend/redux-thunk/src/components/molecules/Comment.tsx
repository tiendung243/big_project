import React, { useState, useRef } from 'react';
import './Comment.css';
import axiosInstance from '../../axios';
import FollowComment from '../atoms/followComment'; 
import AuthorInfo from '../atoms/authorInfo';
import VotePoint from '../atoms/votePoint';
import CommentContent from '../atoms/commentContent';
import ChildComment from './ChildComment';
import {useSelector} from 'react-redux';
import {State} from '../../reducers/index';
import {handleDateTimeCreated} from '../../common';
import CommmentEditting from '../atoms/commentContentEditting';

interface IChildCommentProps {
    id: number,
    content: string,
    time: string,
    author: any
}

function Comment(props:any) {
	const [postReply, setPostReply] = useState('');
    const [childComments, setChildComment] = useState(props.data.child_comments);
    const data = props.data;
    const userInfo = useSelector((state:State) => state.user);
    const [showCreateComment, setShowCreateComment] = useState(false);
    const [following, setFollowing] = useState(props.data.following);
    const [isEditting, setIsEdittting] = useState(false);

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
			setChildComment([...childComments, {
                content: new_comment.content,
                id: new_comment.id,
                created: new_comment.created_at,
                author: [userInfo.id, userInfo.user_name, userInfo.image, userInfo.last_name]
            }]);
            setPostReply('');
		});
	}

	function handleOnChange(e:any) {
		setPostReply(e.target.value);
	}

    function updateFollowing(){
        console.log('update following', following);
        setFollowing(!following);
    }

    function deleteChildComment(id:number) : void {
        let tempChildComments = [];
        for (let comment of childComments) {
            if (comment.id !== id) {
                tempChildComments.push(comment);
            }
        }
        setChildComment(tempChildComments);
    }

    const updateEditting = (value:boolean) => {setIsEdittting(value); };

    const followProps = {
        updateFollowing: updateFollowing,
        following: following,
        comment_id: data.id,
        updateEditting: updateEditting
    };


    return (
        <div>
            <div className="QuestionContent">
                <VotePoint upvote={data.upvote} down_vote={data.down_vote} type='comment' comment_id={data.id}/>
                {!isEditting  ? (<CommentContent content={data.content}/>) : <CommmentEditting updateEditting={updateEditting} updateComment={props.updateComment} content={data.content} comment_id={data.id}/>}
            </div>
            <div className="QuestionTop">
                <FollowComment data={followProps}/>
                <AuthorInfo author={data.author} isAsk={false} created={data.created_at ? handleDateTimeCreated(data.created_at): '1 minute '}/>
            </div>
            <div className="ListChildComments">
                {
                    childComments.length ? childComments.map((childComment:IChildCommentProps) => {
                        const childCommentProps = {
                            comment_id: childComment.id,
                            content: childComment.content,
                            time: childComment.time,
                            author: childComment.author,
                            deleteFunc: deleteChildComment,
                        };
                        return <ChildComment {...childCommentProps} />;
                    }
                    ) : ''
                }
            </div>
            {userInfo.id ? (
                <div className="ReplyCreate">
                    <p onClick={()=> setShowCreateComment(true)}>Create a reply</p>
                    {
                        showCreateComment ? (<form onSubmit={(e) => handleSubmit(e)} className="form_reply">
                            <input className="post_reply" name="postComment" placeholder="Your reply" value={postReply} onChange={handleOnChange} />
                            <input type="submit" value="Submit" />
                        </form>) : ''
                    }
                </div>
            ) : ''}
            
            <br/>
        </div>
    )
}

export default Comment;
