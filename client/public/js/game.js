// Create the canvas
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
bgImage.src = "images/mapa.jpg";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/blue_car.jpeg";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/red_car.jpeg";

// Game objects
var hero = {
	speed: 375 // movement in pixels per second
};

var monster = {
	speed: 375 // movement in pixels per second
};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
	console.log(e.keyCode);
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {
	hero.x = 65;
	hero.y = canvas.height - 150;

	// Throw the monster somewhere on the screen randomly
	// monster.x = 32 + (Math.random() * (canvas.width - 64));
	// monster.y = 32 + (Math.random() * (canvas.height - 64));
	monster.x = 450;
	monster.y = canvas.height - 150;
};

// Update game objects
var update = function (modifier) {
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
		if (hero.x <= 10) {
			hero.x = 10;
		}
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
		if (hero.x >= 300) {
			hero.x = 300;
		}
	}

	if (65 in keysDown) { // Player holding left
		monster.x -= monster.speed * modifier;
		if (monster.x <= 395) {
			monster.x = 395;
		}
	}
	if (68 in keysDown) { // Player holding right
		monster.x += monster.speed * modifier;
		if (monster.x >= 685) {
			monster.x = 685;
		}
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
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
reset();
main();
