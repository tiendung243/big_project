import './Question.css';

import QuestionShare from '../atoms/sharingQuetion'; 
import AuthorInfo from '../atoms/authorInfo';
import VotePoint from '../atoms/votePoint';
import CommentContent from '../atoms/commentContent';
import QuestionTag from '../atoms/tag';

function QuestionTop(props:any) {
    return (
        <div>
            <div className="QuestionContent">
                <VotePoint />
                <CommentContent />
            </div>
            <div className="TagContainer">
                <QuestionTag name="javascript" />
                <QuestionTag name="nodejs" />
            </div>
            <div className="QuestionTop">
                <QuestionShare />
                <AuthorInfo />
            </div>
        </div>
    )
}

export default QuestionTop;
