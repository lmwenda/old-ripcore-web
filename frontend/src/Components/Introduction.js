import React from 'react';
import ReactPlayer from "react-player";
import { IconButton } from '@material-ui/core';

import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

import Socials from './Socials';
import HomeScreen from "../Screens/HomeScreen";

// Styles


// Introduction Component

function Introduction({ title, description, youtubeUrl, scrollUp, scrollDown }) {
    const [ toNode, setToNode ] = React.useState(false);
    const [ fromNode, setFromNode ] = React.useState(false);

    ReactPlayer.canPlay(youtubeUrl);
    const playerPIP = ReactPlayer.canEnablePIP(youtubeUrl);

    // OnClick Functions

    const ScrollTo = () => {
        setToNode(true);
    }

    const ScrollFrom  = () => {
        setFromNode(true);
    }

    return (
        {
            fromNode ? <HomeScreen /> : toNode ? <Socials /> : (
                <div>                
                    {
                        scrollUp ? (
                            <div>
                                <IconButton>
                                    <ArrowUpwardIcon />
                                </IconButton>
                            </div>
                        ) : null
                    }

                    <h1>{title}</h1>

                    {
                        youtubeUrl ? (
                            <ReactPlayer
                                player
                                onEnablePIP={playerPIP}
                                url={youtubeUrl}
                            />
                        ) : description ? <p>{description}</p> : null
                    }

                    {
                        scrollDown ? (
                            <div>
                                <IconButton onClick={ScrollFrom}>
                                    <ArrowDownwardIcon />
                                </IconButton>
                            </div>
                        ) : null
                    }
                </div>
            )
        }
    )
}

export default Introduction;
