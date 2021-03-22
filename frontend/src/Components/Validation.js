import React, { useState } from "react";
import { Alert } from "react-bootstrap";
import { History } from "../Global/history";

function Validation({ error, path }) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
        <Alert variant="danger" 
        onClose={() => {
            setShow(false);
            History.push(path);
            window.location.reload();
        }}>
            <Alert.Heading>
                {error}
            </Alert.Heading>
        </Alert>
        );
    }
}

export default Validation;
