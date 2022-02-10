import React, {useState} from 'react';
import './header.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import SearchBar from 'material-ui-search-bar';
import { useHistory } from 'react-router-dom';
import {State} from '../reducers/index';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	appBar: {
		borderBottom: `1px solid ${theme.palette.divider}`,
		position: 'sticky',
		top: 0
	},
	link: {
		margin: theme.spacing(1, 1.5),
	},
	toolbarTitle: {
		flexGrow: 1,
	},
}));

function Header() {
	const classes = useStyles();
	const dispatch = useDispatch();
	let history = useHistory();
	const [data, setData] = useState({ search: '' });
	const userInfo = useSelector((state:State) => state.user);
	const goSearch = (e:any) => {
		history.push({
			pathname: '/search/',
			search: '?search=' + data.search,
		});
		window.location.reload();
	};

	const handleLogout = () => {
		dispatch({type:'SET_BLANK_INFO', payload:{}})
	}

	return (
		<React.Fragment>
			<CssBaseline />
			<AppBar
				position="static"
				color="default"
				elevation={0}
				className={classes.appBar}
			>
				<Toolbar>
					<Typography
						variant="h6"
						color="inherit"
						noWrap
						className={classes.toolbarTitle}
					>
						<Link
							component={NavLink}
							to="/"
							underline="none"
							color="textPrimary"
						>
							Blog
						</Link>
					</Typography>
					<SearchBar
						className="header__searchbar"
						value={data.search}
						onChange={(newValue) => setData({ search: newValue })}
						onRequestSearch={() => goSearch(data.search)}
					/>
					
					{
						userInfo.id ? (
						<>
							<a href="/user" className="avatar__icon-header">
								<img src={userInfo.image} alt="" />
							</a>
							<Button
								href="#"
								color="primary"
								variant="outlined"
								className={classes.link}
								component={NavLink}
								onClick={handleLogout}
								to="/logout"
							>
								Logout
							</Button>
						</>
						) : (
							<>
								<nav>
									<Link
										color="textPrimary"
										href="#"
										className={classes.link}
										component={NavLink}
										to="/register"
									>
										Register
									</Link>
								</nav>
								
								<Button
									href="#"
									color="primary"
									variant="outlined"
									className={classes.link}
									component={NavLink}
									to="/login"
								>
									Login
								</Button>
							</>
						)
					}
					
				</Toolbar>
			</AppBar>
		</React.Fragment>
	);
}

export default Header;
