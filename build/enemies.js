/**Handles the spawning of enemies. Will spawn enemies  */
class EnemySpawner {
    constructor() {
        this._enemies = new Array();
        this._active = true;
        this.spawnEnemy();
    }
    setActive(value) {
        this._active = value;
    }
    spawnEnemy() {
        if (!this._active) {
            return; //stop spawning when deactivated
        }
        this._enemies.push(new Enemy(new Vector2D(Canvases.canvasWidth, Math.random() * Canvases.canvasHeight)));
        window.setTimeout(() => this.spawnEnemy(), 2000);
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
    constructor(position, width = 30, height = 30) {
        super(position, width, height);
        this._speed = 4;
        this._actorType = ActorType.Enemy;
        this.setNewHeading();
    }
    draw() {
        this.updatePosition(this._heading);
        this.clampToCanvas();
        this.resolveCollision();
        super.draw(Canvases.acContext, Enemy.sprite);
    }
    setNewHeading() {
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
    clampToCanvas() {
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
            game.projectileLayer.addEmitter(new ParticleEmitter(WhiteSquareParticle, this._position, 10));
        }
    }
}
//static initialization
Enemy.sprite = new Image();
Enemy.sprite.src = "sprites/enemyShip.bmp";
//# sourceMappingURL=enemies.js.map