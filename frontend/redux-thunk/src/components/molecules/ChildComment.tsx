import './ChildComment.css';


interface IAuthor {
    id: number,
    name: string
}

interface IChildComment {
    content: string,
    time: string,
    author: IAuthor
}

export default function ChildComment (props:IChildComment){
    return (
        <div className="ChildComment">
            <p>{props.content}</p> - <a href="">{props.author.name} </a> 
            <p>{props.time}</p>
        </div>
    )
}