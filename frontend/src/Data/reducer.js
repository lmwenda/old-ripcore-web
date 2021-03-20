import axios from "axios";
import { GET_USER, LOGIN, REGISTER } from "./constants";

export const initialState = {
    id: null,
    email: '',
    username: '',
    password: ''
};

const reducer = (state, action) => {    
    switch(action.type){
        case REGISTER:
            axios.post('http://localhost:5000/api/users/register', {
                email: action.email,
                username: action.username,
                password: action.password
            });

        case LOGIN:
            axios.post('http://localhost:5000/api/users/login', {
                email: action.email,
                password: action.password
            });

        case GET_USER:
            axios.get(`http://localhost:5000/api/users/user/${action.id}`)
           
        default:
            return state;
    }
}

export default reducer;