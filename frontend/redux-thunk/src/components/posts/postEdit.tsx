import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useHistory, useParams } from 'react-router-dom';
//MaterialUI
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import slugify from '../../common';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function Edit() {
	const history = useHistory();
	const { id } : {id : string} = useParams();
	console.log("edit");
	const initialFormData = Object.freeze({
		id: '',
		title: '',
		slug: '',
		excerpt: '',
		content: '',
	});

	const [formData, updateFormData] = useState(initialFormData);

	useEffect(() => {
		axiosInstance.get('post/' + id).then((res) => {
			updateFormData({
				...formData,
				['title']: res.data.title,
				['excerpt']: res.data.excerpt,
				['slug']: res.data.slug,
				['content']: res.data.content,
			});
			console.log(res.data);
		});
	}, [updateFormData]);

	const handleChange = (e:any) => {
		if (e.target.name == 'title') {
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
			author: 1,
			excerpt: formData.excerpt.trim(),
			content: formData.content.trim(),
		});
		history.push({
			pathname: '/',
		});
		window.location.reload();
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="sm">
			<CssBaseline />
			<div className={classes.paper}>
				<Typography component="h1" variant="h5">
					Edit Post
				</Typography>
				<form className={classes.form} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12}>
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
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="excerpt"
								label="Post Excerpt"
								name="excerpt"
								autoComplete="excerpt"
								value={formData.excerpt}
								onChange={handleChange}
								multiline
								rows={8}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="slug"
								label="slug"
								name="slug"
								autoComplete="slug"
								value={formData.slug}
								onChange={handleChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="content"
								label="content"
								name="content"
								autoComplete="content"
								value={formData.content}
								onChange={handleChange}
								multiline
								rows={8}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={handleSubmit}
					>
						Update Post
					</Button>
				</form>
			</div>
		</Container>
	);
}