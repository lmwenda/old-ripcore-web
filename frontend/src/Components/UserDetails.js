import React from 'react';
import axios from 'axios';
import { Form } from "react-bootstrap";

function UserDetails() {

    // STORAGE

    const _id = localStorage.getItem('_id');
    const token = localStorage.getItem('token');

    // USER OBJECT
    const [ user, setUser ] = React.useState({
        id: _id,
        email: '',
        username: '',
        password: ''
    });

    React.useEffect(() => {

        // GETTING THE USER

        if(token){
        axios.get(`http://localhost:5000/api/users/user/${_id}`)
        .then(response => {
          setUser({ email: response.data.email, username: response.data.username });
        })
        .catch(err => console.log(err));
    }

    }, [token, _id]);

    return (
        <div style={{margin: '100px'}} className="userdetails">
            <h1 style={{textAlign: 'center'}}>User Details</h1>
            <Form.Control type="text" placeholder={`ID: ${_id}`} readOnly />
            <Form.Control type="text" placeholder={`Email: ${user.email}`} readOnly />
            <Form.Control type="text" placeholder={`Username: ${user.username}`}
             readOnly />
        </div>
    )
}

export default UserDetails;
