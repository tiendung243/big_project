import React from 'react';
import { useSelector } from 'react-redux';
import {State} from '../../reducers/index';
import './user.css';

import Container from '@material-ui/core/Container';
import {Tabs, Tab, AppBar, Box} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';

import QuestionRow from '../molecules/QuestionRow';

const FAKE_DATA = [
    {
        id: 1,
        title: "title",
        comment: 2,
        view: 24,
        vote: 12,
        created: '2 days ago',
        author: {
            id: 2,
            first_name: "dungnt"
        },
        tags: ['javascript', 'css', 'html']
    },
    {
        id: 2,
        title: "title2",
        comment: 3,
        view: 25,
        vote: 13,
        created: '3 days ago',
        author: {
            id: 3,
            first_name: "dungnt2"
        },
        tags: ['javascript', 'css']
    },
    {
        id: 3,
        title: "title3",
        comment: 4,
        view: 3,
        vote: 32,
        created: '4 days ago',
        author: {
            id: 4,
            first_name: "dungnt4"
        },
        tags: ['css', 'html']
    }
            
]
function User(props:any) {

    const TabContext = React.createContext({});
    const [activeTab, setActiveTab] = React.useState(0);

    const HandleTabs = (e:any, value:any) => {
        setActiveTab(value);
    }

    const userInfo = useSelector((state:State) => state.user);

    return (
        <Container maxWidth="md" component="main">
            <div className='Basic__Infor'>
                <div className='title_edit-button'>
                    <h3>Basic information</h3>
                    <Button className='btn-edit-user'
                        href={`/user/edit`}
                        variant="contained"
                        color="primary"
                    >
                        Edit
                    </Button>
                </div>
                <div className='Basic__Infor-container'>
                    <div className='Basic__Infor-image'>
                        <img src={userInfo.image} alt="" />
                    </div>
                    <div className='Basic__Infor-info'>
                        <div className='infor-left'>
                            <InfoItem value = {`${userInfo.first_name} ${userInfo.last_name}`} title='Name' />
                            <InfoItem value = {userInfo.company} title='Company' />
                            <InfoItem value = {userInfo.user_name} title='Username'/>
                            <InfoItem value = {userInfo.number_posts} title='Number posts'/>
                            <InfoItem value = {userInfo.about} title='About'/>

                        </div>
                        <div className='infor-right'>
                            <InfoItem value = {userInfo.contact} title='Contact'/>
                            <InfoItem value = {userInfo.email} title='Email' />
                            <InfoItem value = {userInfo.github} title='Github' />
                            <InfoItem value = {userInfo.website} title='Website' />
                        </div>
                    </div>
                </div>
            </div>

            <div className="Other__Infor">
                <AppBar position='static'>
                    <Tabs value={activeTab} onChange={HandleTabs}>
                        <Tab label="Your questions"></Tab>
                        <Tab label="Followed Question"></Tab>
                    </Tabs>
                </AppBar>
                <TabPanel value={activeTab} index={0}>
                    <ItemTab url='item 2'/> 
                </TabPanel>
                <TabPanel value={activeTab} index={1}>
                    <ItemTab url='item 3'/> 
                </TabPanel>
            </div>
        </Container>
    )
}


function TabPanel(props: any) {
    const {value, index, children} = props;
    console.log(value, index)
    return (
        <React.Fragment>
            {value === index ? <h1>{children}</h1> : ''}
        </React.Fragment>
    );
}

function InfoItem(props:any) {
    return (
        <div className="infor-item">
            <p className='title'> {props.title}: </p>
            <p className='value'> {props.value} </p>
        </div>
    )
}

function ItemTab(props:any) {

    interface IAuthor {
		id: number,
		first_name: string
	}

	interface IPost {
		id: number,
		title: string,
		comment: number,
		view: number,
		vote: number,
		created: string,
		author: IAuthor,
		tags: string[]
	}

    return (
        <TableContainer>
            <Table stickyHeader aria-label="sticky table">
                <TableBody>
                    {FAKE_DATA.map((post:IPost) => {
                        return (
                            <TableRow>
                                <QuestionRow post={post}/>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default React.memo(User);
