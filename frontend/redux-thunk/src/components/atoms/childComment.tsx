import './childComment.css';

interface IChildComment {
    content: string
}

function ChildComment(props:IChildComment) {
    return (
        <div className="ChildComment">
            <p>{props.content}</p>
        </div>
    )
}

export default ChildComment;
