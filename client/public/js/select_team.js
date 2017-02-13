var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 761;
canvas.height = 960;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
  bgReady = true;
};
bgImage.src = "images/mapa_inicial.jpg";

var actual_team = -1;
var change_team = false;


function ChapiRacing(user_id, game_id) {

}

var client = {
    localplayer: 1,
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
var playerIndex = client.localplayer - 1;

var keysDown = {};

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

// Update: Funcion para tomar el movimiento atraves del teclado
//      tiene como fin el seleccionar un equipo
var update = function (modifier) {
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
var render = function () {
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


var setUpScreen = function() {
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

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
    setUpScreen();
    render();

    then = now;

    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
// setUpScreen();
main();
