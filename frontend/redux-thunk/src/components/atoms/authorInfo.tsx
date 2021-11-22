import './authorInfo.css';

function AuthorInfo(props:any) {
    console.log('author info', props);
    return (
        <div className="AuthorInfo">
            <div className="AuthorInfo-time">
                {props.isAsk ? 'Asked ' : 'Answered '} {props.created}
            </div>
            <div className="AuthorInfo-image">
                <a href=""><img src={props.author.image} alt="" /></a>
                <div className="right">
                    <a href=""><p>{props.author.first_name} {props.author.last_name}</p></a>
                    <p>{props.author.use_full_comment}</p>
                </div>
            </div>
        </div>
    )
}

export default AuthorInfo;
