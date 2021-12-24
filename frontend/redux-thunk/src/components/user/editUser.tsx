import { Container } from "@material-ui/core";
import './editUser.css';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { createContext, useEffect, useReducer, useState } from "react";

import Button from '@material-ui/core/Button';

function reducer(state:any, action:any) {
    switch(action.type){
        case 'Change_Data':
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default:
            return state;
    }
}

function InfoItem (props:any) {
    const {name, title, value, onChangeState} = props;
    return (
        <div className="infor-item">
            <p className='title'> {title}: </p>
            <input value={value} type="text" name={name} onChange={(e) => {onChangeState(e) }} className="Edit_user-input"/>
        </div>
    )
}

function EditUser(props:any) {

    const initialData = {
        name: 'Nguyen Tien Dung',
        birthday: '24/03/1999',
        username: 'dungnt',
        number_posts: 9,
        contact: '0327670530',
        email: 'tiendungthemen243@gmail.com',
        github: 'tiendung2403',
        website: 'itlearn.com'
    }

    const [ avatar, setAvatar ] = useState('https://picsum.photos/200');
    const [ data, dispatch ] = useReducer(reducer, initialData);

    const handleChangeState = (e:any) => {
        dispatch({type:'Change_Data', payload: {name: e.target.name, value: e.target.value}})
    }

    const handleChangeAvatar = (e:any) => {
        const file = e.target.files[0];
        setAvatar(URL.createObjectURL(file));
    }

    useEffect(() => {
        return () => {
            avatar && URL.revokeObjectURL(avatar);
        }
    }, [avatar])

    return (
        <Container maxWidth="md" component="main">
            <div className='Basic__Infor Basic__Infor-edit'>
                <h3>Basic information</h3>
                <div className='Basic__Infor-container'>
                    <div className='Basic__Infor-image Basic__Infor-image-edit'>
                        <img src={avatar} />
                        <input type="file" name="avatar" id="avatar" style={{'display':'none'}} onChange={handleChangeAvatar}/>
                        <label htmlFor="avatar">
                            <PhotoCameraIcon />
                        </label>
                    </div>
                    <div className='Basic__Infor-info'>
                        <div className='infor-left'>
                            <InfoItem value = {data.name} title='Name' name='name' onChangeState={handleChangeState}/>
                            <InfoItem value = {data.birthday} title='Birthday' name='birthday' onChangeState={handleChangeState}/>
                            <InfoItem value = {data.username} title='Username' name='username' onChangeState={handleChangeState}/>
                            <InfoItem value = {data.number_posts} title='Number posts' name='number_posts' onChangeState={handleChangeState}/>
                        </div>
                        <div className='infor-right'>
                            <InfoItem value = {data.contact} title='Contact' name='contact' onChangeState={handleChangeState}/>
                            <InfoItem value = {data.email} title='Email' name='email' onChangeState={handleChangeState}/>
                            <InfoItem value = {data.github} title='Github' name='github' onChangeState={handleChangeState}/>
                            <InfoItem value = {data.website} title='Website' name='website' onChangeState={handleChangeState}/>
                        </div>
                    </div>
                </div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Update Info
                </Button>
            </div>
        </Container>
    )
}

export default EditUser;
