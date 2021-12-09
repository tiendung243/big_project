import { useState, useContext } from "react";
import axiosInstance from '../../axios';

import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function (props:any) {

    const [commentContent, setcommentContent] = useState(props.content);
    const updateComment = props.updateComment;

    const handleSubmit = (e:any) => {
        e.preventDefault();
        if (!commentContent.trim()) {
            return;
        }
        axiosInstance.put(`comment/edit/${props.comment_id}/`, {
			content: commentContent,
		}).then((res:any) => {
			const comment = res.data;
            updateComment(comment.id, comment.content);
            props.updateEditting(false);
		});
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)} className="form_comment">
            <CKEditor
                editor={ClassicEditor}
                name="postComment"
                data={commentContent}
            
                onChange={(event: any, editor: any) => {
                    const data = editor.getData();
                    setcommentContent(data);
                }}
                onBlur={(event: any, editor: any) => {
                    console.log("Blur.", editor);
                }}
                onFocus={(event: any, editor: any) => {
                    console.log("Focus.", editor);
                }}
            />
            <input type="submit" value="Submit" />
        </form>
    )
} 