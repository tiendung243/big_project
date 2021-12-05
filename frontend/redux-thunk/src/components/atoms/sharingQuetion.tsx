import './sharingQuestion.css';

import { useContext } from 'react';
import axiosInstance from '../../axios';
import {TagContext} from '../posts/postDetail';
import { useSelector } from 'react-redux';
import {State} from '../../reducers/index';

function QuestionShare(props:any) {
    const { question_id, update_following, following, author } = useContext(TagContext);

    const userInfo = useSelector((state:State) => state.user);

    function handleFollow(e:any) {
        e.preventDefault();
        axiosInstance.post('post/follow', {
            question_id: question_id
        }).then((res) => {
            if (res.data.code == 200) {
                console.log('handle change state follow un follow');
                update_following();
            }
        })
    }

    return (
        <div className="SharingQuestion">
            <a href="">Share</a>
            <a href="" onClick={(e) => handleFollow(e)}>{following ? 'Unfollow':'Follow'}</a>
            {
                author.id === userInfo.id ? (
                    <a href={`edit/${question_id}`}>Edit</a>
                ) : ''
            }
        </div>
    )
}

export default QuestionShare;
