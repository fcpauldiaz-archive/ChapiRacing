let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");
const socket = io('http://localhost:4004');

const stats = new Stats();
stats.showPanel(0);
 // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild( stats.dom );

canvas.width = 761;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "client/public/images/mapa_inicial.jpg";

let actual_team = -1;
let change_team = false;


function ChapiRacing(user_player) {

}

let client = {
    id: '',
    game_id: '',
    localplayer: 2,
    players: [
        {
            number: 1,
            team: -1,
            x: 390,
            y: 250
        }, {
            number: 2,
            team: -1,
            x: 390,
            y: 400
        }, {
            number: 3,
            team: -1,
            x: 390,
            y: 550
        }, {
            number: 4,
            team: -1,
            x: 390,
            y: 700
        }
    ],
    speed: 700,
    game_id: 1
}

// var client = ChapiRacing(1, 1);
let playerIndex = client.localplayer - 1;
let keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Update: Funcion para tomar el movimiento atraves del teclado
//      tiene como fin el seleccionar un equipo
const update = (modifier) => {
    actual_team = client.players[playerIndex].team;
    // Left key
    if (37 in keysDown) {
        client.players[playerIndex].x -= client.speed * modifier;
        // Definimos el limite para que no se salga de la pantalla
        // a la izquierda
        if (client.players[playerIndex].x <= 70) {
            client.players[playerIndex].x = 70;
        }
    }

    // Right key
    if (39 in keysDown) {

        client.players[playerIndex].x += client.speed * modifier;

        if (client.players[playerIndex].x >= 685) {
            client.players[playerIndex].x = 685;
        }
    }

    // Calculate the team select
    if (client.players[playerIndex].x >= 0 && client.players[playerIndex].x <= 300) {
        if (actual_team !== 1) {
            change_team = true;
            actual_team = 1;
            client.players[playerIndex].team = 1;
        }
    } else if (client.players[playerIndex].x >= 300 && client.players[playerIndex].x <= 560) {
        if (actual_team !== -1) {
            change_team = true;
            actual_team = -1;
            client.players[playerIndex].team = -1;
        }
    } else if (client.players[playerIndex].x >= 565 && client.players[playerIndex].x <= 960) {
        if (actual_team !== 2) {
            change_team = true;
            actual_team = 2;
            client.players[playerIndex].team = 2;
        }
    }

    if ((37 in keysDown || 39 in keysDown) && change_team) {
      console.log(client);
      change_team = false;
    }
};

// Draw everything
const render = () => {
    ctx.beginPath();
    ctx.arc(client.players[0].x,250,50,0,Math.PI*2);
    ctx.fillStyle="#E9465F";
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "bold 34px Arial";
    ctx.textAlign="center";
    ctx.fillText(" J#1", client.players[0].x, 230);

    ctx.beginPath();
    ctx.arc(client.players[1].x,400,50,0,Math.PI*2);
    ctx.fillStyle="#E9465F";
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "bold 34px Arial";
    ctx.textAlign="center";
    ctx.fillText(" J#2", client.players[1].x, 380);

    ctx.beginPath();
    ctx.arc(client.players[2].x,550,50,0,Math.PI*2);
    ctx.fillStyle="#E9465F";
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "bold 34px Arial";
    ctx.textAlign="center";
    ctx.fillText(" J#3", client.players[2].x, 530);

    ctx.beginPath();
    ctx.arc(client.players[3].x,700,50,0,Math.PI*2);
    ctx.fillStyle="#E9465F";
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.font = "bold 34px Arial";
    ctx.textAlign="center";
    ctx.fillText(" J#4", client.players[3].x, 680);
};


const setUpScreen = () => {
    // Impresion del background
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }

    // Print de los headers
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "35px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Equipo 1 ", 65, 32);
    ctx.fillText("Jugadores", 300, 32);
    ctx.fillText("Equipo 2", 555, 32);
};

//update the other players position
const updatePlayersPosition = (data) => {
    for (let i = 0; i < data.players.length; i++) {
        client.players[data.players[i].number-1] = data.players[i];
    }
}

// The main game loop
const main = () => {
     stats.begin();

    const now = Date.now();
    const delta = now - then;

    update(delta / 1000);
    setUpScreen();
    render();

    then = now;
    let player = client.players[playerIndex];
    player.id = client.id;
    player.game_id = client.game_id;
    //get players position
    socket.on('updatePosition', (data) => {
        updatePlayersPosition(data);
    });
    //send client player position
    socket.emit('teamselect', { 
        player
    });
    setTimeout(function(){}, 15000);
    // Request to do this again ASAP
    stats.end();
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
const w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
let then = Date.now();

//connect to lobby
socket.on('onconnected', (data) => {
    console.log(data)
    client.localplayer = data.player;
    client.id = data.player_id;
    client.game_id = data.game_id;
    playerIndex = client.localplayer - 1;
    let player = client.players[playerIndex];
    player.id = client.id;
    player.game_id = client.game_id;
    //initialize players position on server
    socket.emit('teamselect', { 
        player
    });
    main();
});
