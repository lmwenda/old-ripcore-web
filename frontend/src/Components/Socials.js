import React from 'react';
import { IconButton } from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

function Socials({ title, description, media }) {

    const ScrollFrom = () => {
        window.location.reload();
    }

    return (
        <div>
            <IconButton onClick={ScrollFrom}>
                <ArrowUpwardIcon />
            </IconButton>

            <h1>{title}</h1>
            <p>{description}</p>
        </div>
    )
}

export default Socials;
