import React from 'react';
import axios from "axios";
import { Form, Button } from "react-bootstrap";

function UserUpdates() {
    const [ email, setEmail ] = React.useState("");
    const [ username, setUsername ] = React.useState("");
    const [ password, setPassword ] = React.useState("");


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

    // UPDATE ACCOUNT

    const UpdateAccount = () => {
        if(username !== "" || email !== "" || password !== ""){
            axios.put(`http://localhost:5000/api/users/me/${_id}`, {
                email: email,
                username: username,
                password: password
            })
        } else{
            return <p>Empty Fields</p>
        }
    }

    return (
        <div style={{ margin: '100px' }}>
            <h2 style={{textAlign: 'center'}}>Update Account</h2>
            <Form onSubmit={UpdateAccount}>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control id="top-input" type="email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={user.email} />   
            </Form.Group>

            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control id="input" type="text"
                onChange={(e) => setUsername(e.target.value)}
                placeholder={user.username} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control id="input" type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder={user.password} />
            </Form.Group>

            <Button variant="primary" type="submit">
                Update Account
            </Button>
            </Form>
        </div>
    )
}

export default UserUpdates;
