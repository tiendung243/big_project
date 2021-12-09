import './ChildComment.css';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { AnyIfEmpty, useSelector } from 'react-redux';
import { State } from '../../reducers/index';
import { useState } from 'react';

import BasicModal from '../atoms/basicModal';

import axiosInstance from '../../axios';

interface IChildComment {
    content: string,
    time: string,
    author: any,
    comment_id: number,
    deleteFunc: any
}

export default function ChildComment (props:IChildComment) {

    const userInfo = useSelector((state:State) => state.user);
    const [content, setContent] = useState(props.content);
    const [isEditting, setIsEditting] = useState(false);
    const [isShowModal, setIsShowModal] = useState(false)

    function handleSubmit (e:any) {
        e.preventDefault();
        if (!content.trim()) {
            return;
        }
        axiosInstance.put(`comment/edit/${props.comment_id}/`, {
			content: content,
		}).then((res:any) => {
            console.log('edit child comment', res);
            setIsEditting(false);
		});
    }

    function handleOnChange (e:any) {
        setContent(e.target.value);
    }

    function showEditComment (e:any){
        e.preventDefault();
        setIsEditting(true);
    }

    function showModal(e:any) {
        e.preventDefault();
        console.log("show modal");
        setIsShowModal(true);
        console.log(isShowModal);
    }

    function hideModal() {
        setIsShowModal(false);
    }
    
    function submitDeleteComment() {
        axiosInstance.delete(`comment/delete/${props.comment_id}/`)
        .then((res:any) => {
            setIsShowModal(false);
            props.deleteFunc(props.comment_id);
		});
    }

    return (
        <div className="ChildComment">
            {
                isShowModal ? 
                <BasicModal 
                    title='Confirm delete comment'
                    content='Are you sure to delete your comment?'
                    textCloseButton='Cancel'
                    textSubmitButton='Delete'
                    onClose = {() => hideModal()}
                    onSubmit = {() => submitDeleteComment()}
                /> : ''
            }
            
            {
                isEditting ?  (
                            <form onSubmit={(e) => handleSubmit(e)} className="form_reply">
                                <input className="post_reply" name="postComment" placeholder="Your reply" value={content} onChange={handleOnChange} />
                                <input type="submit" value="Submit" />
                            </form>
                        ) :
                    (
                        <>
                            <p>{content}</p> - <a href="">{props.author[1]} </a>
                            {userInfo.id === props.author[0] ? (
                            <> 
                                <a className="action-button" href="" onClick={(e) => {showEditComment(e)}}> 
                                    <EditIcon /> 
                                </a>
                                <a className="action-button" href="" onClick={(e) => {showModal(e)}}> 
                                    <DeleteIcon /> 
                                </a>  
                            </>): ''}
                        </>
                    )
            }
           
            <p>{props.time}</p>
        </div>
    )
}