import './ChildComment.css';

interface IChildComment {
    content: string,
    time: string,
    author: any
}

export default function ChildComment (props:IChildComment){
    return (
        <div className="ChildComment">
            <p>{props.content}</p> - <a href="">{props.author[1]} </a> 
            <p>{props.time}</p>
        </div>
    )
}