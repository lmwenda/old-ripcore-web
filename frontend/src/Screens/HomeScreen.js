import React from "react";
import Header from "../Components/Header";

function HomeScreen(){
    const title = "RLRecap"
    return(
        <div>
            <header>
                <Header title={title} />
            </header>
        </div>
    );
}

export default HomeScreen;