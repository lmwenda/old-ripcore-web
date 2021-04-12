import React from 'react';
import ReactPlayer from "react-player";

// Styles

import '../Styles/dist/Video.css';

// Introduction Component

function Video({ youtubeUrl }) {
    
    // Instances

    ReactPlayer.canPlay(youtubeUrl);
    const playerPIP = ReactPlayer.canEnablePIP(youtubeUrl);

    return (
        <div className="introduction">
            <div className="intro-container">                
                {
                    youtubeUrl ? (
                        <ReactPlayer
                            player
                            height="300px"
                            width="500px"
                            onEnablePIP={playerPIP}
                            url={youtubeUrl}
                        />
                    ) : null
                }
            </div>
        </div>
    )
}

export default Video;
