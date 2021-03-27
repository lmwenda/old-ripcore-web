import React from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

import Header from '../Components/Header';

import '../Styles/dist/SetAdminScreen.css';

function SetAdminScreen() {
    const [ foundUser, setFoundUser ] = React.useState(false);
    const [ user, setUser ] = React.useState({
        id: '',
        email: '',
        username: ''
    });

    const RemoveAdmin = (e) => {
        // Stop the Page from Refreshing when the User Submits the Form
        e.preventDefault();

        // Remove the User from Admin
        
        axios.put(`http://localhost:5000/api/users/setadmin/${user.id}`, {
            isAdmin: false,
        })
            .then(response => {

                // Getting the Response and Setting the Found User to True
                setFoundUser(true);
                console.log(response);
                
                // Getting the User
                axios.get(`http://localhost:5000/api/users/user/${user.id}`)
                .then((response) => {
                    setUser({
                        email: response.data.email,
                        username: response.data.username,
                    });
                })
                .catch((err) => console.log(err));

            })
            .catch(err => console.log(err));
    }

    const SetAdmin = (e) => {
        // Stop the Page from Refreshing when the User Submits the Form
        e.preventDefault();

        // Setting the User to Admin
        
        axios.put(`http://localhost:5000/api/users/setadmin/${user.id}`, {
            isAdmin: true,
        })
            .then(response => {

                // Getting the Response and Setting the Found User to True
                setFoundUser(true);
                console.log(response);
                
                // Getting the User
                axios.get(`http://localhost:5000/api/users/user/${user.id}`)
                .then((response) => {
                    setUser({
                        email: response.data.email,
                        username: response.data.username,
                    });
                })
                .catch((err) => console.log(err));

            })
            .catch(err => console.log(err));

    }

    return (
        <div className="set-admin-screen">
            <header>
                <Header title="RIP Core Admin" />
            </header>

            <br />

            <div className="set-admin-screen-user">
                {
                    foundUser ? (
                        <div>
                            <h3>Set User to Admin:</h3>
                            <Form.Control type="text" placeholder={`Email: ${user.email}`} readOnly />
                            <Form.Control
                                type="text"
                                placeholder={`Username: ${user.username}`}
                                readOnly
                            />

                        </div>
                    ) : (
                    <div>
                        <h3>No User Found</h3>
                    </div>
                )
                }
            </div>

            <div className="set-admin-screen-form">

                <h2 style={{textAlign: 'center'}}>Set User Admin</h2>

                <br />

                <Form onSubmit={SetAdmin}>

                    <Form.Group>
                        <Form.Label>ID</Form.Label>
                        <Form.Control id="input" type="text"
                        onChange={(e) => setUser({ id: e.target.value })}
                        placeholder={user.id} />
                    </Form.Group>

                    <Button variant="primary" onClick={SetAdmin} type="submit">
                        Set Admin
                    </Button>
                    <Button style={{marginLeft: '10px'}} 
                    variant="danger" onClick={RemoveAdmin} type="submit">
                        Remove Admin
                    </Button>
                </Form>
            </div>
        </div>
    )
}

export default SetAdminScreen;
