import React, { useEffect } from 'react';
import Engine from './engine/index';

function Game() {

    useEffect(() => {
        Engine();
    });

    return <div id="game"></div>;
}

export default Game;
