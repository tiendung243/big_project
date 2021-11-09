import './Question.css';
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
        },
        {
            content: 'I think it\'s worth adding to this answer what the effect of not quoting a variable with spaces would be.',
            time: 'Apr 8 \'12 at 23:13',
            author: {
                id: 2,
                name: 'Owen'
            }
        },
        {
            content: 'do you only have to quote string variables?',
            time: 'Apr 8 \'12 at 23:13',
            author: {
                id: 1,
                name: 'Cristian'
            }
        }
    ]
    return (
        <div>
            <div className="QuestionContent">
                <VotePoint />
                <CommentContent />
            </div>
            <div className="QuestionTop">
                <QuestionShare />
                <AuthorInfo />
            </div>
            <div className="ListChildComments">
                {
                    childComments.map((childComment) => 
                        <ChildComment content={childComment.content} time={childComment.time} author={childComment.author}/>
                    )
                }
            </div>
        </div>
    )
}

export default Comment;
