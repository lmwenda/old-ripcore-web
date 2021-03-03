import React from "react";

/// Styles
import '../Styles/dist/SubscriptionCard.css';

function SubscriptionCard(){
    return(
        <div className="container">
            <div className="card-1">
                <hr id="liner" />
                <h3>Free</h3>

                <button id="plan-button">Choose Plan</button>
            </div>

            <div className="card-2">
                <hr id="liner" />
                <h3>Member</h3>
                <button id="plan-button">Choose Plan</button>
            </div>

            <div className="card-3">
                <hr id="liner" />
                <h3>Premium</h3>
                <button id="plan-button">Choose Plan</button>
            </div>
        </div>
    );
}

export default SubscriptionCard;