class EnemySpawner {
    constructor() {
        this.enemies = new Array();
        this.spawnEnemy();
    }
    spawnEnemy() {
        this.enemies.push(new Enemy(new Vector2D(canvasWidth, Math.random() * canvasHeight)));
        window.setTimeout(() => this.spawnEnemy(), 2000);
    }
    draw() {
        this.enemies.forEach(enemy => {
            enemy.draw();
        });
        this.enemies = this.enemies.filter(function (value) {
            return value.outOfBounds == false;
        });
    }
}
class Enemy {
    constructor(position, width = 30, height = 30) {
        this._speed = 4;
        this.outOfBounds = false;
        this._position = position;
        this._width = width;
        this._height = height;
        this.setNewHeading();
    }
    get position() { return this._position; }
    draw() {
        this.updatePosition();
        this.clampToCanvas();
        acContext.drawImage(Enemy.sprite, this._position.x, this._position.y, this._width, this._height);
    }
    updatePosition() {
        this._position.add(this._heading);
        console.log(this._heading);
    }
    setNewHeading() {
        //when on upper half
        if (this._position.y < canvasHeight / 2) {
            this._heading = new Vector2D(-1, Math.random());
        }
        //when on lower half
        else {
            this._heading = new Vector2D(-1, Math.random() * -1);
        }
        this._heading.normalize();
        this._heading.scale(this._speed);
    }
    clampToCanvas() {
        if (this._position.x <= 0 - this._width) {
            this.outOfBounds = true;
        }
        if (this._position.y >= canvasHeight - this._height) {
            this._position.y = canvasHeight - this._height;
            this.setNewHeading();
        }
        if (this._position.y <= 0) {
            this._position.y = 0;
            this.setNewHeading();
        }
    }
}
//static initialization
Enemy.sprite = new Image();
Enemy.sprite.src = "sprites/enemyShip.bmp";
//# sourceMappingURL=enemySpawner.js.map