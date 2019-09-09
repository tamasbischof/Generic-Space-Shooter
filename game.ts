class Game {

    private _player: Player;
    private _backgroundLayer: BackgroundLayer;
    private _projectileLayer: ProjectileLayer;
    private _enemySpawner: EnemySpawner;
    private _collisionChecker: CollisionChecker;

    public get player(): Player { return this._player; }
    public get collisionChecker(): CollisionChecker { return this._collisionChecker; }
    public get projectileLayer(): ProjectileLayer { return this._projectileLayer; }

    constructor() {
        window.requestAnimationFrame(() => this.draw())
    }

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