/**Static class that loads and provides reference to all canvas layers and drawing contexts. To avoid hard-coded values, canvas dimensions are stored here as well. */
class Canvases {
}
//store canvases and contexts
Canvases.farBackgroundCanvas = document.getElementById("farBackgroundCanvas");
Canvases.fcContext = Canvases.farBackgroundCanvas.getContext("2d");
Canvases.nearBackgroundCanvas = document.getElementById("nearBackgroundCanvas");
Canvases.ncContext = Canvases.nearBackgroundCanvas.getContext("2d");
Canvases.projectileCanvas = document.getElementById("projectileCanvas");
Canvases.pcContext = Canvases.projectileCanvas.getContext("2d");
Canvases.actorCanvas = document.getElementById("actorCanvas");
Canvases.acContext = Canvases.actorCanvas.getContext("2d");
//store canvas dimensions
Canvases.canvasWidth = 800;
Canvases.canvasHeight = 600;
//# sourceMappingURL=canvases.js.map