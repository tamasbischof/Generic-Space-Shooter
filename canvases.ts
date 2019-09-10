/**Static class that loads and provides reference to all canvas layers and drawing contexts. To avoid hard-coded values, canvas dimensions are stored here as well. */
class Canvases {
    //store canvases and contexts
    static farBackgroundCanvas = <HTMLCanvasElement>document.getElementById("farBackgroundCanvas");
    static fcContext = Canvases.farBackgroundCanvas.getContext("2d");
    static nearBackgroundCanvas = <HTMLCanvasElement>document.getElementById("nearBackgroundCanvas");
    static ncContext = Canvases.nearBackgroundCanvas.getContext("2d");
    static projectileCanvas = <HTMLCanvasElement>document.getElementById("projectileCanvas");
    static pcContext = Canvases.projectileCanvas.getContext("2d");
    static actorCanvas = <HTMLCanvasElement>document.getElementById("actorCanvas");
    static acContext = Canvases.actorCanvas.getContext("2d");
    //store canvas dimensions
    static canvasWidth = 800;
    static canvasHeight = 600;
}