import './Question.css';

import QuestionShare from '../atoms/sharingQuetion'; 
import AuthorInfo from '../atoms/authorInfo';
import VotePoint from '../atoms/votePoint';
import CommentContent from '../atoms/commentContent';
import QuestionTag from '../atoms/tag';
import { useContext } from 'react';
import {TagContext} from '../posts/postDetail';

function QuestionTop(props:any) {

    const {tags} = useContext(TagContext);
    console.log('tags', tags);

    return (
        <div>
            <div className="QuestionContent">
                <VotePoint number_vote={props.number_vote}/>
                <CommentContent />
            </div>
            <div className="TagContainer">
                {tags.map((tag) => <QuestionTag name={tag} />)}
            </div>
            <div className="QuestionTop">
                <QuestionShare />
                <AuthorInfo />
            </div>
        </div>
    )
}

export default QuestionTop;
