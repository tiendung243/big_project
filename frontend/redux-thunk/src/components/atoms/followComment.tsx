import './sharingQuestion.css';

import { useContext } from 'react';
import axiosInstance from '../../axios';
import { useSelector } from 'react-redux';
import {State} from '../../reducers/index';

function CommentFollow(props:any) {

    const userInfo = useSelector((state:State) => state.user);
    const {updateFollowing, comment_id, following, updateEditting} = props.data;

    function handleFollow(e:any) {
        e.preventDefault();
        axiosInstance.post('comment/follow', {
            comment_id: comment_id
        }).then((res) => {
            if (res.data.code == 200) {
                updateFollowing();
            }
        })
    }

    function handleUpdateEditting (e:any) {
        e.preventDefault();
        updateEditting(true);
    }

    return (
        <div className="SharingQuestion">
            <a href="" onClick={(e) => handleFollow(e)}>{following ? 'Unfollow':'Follow'}</a>
            <a href="" onClick={(e) => handleUpdateEditting(e)}>Edit</a>
        </div>
    )
}

export default CommentFollow;
