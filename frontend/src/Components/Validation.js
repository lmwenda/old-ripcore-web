import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { History } from "../Global/history";

function Validation({ error }) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
        <Alert variant="danger" 
        onClose={() => {
            setShow(false);
            History.push('/signup');
            window.location.reload();
        }}
        dismissible>
            <Alert.Heading>
                {error}
            </Alert.Heading>
        </Alert>
        );
    }
}

export default Validation;
