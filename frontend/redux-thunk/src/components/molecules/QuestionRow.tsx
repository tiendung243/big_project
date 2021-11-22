import './QuestionRow.css';

import QuestionStat from '../atoms/QuestionStat';
import QuestionTag from '../atoms/tag';

function QuestionRow(props:any) {
    const {post} = props;
    return (
        <div className="Question_Row">
            <QuestionStat name='Votes' stat={post.vote}/>
            <QuestionStat name='Answers' stat={post.comment}/>
            <QuestionStat name='Views' stat={post.view}/>
            <div className="Question_Row-content">
                <p className="title">
                    <a href={`post/${post.id}`}>
                        {post.title}
                    </a>
                </p> 
                <div className="tag-time">
                    <div className="left">
                        {
                            post.tags.map((tag:string) => <QuestionTag name={tag}/>)
                        }
                    </div>
                    <div className="content-right">
                        <p>Asked 2 hours ago <a href="">{post.author.first_name}</a> 12</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuestionRow;