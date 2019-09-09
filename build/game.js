class Game {
    constructor() {
        window.requestAnimationFrame(() => this.draw());
    }
    get player() { return this._player; }
    get collisionChecker() { return this._collisionChecker; }
    get projectileLayer() { return this._projectileLayer; }
    start() {
        this._collisionChecker = new CollisionChecker();
        this._backgroundLayer = new BackgroundLayer();
        this._projectileLayer = new ProjectileLayer();
        this._player = new Player();
        this._enemySpawner = new EnemySpawner();
    }
    //start draw loop
    draw() {
        fcContext.clearRect(0, 0, canvasWidth, canvasHeight);
        ncContext.clearRect(0, 0, canvasWidth, canvasHeight);
        pcContext.clearRect(0, 0, canvasWidth, canvasHeight);
        acContext.clearRect(0, 0, canvasWidth, canvasHeight);
        this._collisionChecker.checkCollisions();
        this._backgroundLayer.drawAll();
        this._projectileLayer.draw();
        this.player.draw();
        this._enemySpawner.draw();
        window.requestAnimationFrame(() => this.draw());
    }
}
//# sourceMappingURL=game.js.map