import axios from 'axios';
const baseURl = 'http://127.0.0.1:8000/api/';

let axiosInstance = axios.create({
    baseURL: baseURl,
    timeout: 5000,
    headers: {
		'Authorization': localStorage.getItem('access_token')
			? 'JWT ' + localStorage.getItem('access_token'): '',
		'Content-Type': 'application/json',
		'accept': 'application/json',
	}, 
})

export default axiosInstance;
