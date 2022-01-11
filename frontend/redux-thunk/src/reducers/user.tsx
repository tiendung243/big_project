
const initialState = {
    first_name: '',
    last_name: '',
    image: '',
    id: 0,
    company: '', 
    user_name: '',
    number_posts: 0,
    contact: '',
    email: '',
    github: '',
    website: '',
    about: ''
}

const userReducer = (state=initialState, action:any) => {
    switch(action.type) {
        case 'SET_USER_INFO':
            return action.payload;
        case 'SET_BLANK_INFO':
            return initialState;
        default: 
            return state;
    }
} 

export default userReducer;