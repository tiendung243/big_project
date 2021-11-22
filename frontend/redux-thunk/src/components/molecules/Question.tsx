import './Question.css';

import QuestionShare from '../atoms/sharingQuetion'; 
import AuthorInfo from '../atoms/authorInfo';
import VotePoint from '../atoms/votePoint';
import CommentContent from '../atoms/commentContent';
import QuestionTag from '../atoms/tag';
import { useContext } from 'react';
import {TagContext} from '../posts/postDetail';

function QuestionTop(props:any) {

    const { tags, author, created } = useContext(TagContext);

    return (
        <div>
            <div className="QuestionContent">
                <VotePoint upvote={props.upvote} down_vote={props.down_vote} type='question'/>
                <CommentContent content={props.content}/>
            </div>
            <div className="TagContainer">
                {tags.map((tag) => <QuestionTag name={tag} />)}
            </div>
            <div className="QuestionTop">
                <QuestionShare />
                <AuthorInfo isAsk={true} created={created} author={author}/>
            </div>
        </div>
    )
}

export default QuestionTop;
