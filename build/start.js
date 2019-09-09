//store canvases and contexts
const farBackgroundCanvas = document.getElementById("farBackgroundCanvas");
const fcContext = farBackgroundCanvas.getContext("2d");
const nearBackgroundCanvas = document.getElementById("nearBackgroundCanvas");
const ncContext = nearBackgroundCanvas.getContext("2d");
const projectileCanvas = document.getElementById("projectileCanvas");
const pcContext = projectileCanvas.getContext("2d");
const actorCanvas = document.getElementById("actorCanvas");
const acContext = actorCanvas.getContext("2d");
//store canvas dimensions
const canvasWidth = 800;
const canvasHeight = 600;
var game;
//start drawing the logo
fcContext.beginPath();
fcContext.rect(0, 0, canvasWidth, canvasHeight);
fcContext.fill();
let logo = new Image();
logo.src = "sprites/logo.bmp";
//keep track of fade in/out status
let alpha = 0;
let fadeSpeed = 0.02;
window.requestAnimationFrame(() => this.drawLogo());
//will fade the logo in, wait 2 seconds, then fade it out
function drawLogo() {
    acContext.clearRect(0, 0, canvasWidth, canvasHeight);
    alpha += fadeSpeed;
    acContext.globalAlpha = alpha;
    if (alpha >= 1) {
        fadeSpeed = -fadeSpeed;
        window.setTimeout(drawLogo, 2000);
        acContext.drawImage(logo, 0, 0);
        return;
    }
    if (alpha <= 0) {
        //animation complete, proceed to menu
        new Menu();
        acContext.globalAlpha = 1;
        return;
    }
    acContext.drawImage(logo, 0, 0);
    window.requestAnimationFrame(() => this.drawLogo());
}
//# sourceMappingURL=start.js.map