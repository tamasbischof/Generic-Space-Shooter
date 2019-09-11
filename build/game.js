/**Class representing an active game scene. Handles setting up, updating and ending gameplay. */
class Game {
    constructor() {
        this._lastFrameTimeStamp = 0; //keeps track of the time signature of the last frame
        this._currentFrameTimeStamp = 0; //same for current frame
        this._gameOver = false;
        //start draw loop
        window.requestAnimationFrame((timeStamp) => this.draw(timeStamp));
    }
    get player() { return this._player; }
    get collisionChecker() { return this._collisionChecker; }
    get projectileLayer() { return this._projectileLayer; }
    /**Gets the time difference in seconds between this frame and last frame.  */
    get deltaTime() { return (this._currentFrameTimeStamp - this._lastFrameTimeStamp) / 1000; }
    /**Call this to start the game scene. Without module loading, this had to be separated.  */
    start() {
        this._collisionChecker = new CollisionChecker();
        this._backgroundLayer = new BackgroundLayer();
        this._projectileLayer = new ProjectileLayer();
        this._player = new Player();
        this._enemySpawner = new EnemySpawner();
        new GameSettings();
    }
    draw(time) {
        //abort draw call when the game is over
        if (this._gameOver) {
            this._enemySpawner.setActive(false);
            new GameOver();
            return;
        }
        //clear all canvases
        Canvases.fcContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.ncContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.pcContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.acContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        //proceed with draw and update calls
        this.player.draw();
        this._lastFrameTimeStamp = this._currentFrameTimeStamp;
        this._currentFrameTimeStamp = time;
        this._collisionChecker.checkCollisions();
        this._backgroundLayer.draw();
        this._projectileLayer.draw();
        this._enemySpawner.draw();
        //fire next frame
        window.requestAnimationFrame((timeStamp) => this.draw(timeStamp));
    }
    setGameOver() {
        this._gameOver = true;
    }
}
//# sourceMappingURL=game.js.map