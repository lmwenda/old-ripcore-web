import React from "react";

// Components
import Header from "../Components/Header";

function DownloadScreen(){
    const title = "Rip Core";
    return(
        <div>
            <header>
                <Header title={title} />
            </header>
            
            <br />

            <section className="container">
                <h1 style={{color: '#000'}}>Download GUI Client</h1>
            </section>
        </div>
    );
}

export default DownloadScreen;