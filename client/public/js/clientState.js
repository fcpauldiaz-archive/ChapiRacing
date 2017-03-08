const socket = io();

let state = {
    actualState: 1,
    actualStateString: 'selectTeam',
    client: {}
};

const getState = () => {
    return state;
};
const getCurrentState = () => {
    return state.actualState;
};

const setNewClient = (newClient) => {
    state.client.players = newClient;
}

const setState = (actualState) => {
    let stateString = '';
    switch(actualState){
        case 1:
            stateString = 'selectTeam';
            break;
        case 2:
            stateString = 'play';
            break;
        default:
            stateString = 'selectTeam';
    }

    state.actualState = actualState;
    state.actualStateString = stateString;
};

let methods = {
    getCurrentState: getCurrentState,
    setState: setState
}

socket.on('onconnected', (data) => {
    // console.log(data);
    state.client.localplayer = data.player;
    state.client.id = data.player_id;
    state.client.game_id = data.game_id;
    console.log(state.client);

    main();
});

const selectTeamCallback = (client) => {
    state.client = client;
    setState(2);
    console.log('callback activated ' + state.actualStateString);
    socket.emit('play', { 
        play: true
    });
    main();
};

const playCallback = (data) => {
    console.log(data);
}

const main = () => {
    if (getCurrentState() === 1) {
        console.log("lets select the team");
        selectTeamState(selectTeamCallback);
    }

    if (getCurrentState() === 2) {
        console.log("lets play");
        document.getElementById('canvasContainer').innerHTML = '<canvas id="canvas"></canvas>';
        // console.log('newState');
        // console.log(getState().client);
        playState(playCallback);
    }
}
