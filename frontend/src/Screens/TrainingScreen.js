import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Row, Col } from "react-bootstrap";

import Pack from "../Components/Pack";
import Header from '../Components/Header';

import '../Styles/dist/TrainingScreen.css';

function TrainingScreen() {
    const [ packs, setPacks ] = useState([]);

    const title = "RIP Core";

    useEffect(() => {
        async function getProducts(){
          const { data } = await axios.get("http://locahost:5000/api/pack/");
          console.log(data);
          setPacks(data);
        }
    
        getProducts();
    }, [])

    return (
        <div className="trainingscreen">

            <header>
                <Header title={title} />
            </header>

            <br />

            <div className="packscreen_packs">
                <Row>
                    <Col>
                        <h1>Training Packs</h1>
                        <div className="data">
                            {
                                packs ? (
                                    packs.map(pack => (
                                        <div style={{ border: '1px solid #000'}}>
                                            <Pack pack={pack} /> 
                                        </div>   
                                    ))
                                ) : (
                                    <div style={{border: '1xp solid #000'}}>
                                        <h3>No Packs currently available.</h3>
                                    </div>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default TrainingScreen;
