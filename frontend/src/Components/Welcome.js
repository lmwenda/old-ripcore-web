import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { History } from "../Global/history";

function Welcome({ message, path }) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
        <Alert variant="success" 
        onClose={() => {
            setShow(false);
            History.push(path);
            window.location.reload();
        }}>
            <Alert.Heading>
                {message}
            </Alert.Heading>
        </Alert>
        );
    }
}

export default Welcome;
