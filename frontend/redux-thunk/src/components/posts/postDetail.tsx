import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';
import { useParams } from 'react-router-dom';
import './postDetail.css';
//MaterialUI
import Container from '@material-ui/core/Container';
import ButtonAddQuestion from '../atoms/addQuestion';
import VotePoint from '../atoms/votePoint';
import CommentContent from '../atoms/commentContent';
import QuestionTag from '../atoms/tag';

export default function Post() {
	const { id } : {id : string} = useParams();
	console.log("detail");

    interface Ipost {
        posts: {
            title: string,
            excerpt: string,
			content: string
        }
    };

	const [data, setData] = useState<Ipost>({ posts:{title:'', excerpt:'', content: ''}});

	useEffect(() => {
		axiosInstance.get('post/' + id).then((res) => {
			setData({ posts: res.data });
			console.log(res.data);
		});
	}, [setData]);

	return (
		<Container component="main" maxWidth="md">
			<div className="PostDetail">
				<div className="PostDetail-header">
					<div className="header-left">
						<p className='header-title'>{data.posts.title}</p>
						<div className="question-info">
							<p> Asked 7 years, 6 months ago</p>
							<p>Viewed 58k times</p>
						</div>
					</div>
					<div className="header-right">
						<ButtonAddQuestion />
					</div>
				</div>
				<div className="QuestionContent">
					<VotePoint />
					<CommentContent />
				</div>
				<div className="TagContainer">
					<QuestionTag name="javascript" />
					<QuestionTag name="nodejs" />
				</div>
			</div>
		</Container>
	);
}