import './QuestionStat.css';

function QuestionStat(props: any) {
    return (
        <div className="Question_Stat">
            <h3 className="stat_number"> {props.stat} </h3>
            <p> {props.name} </p>
        </div>
    )
}

export default QuestionStat;