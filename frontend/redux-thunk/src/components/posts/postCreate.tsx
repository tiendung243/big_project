import React, { useState } from 'react';
import axiosInstance from '../../axios';
import { useHistory } from 'react-router-dom';
import './postCreate.css';
//MaterialUI
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import {slugify} from '../../common';

import {CKEditor} from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Cookies from 'js-cookie';

export default function Create() {
	const history = useHistory();
	const initialFormData = Object.freeze({
		title: '',
        slug: '',
		content: '',
		tags: ''
	});
    console.log("create");

	const [formData, updateFormData] = useState(initialFormData);

	const handleChange = (e:any) => {
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
		axiosInstance
			.post(`post/create/`, {
				title: formData.title.trim(),
                slug: formData.slug.trim(),
				content: formData.content.trim(),
			})
			.then((res) => {
				history.push('/');
			});
	};
	const csrfCookie = Cookies.get('csrftoken');
	console.log('csrfCookie', csrfCookie);

	const base_url = window.location.origin;

	return (
		<Container component="main" maxWidth="md">
			<div className="QuestionCreate">
				<h1>
					Ask a public question
				</h1>
				<form>
					<TextField
						variant="outlined"
						required
						fullWidth
						id="title"
						label="Title of your question"
						name="title"
						onChange={handleChange}
						className="question-title"
					/>
					{/* <TextField
						variant="outlined"
						required
						fullWidth
						id="content"
						label="More about your question. You can use markdown here"
						name="content"
						onChange={handleChange}
						multiline
						rows={6}
						className="question-content"
					/> */}
					<TextField
						variant="outlined"
						required
						fullWidth
						id="tag"
						label="You can add related tags here"
						name="tag"
						onChange={handleChange}
						className="question-tag"
					/>
					<CKEditor
						editor={ClassicEditor}
						name="content"
						data=""
						
						onChange={(event: any, editor: any) => {
							const data = editor.getData();
							updateFormData({
								...formData,
								content: data,
							});
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
						Post question
					</Button>
				</form>
			</div>
		</Container>
	);
}