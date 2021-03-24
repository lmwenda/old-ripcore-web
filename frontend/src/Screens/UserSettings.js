import React from 'react'
import { Button } from "react-bootstrap";

import Header from '../Components/Header';
import Show from '../Components/Modal';
import UserDetails from '../Components/UserDetails';

import '../Styles/dist/UserSettings.css';

function UserSettings() {
    const [ page, setPage ] = React.useState("");
    const [ active, setActive ] = React.useState(false);

    return (
        <div className="usersettings">
            {/* <header>
                <Header title="RIP Core" />
            </header> */}

            <div className="usersettings_sidebar">
                <h3>Account Settings</h3>

                <br />
                <hr />
                <br />

                <div>
                    <Button style={{marginBottom: '5px'}}>
                        Account Details
                    </Button>

                    <Button style={{marginBottom: '5px'}}>
                        Update Account
                    </Button>

                    <Show cause="Delete Account" 
                    title="Are you sure you want to delete your Account?" 
                    firstButton="Delete Account" secondButton="Cancel"
                    />

                </div>
            </div>

            <div className="usersettings_main">
                <UserDetails />
            </div>
        </div>
    )
}

export default UserSettings;
