/**Handles the spawning of enemies. Will spawn enemies  */
class EnemySpawner {

    private _enemies: Array<Enemy> = new Array<Enemy>();
    private _active: boolean = true;

    constructor() {
        this.spawnEnemy();
    }

    setActive(value: boolean) {
        this._active = value;
    }

    private spawnEnemy() {
        if (!this._active) {
            return; //stop spawning when deactivated
        }
        this._enemies.push(new Enemy(new Vector2D(Canvases.canvasWidth, Math.random() * Canvases.canvasHeight)));
        window.setTimeout(() => this.spawnEnemy(), gameSettings.enemySpawnRate * 1000);
    }

    draw() {
        this._enemies.forEach(enemy => {
            enemy.draw();
        });
        this._enemies = this._enemies.filter(function (value) {
            return value.outOfBounds === false && value.collided === false;
        });
    }
}

/**Represents an enemy for the player to shoot (or collide with). Needs a draw() call each frame to properly function. */
class Enemy extends MovableEntity {

    private _heading: Vector2D;

    static sprite: HTMLImageElement;

    constructor(position: Vector2D, width: number = 30, height: number = 30) {
        super(position, width, height);
        this._speed = gameSettings.enemySpeed;
        this._actorType = ActorType.Enemy;
        this.setNewHeading();
    }

    draw() {
        this.updatePosition(this._heading);
        this.clampToCanvas();
        this.resolveCollision();
        super.draw(Canvases.acContext, Enemy.sprite);
    }

    private setNewHeading() {
        //when on upper half
        if (this._position.y < Canvases.canvasHeight / 2) {
            this._heading = new Vector2D(-1, Math.random());
        }
        //when on lower half
        else {
            this._heading = new Vector2D(-1, Math.random() * -1);
        }
        this._heading.normalize();
        this._heading.scale(this._speed);
    }

    /**Corrects position and assigns new heading if this entity would end up outside the canvas */
    private clampToCanvas() {
        if (this._position.x <= 0 - this._width) {
            this.outOfBounds = true;
            this.destroy();
            return;
        }
        if (this._position.y >= Canvases.canvasHeight - this._height) {
            this._position.y = Canvases.canvasHeight - this._height;
            this.setNewHeading();
        }
        if (this._position.y <= 0) {
            this._position.y = 0;
            this.setNewHeading();
        }
    }

    destroy() {
        if (this.collided) {
            game.projectileLayer.addEmitter(new ParticleEmitter<WhiteSquareParticle>(WhiteSquareParticle, this._position, 10));
        }
    }
}

//static initialization
Enemy.sprite = new Image();
Enemy.sprite.src = "sprites/enemyShip.bmp"