// const play

let canvas = document.getElementById("canvas");
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
bgImage.src = "images/mapa.jpg";

// Team 1 car image
var team1CarReady = false;
var team1CarImage = new Image();
team1CarImage.onload = function () {
  team1CarReady = true;
};
team1CarImage.src = "images/blue_car.jpeg";

// Team 2 car image
var team2CarReady = false;
var team2CarImage = new Image();
team2CarImage.onload = function () {
  team2CarReady = true;
};
team2CarImage.src = "images/red_car.jpeg";

var keysDown = {};
// Team1 - car attributes
var team1Car = {
    speed: 375, // Car speed
    points: 0
}

// Team2 - car attributes
var team2Car = {
    speed: 375, // Car speed
    points: 0
}

addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);

var setUpGame = function () {
    team1Car.x = 65;
    team1Car.y = canvas.height - 150;

    // Throw the monster somewhere on the screen randomly
    team2Car.x = 450;
    team2Car.y = canvas.height - 150;
};

// Update game objects
var update = function (modifier) {
    // Team 1 - Car movement
    if (37 in keysDown) { // Player holding left
        team1Car.x -= team1Car.speed * modifier;
        if (team1Car.x <= 10) {
            team1Car.x = 10;
        }
    }
    if (39 in keysDown) { // Player holding right
        team1Car.x += team1Car.speed * modifier;
        if (team1Car.x >= 300) {
            team1Car.x = 300;
        }
    }

    // Team 2 - Car movement
    if (65 in keysDown) { // Player holding left
        team2Car.x -= team2Car.speed * modifier;
        if (team2Car.x <= 395) {
            team2Car.x = 395;
        }
    }
    if (68 in keysDown) { // Player holding right
        team2Car.x += team2Car.speed * modifier;
        if (team2Car.x >= 685) {
            team2Car.x = 685;
        }
    }
    // setTimeout(update, 5000);
};

var y = 50;
// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    if (team1CarReady) {
        ctx.drawImage(team1CarImage, team1Car.x, team1Car.y);
    }

    if (team2CarReady) {
        ctx.drawImage(team2CarImage, team2Car.x, team2Car.y);
    }

    // Draw a square
    ctx.beginPath();
    ctx.fillStyle="#00A8C1";
    ctx.fillRect(75, y,40,40);

    // Draw a circle
    ctx.beginPath();
    ctx.arc(475,y,20,0,Math.PI*2);
    ctx.fillStyle="#E9465F";
    ctx.fill();

    // move Y pos
    y += 50;

    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;

    update(delta / 1000);
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
setUpGame();
main();
