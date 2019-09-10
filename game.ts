class Game {

    private _player: Player;
    private _backgroundLayer: BackgroundLayer;
    private _projectileLayer: ProjectileLayer;
    private _enemySpawner: EnemySpawner;
    private _collisionChecker: CollisionChecker;
    private _lastFrameTimeStamp: number = 0;
    private _currentFrameTimeStamp: number = 0;
    _gameOver: boolean = false;

    public get player(): Player { return this._player; }
    public get collisionChecker(): CollisionChecker { return this._collisionChecker; }
    public get projectileLayer(): ProjectileLayer { return this._projectileLayer; }
    public get deltaTime(): number { return (this._currentFrameTimeStamp - this._lastFrameTimeStamp) / 1000; } //time elapsed since last frame in seconds

    constructor() {
        //start draw loop
        window.requestAnimationFrame((timeStamp) => this.draw(timeStamp));
    }

    start() {
        this._collisionChecker = new CollisionChecker();
        this._backgroundLayer = new BackgroundLayer();
        this._projectileLayer = new ProjectileLayer();
        this._player = new Player();
        this._enemySpawner = new EnemySpawner();
    }
    draw(time: number) {
        if (this._gameOver) {
            new GameOver();
            return;
        }
        Canvases.fcContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.ncContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.pcContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.acContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
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