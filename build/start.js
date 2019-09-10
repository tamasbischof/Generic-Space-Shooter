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
new Splash();
//# sourceMappingURL=start.js.map