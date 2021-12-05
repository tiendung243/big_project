import React from 'react';
import './votePoint.css';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import axiosInstance from '../../axios';

import { useContext, useState } from 'react';
import { TagContext } from '../posts/postDetail';

function VotePoint(props:any) {
    
    const {question_id} = useContext(TagContext);
    const [upvote, setUpvote] = useState(props.upvote);
    const [down_vote, setDownvote] = useState(props.down_vote);

    function sendVote(type_vote:string, obj_id:number, path:string) {
        axiosInstance.post(path, {
            type: type_vote,
            obj_id: obj_id
        }).then((res) => {
            console.log(res.data);
            setUpvote(res.data.upvote);
            setDownvote(res.data.down_vote);
        })
    }

    function upvote_func(e:any) {
        console.log("click upvote");
        const type = props.type;
        if (type === 'question') {
            sendVote('upvote', question_id, 'post/vote');
        } else {
            const comment_id = props.comment_id;
            sendVote('upvote', comment_id, 'comment/vote');
        }
    }
    
    function downvote_func(e:any) {
        console.log("click downvote");
        const type = props.type;
        if (type === 'question'){
            sendVote('down_vote', question_id, 'post/vote');
        } else {
            const comment_id = props.comment_id;
            sendVote('down_vote', comment_id, 'comment/vote');
        }
    }

    return (
        <div className="VotePoint">
            <ArrowDropUpIcon onClick={upvote_func}/>
                {upvote - down_vote}
            <ArrowDropDownIcon onClick={downvote_func}/>
        </div>
    )
}

export default React.memo(VotePoint);
