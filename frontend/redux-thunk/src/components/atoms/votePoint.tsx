import './votePoint.css';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axiosInstance from '../../axios';

import { useContext } from 'react';
import {TagContext} from '../posts/postDetail';

function VotePoint(props:any) {
    
    const {question_id, update_vote} = useContext(TagContext);

    function upvote(e:any){
        console.log("click upvote");
        update_vote('upvote');
        
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
