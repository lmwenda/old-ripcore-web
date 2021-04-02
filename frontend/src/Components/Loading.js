import React from 'react';
import { Spinner } from "react-bootstrap";

class Loading extends React.Component{
    state = {
        loading: true
    }

    async componentDidMount(){
        await new Promise((resolve) => setTimeout(resolve, 2000));
        this.state.loading = false;
    }

    render(){
        if(this.state.loading){
            return(
                <div>
                    <Spinner
                        animation='border'
                        role='status'
                        style={{
                            height: '100px',
                            width: '100px',
                            margin: 'auto',
                            display: 'block'
                        }}
                    >
                        <span className='sr-only'>Loading...</span>
                    </Spinner>
                </div>
            )
        } else{
            return;
        }
    }
}

export default Loading;