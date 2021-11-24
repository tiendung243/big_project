import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
import './postCreate.css';
//MaterialUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { slugify } from '../../common';

import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";


export default function Edit() {
	const history = useHistory();
	const { id } : {id : string} = useParams();
	console.log("edit");
	const initialFormData =  Object.freeze({
		title: '',
		slug: '',
		tags: ''
	});

	const [formData, updateFormData] = useState(initialFormData);
	const [contentEdited, updateContent] = useState('');

	useEffect(() => {
		axiosInstance.get('post/' + id).then((res) => {
			console.log('before get data', formData)
			updateFormData({
				['title']: res.data.title,
				['slug']: res.data.slug,
				['tags']: res.data.tags.join(' ')
			});
			updateContent(res.data.content);
			console.log('result data', res.data);
		});
	}, [updateFormData]);
	
	console.log('edit data', formData);

	const handleChange = (e:any) => {
		console.log('handle change');
		if (e.target.name === 'title') {
			updateFormData({
				...formData,
				// Trimming any whitespace
				[e.target.name]: e.target.value,
				slug: slugify(e.target.value),
			});
		} else {
			updateFormData({
				...formData,
				// Trimming any whitespace
				[e.target.name]: e.target.value,
			});
		}
	};

	const handleSubmit = (e:any) => {
		e.preventDefault();
		console.log(formData);

		axiosInstance.put(`post/edit/` + id + '/', {
			title: formData.title.trim(),
			slug: formData.slug.trim(),
			content: contentEdited.trim(),
			tags: formData.tags.trim()
		}).then((res => {
			history.push(`/post/${id}`);
		}));
	};


	return (
		<Container component="main" maxWidth="md">
			<div className="QuestionCreate">
				<h1>
					Edit Post
				</h1>
				<form >
					<TextField
						variant="outlined"
						required
						fullWidth
						id="title"
						label="Post Title"
						name="title"
						autoComplete="title"
						value={formData.title}
						onChange={handleChange}
					/>
					<TextField
						variant="outlined"
						required
						fullWidth
						value={formData.tags}
						id="tags"
						label="You can add related tags here"
						name="tags"
						onChange={handleChange}
						className="question-tag"
					/>
					<CKEditor
						editor={ClassicEditor}
						name="content"
						data={contentEdited}
						onChange={(event: any, editor: any) => {
							const update_content = editor.getData();
							updateContent(update_content);
						}}
						onBlur={(event: any, editor: any) => {
							console.log("Blur.", editor);
						}}
						onFocus={(event: any, editor: any) => {
							console.log("Focus.", editor);
						}}
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						onClick={handleSubmit}
					>
						Update Post
					</Button>
				</form>
			</div>
		</Container>
	);
}