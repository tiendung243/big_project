import './sharingQuestion.css';

import { useContext } from 'react';
import axiosInstance from '../../axios';
import {TagContext} from '../posts/postDetail';
import { useSelector } from 'react-redux';
import {State} from '../../reducers/index';

function CommentFollow(props:any) {

    const userInfo = useSelector((state:State) => state.user);
    const { update_following } = useContext(TagContext);

    function handleFollow(e:any) {
        e.preventDefault();
        axiosInstance.post('comment/follow', {
            comment_id: props.comment_id
        }).then((res) => {
            if (res.data.code == 200) {
                update_following();
            }
        })
    }

    return (
        <div className="SharingQuestion">
            <a href="" onClick={(e) => handleFollow(e)}>Follow</a>
            <a href="">Edit</a>
        </div>
    )
}

export default CommentFollow;
