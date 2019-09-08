class EnemySpawner {

    private enemies: Array<Enemy> = new Array<Enemy>();

    constructor() {
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
        })
    }
}

class Enemy extends MovableEntity {

    private _heading: Vector2D;
    outOfBounds: boolean = false;

    static sprite: HTMLImageElement;

    constructor(position: Vector2D, width: number = 30, height: number = 30) {
        super(position, width, height);
        this._speed = 4;
        this.setNewHeading();
    }

    draw() {
        this.updatePosition(this._heading);
        this.clampToCanvas();
        super.draw(acContext, Enemy.sprite);
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
Enemy.sprite.src = "sprites/enemyShip.bmp"