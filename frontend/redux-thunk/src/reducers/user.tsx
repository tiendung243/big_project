
const initialState = {
    first_name: '',
    last_name: '',
    image: '',
    username: '',
    id: 0
}

const userReducer = (state=initialState, action:any) => {
    switch(action.type){
        case 'SET_USER_INFO':
            return action.payload;
        case 'SET_BLANK_INFO':
            return initialState;
        default: 
            return state;
    }
} 

export default userReducer;