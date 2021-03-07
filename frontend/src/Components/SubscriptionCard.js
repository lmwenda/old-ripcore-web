import React from "react";

/// Styles
import '../Styles/dist/SubscriptionCard.css';

function SubscriptionCard(){
    const mql = window.matchMedia('(max-width: 600px)');
    const phoneView = mql.matches;
    if(!phoneView){
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
    } else{
        return(
            <div className="phone-container">
                <div className="phone-card-1">
                    <hr id="liner" />
                    <h3>Free</h3>

                    <button id="phone-plan-button">Choose Plan</button>
                </div>

                <div className="phone-card-2">
                    <hr id="liner" />
                    <h3>Member</h3>
                    <button id="phone-plan-button">Choose Plan</button>
                </div>

                <div className="phone-card-3">
                    <hr id="liner" />
                    <h3>Premium</h3>
                    <button id="phone-plan-button">Choose Plan</button>
                </div>
            </div>
        );
    }
}

export default SubscriptionCard;