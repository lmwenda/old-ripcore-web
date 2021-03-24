import React from "react";
import { Card } from "react-bootstrap";

function Pack({ pack }){
    return(
        <Card style={{color: '#000', border: '1px solid #000'}}
         className="my-3 p-2 rounded">

            <Card.Img src={pack.image} />

            <Card.Body>
                <Card.Title>
                    <strong>{pack.name}</strong>
                </Card.Title>

            </Card.Body>
        </Card>
    );
}

export default Pack;