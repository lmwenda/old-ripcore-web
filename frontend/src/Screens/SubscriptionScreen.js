import React from "react";

import "../Styles/dist/SubscriptionScreen.css";

// Components
import Header from "../Components/Header";
import SubscriptionCard from "../Components/SubscriptionCard";

function SubscriptionScreen(){
    const title = "Rip Core";
    return(
        <div>
            <header>
                <Header title={title} activeSub={true} />
            </header>

            <br />

            <section id="wrapper">
                <SubscriptionCard />
            </section>
        </div>
    );
}

export default SubscriptionScreen;