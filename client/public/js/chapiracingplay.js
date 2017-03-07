const playState = (callback) => {
    let canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    canvas.width = 761;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);

    // Background image
    var bgReady = false;
    var bgImage = new Image();
    bgImage.onload = function () {
      bgReady = true;
    };
    bgImage.src = "client/public/images/mapa.jpg";
    //bgImage.src = "images/mapa.jpg";

    // Team 1 car image
    var team1CarReady = false;
    var team1CarImage = new Image();
    team1CarImage.onload = function () {
      team1CarReady = true;
    };
    team1CarImage.src = "client/public/images/blue_car.jpeg";
    //team1CarImage.src = "images/blue_car.jpeg";

    // Team 2 car image
    var team2CarReady = false;
    var team2CarImage = new Image();
    team2CarImage.onload = function () {
      team2CarReady = true;
    };
    team2CarImage.src = "client/public/images/red_car.jpeg";
    //team2CarImage.src = "images/green_car.png";

    // Team 2 car image
    var bomber1Ready = false;
    var bomber1Image = new Image();
    bomber1Image.onload = function () {
      bomber1Ready = true;
    };
    bomber1Image.src = "client/public/images/red_car.jpeg";
    //bomber1Image.src = "images/bomber.png";

    // Team 2 car image
    var bomber2Ready = false;
    var bomber2Image = new Image();
    bomber2Image.onload = function () {
      bomber2Ready = true;
    };
    bomber2Image.src = "client/public/images/red_car.jpeg";
    //bomber2Image.src = "images/bomber2.png";

    let initialHeight = 0.05*(window.innerHeight);
    // let stepHeight = (window.innerHeight - 0.30*window.innerHeight) / 4;
    let carYPosition = (window.innerHeight - 0.18*window.innerHeight)

    let client = {
        team1: {
            bomber: {
                playerNumber: 0,
                x: 0
            },
            driver: {
                playerNumber: 0,
                x: 0
            },
            points: 0
        },
        team2: {
            bomber: {
                playerNumber: 0,
                x: 0
            },
            driver: {
                playerNumber: 0,
                x: 0
            },
            points: 0
        }
    };

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
        team1Car.y = carYPosition;

        // Throw the monster somewhere on the screen randomly
        team2Car.x = 450;
        team2Car.y = carYPosition;
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

        if (bomber1Ready) {
            ctx.drawImage(bomber1Image, team2Car.x, initialHeight)
        }

        if (bomber2Ready) {
            ctx.drawImage(bomber2Image, team1Car.x, initialHeight)
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
}
playState();
