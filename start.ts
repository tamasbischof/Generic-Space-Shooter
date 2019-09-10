//store canvases and contexts
const farBackgroundCanvas = <HTMLCanvasElement>document.getElementById("farBackgroundCanvas");
const fcContext = farBackgroundCanvas.getContext("2d");
const nearBackgroundCanvas = <HTMLCanvasElement>document.getElementById("nearBackgroundCanvas");
const ncContext = nearBackgroundCanvas.getContext("2d");
const projectileCanvas = <HTMLCanvasElement>document.getElementById("projectileCanvas");
const pcContext = projectileCanvas.getContext("2d");
const actorCanvas = <HTMLCanvasElement>document.getElementById("actorCanvas");
const acContext = actorCanvas.getContext("2d");
//store canvas dimensions
const canvasWidth = 800;
const canvasHeight = 600;

var game : Game;

new Splash();

