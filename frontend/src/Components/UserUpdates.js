import React from 'react';
import axios from "axios";

function UserUpdates() {
    // STORAGE

    const _id = localStorage.getItem("_id");
    const token = localStorage.getItem('token');

    // USER OBJECT
    const [ user, setUser ] = React.useState({
        email: '',
        username: '',
        password: ''
    });

    React.useEffect(() => {

        // GETTING THE USER

        if(token){
            axios.get(`http://localhost:5000/api/users/user/${_id}`)
                .then(response => {
                    setUser({ 
                    email: response.data.email,
                    username: response.data.username, 
                    password: response.data.password });
                })
                .catch(err => console.log(err));
    }

    }, [token, _id]);

    return (
        <div>
            
        </div>
    )
}

export default UserUpdates;
