import './votePoint.css';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

function VotePoint(props:any) {

    function upvote(e:any){
        console.log("click upvote");
    }
    
    function downvote(e:any){
        console.log("click downvote");
    }

    return (
        <div className="VotePoint">
            <ArrowDropUpIcon onClick={upvote}/>
            {props.number_vote}
            <ArrowDropDownIcon onClick={downvote}/>
        </div>
    )
}

export default VotePoint;
