import './authorInfo.css';

// interface IauthorInfo {
//     id: number,
//     img: string,
//     authorName: string,
//     numberUseFullComment : number,
//     isAsk : boolean,
//     time: string
// }

const initProps = {
    id: 1,
    img: 'https://source.unsplash.com/random',
    authorName: 'dungnt',
    numberUseFullComment: 12,
    isAsk: true,
    time: 'Jan 22 \'17 at 17:25'
}

function AuthorInfo(props:any) {
    return (
        <div className="AuthorInfo">
            <div className="AuthorInfo-time">
                {initProps.isAsk ? 'Asked ' : 'Answer '} {initProps.time}
            </div>
            <div className="AuthorInfo-image">
                <a href=""><img src={initProps.img} alt="" /></a>
                <div className="right">
                    <a href=""><p>nguyen tien dung</p></a>
                    <p>{initProps.numberUseFullComment}</p>
                </div>
            </div>
        </div>
    )
}

export default AuthorInfo;
