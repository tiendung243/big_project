import './tag.css';

interface tag {
    name: string
}

function QuestionTag(props:tag) {
    return (
        <div className="QuestionTag">
            <p>{props.name}</p>
        </div>
    )
}

export default QuestionTag;
