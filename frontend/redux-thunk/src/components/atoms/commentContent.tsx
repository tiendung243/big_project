import './commentContent.css';

function CommentContent(props:any) {
    return (
        <div className="CommentContent">
            <p>{props.content}</p>
        </div>
    )
}

export default CommentContent;
