import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './editUser.css';

import { Container } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';

import axiosInstance from "../../axios";
import {State} from '../../reducers/index';

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
    const dispatch = useDispatch();
    let history = useHistory();
    const imgRef = useRef<HTMLInputElement>(null);
    const initialData = useSelector((state:State) => state.user);
    console.log("initialData", initialData);
    const [ avatar, setAvatar ] = useState(initialData.image);
    const [data, setData] = useState(initialData);
    console.log(data);

    useEffect(() => {
        if(initialData?.image) {
            setAvatar(initialData.image);
        }
        setData(initialData);
    }, [initialData]);

    console.log(avatar, data);

    const handleChangeState = (e:any) => {
        console.log(data);
        setData({
            ...data, [e.target.name]: e.target.value
        });
    }

    const handleSubmit = () => {
        let formData = new FormData();
        const files = imgRef.current && imgRef.current.files;
        let file:any = '';
        if (files) {
            file = files[0];
        }
        formData.append("avatar", file);
        formData.append("first_name", data.first_name);
        formData.append("last_name", data.last_name);
        formData.append("company", data.company);
        formData.append("github", data.github);
        formData.append("website", data.website);
        formData.append("contact", data.contact);
        formData.append("email", data.email);
        formData.append("about", data.about);
        axiosInstance({
            method: "post",
            url: `user/edit`, 
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        }).then((response) => {
            console.log('response data', response.data.data);
            dispatch({type:'UPDATE_USER_INFO', payload:response.data.data});
            history.push('/user');
        })
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
                        <input type="file" name="avatar" ref={imgRef} id="avatar" style={{'display':'none'}} onChange={handleChangeAvatar}/>
                        <label htmlFor="avatar">
                            <PhotoCameraIcon />
                        </label>
                    </div>
                    <div className='Basic__Infor-info'>
                        <div className='infor-left'>
                            <InfoItem value = {data.first_name} title='First Name' name='first_name' onChangeState={handleChangeState}/>
                            <InfoItem value = {data.last_name} title='Last Name' name='last_name' onChangeState={handleChangeState}/>
                            <InfoItem value = {data.company} title='Company' name='company' onChangeState={handleChangeState}/>
                            <InfoItem value = {data.about} title='About' name='about' onChangeState={handleChangeState}/>
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
                    onClick={handleSubmit}
                >
                    Update Info
                </Button>
            </div>
        </Container>
    )
}

export default EditUser;
