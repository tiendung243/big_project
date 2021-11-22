import './commentContent.css';

function CommentContent(props:any) {
    return (
        <div className="CommentContent" dangerouslySetInnerHTML={{ __html: props.content }}>
        </div>
    )
}

export default CommentContent;
