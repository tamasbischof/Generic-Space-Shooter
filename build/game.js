class Game {
    constructor() {
        this._lastFrameTimeStamp = 0;
        this._currentFrameTimeStamp = 0;
        this._gameOver = false;
        //start draw loop
        window.requestAnimationFrame((timeStamp) => this.draw(timeStamp));
    }
    get player() { return this._player; }
    get collisionChecker() { return this._collisionChecker; }
    get projectileLayer() { return this._projectileLayer; }
    get deltaTime() { return (this._currentFrameTimeStamp - this._lastFrameTimeStamp) / 1000; } //time elapsed since last frame in seconds
    start() {
        this._collisionChecker = new CollisionChecker();
        this._backgroundLayer = new BackgroundLayer();
        this._projectileLayer = new ProjectileLayer();
        this._player = new Player();
        this._enemySpawner = new EnemySpawner();
    }
    draw(time) {
        if (this._gameOver) {
            new GameOver();
            return;
        }
        fcContext.clearRect(0, 0, canvasWidth, canvasHeight);
        ncContext.clearRect(0, 0, canvasWidth, canvasHeight);
        pcContext.clearRect(0, 0, canvasWidth, canvasHeight);
        acContext.clearRect(0, 0, canvasWidth, canvasHeight);
        this.player.draw();
        this._lastFrameTimeStamp = this._currentFrameTimeStamp;
        this._currentFrameTimeStamp = time;
        this._collisionChecker.checkCollisions();
        this._backgroundLayer.drawAll();
        this._projectileLayer.draw();
        this._enemySpawner.draw();
        window.requestAnimationFrame((timeStamp) => this.draw(timeStamp));
    }
}
//# sourceMappingURL=game.js.map