import React, { useState, useEffect } from 'react';
import './Comment.css';
import QuestionShare from '../atoms/sharingQuetion'; 
import AuthorInfo from '../atoms/authorInfo';
import VotePoint from '../atoms/votePoint';
import CommentContent from '../atoms/commentContent';
import ChildComment from './ChildComment';

function Comment(props:any) {
    const childComments = [
        {
            content: 'so you would alternate asdasd asdasd asdasd  asdasd sadso you would alternate asdasd asdasd asdasd  asdasd sadso you would alternate asdasd asdasd asdasd  asdasd sadasdbetween quoting and non-quoting variables in your scripts? thanks for your response',
            time: 'Apr 8 \'12 at 23:10',
            author: {
                id: 1,
                name: 'Cristian'
            }
        }
    ];
	const [postReply, setPostReply] = useState();
    const data = props.data;

	function handleSubmit(e:any) {
		alert('A name was submitted: ');
		e.preventDefault();
	}

	function handleOnChange(e:any){
        console.log(e.target.value);
		setPostReply(e.target.value);
	}
    console.log('author name', data.author.first_name);
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
                    childComments.map((childComment) => 
                        <ChildComment content={childComment.content} time={childComment.time} author={childComment.author}/>
                    )
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
