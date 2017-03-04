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

    if (getCurrentState() === 1) {
        selectTeamState(callback);
    }
});

const callback = (client) => {
    state.client = client;
    setState(2);
};

// const selectTeam = () => {
//     var gamedata = selectTeamState(callback);
//     if (gamedata) {
//         console.log('Ya terminaron de seleccionar equipos');
//     }
// };

// selectTeam();
