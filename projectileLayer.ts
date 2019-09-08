class ProjectileLayer {

    private readonly projectileSprite: HTMLImageElement;
    private projectiles: Array<Projectile>;

    constructor() {
        this.projectiles = new Array<Projectile>();
    }

    addprojectile(position: Vector2D) {
        this.projectiles.push(new Projectile(position));
    }

    draw() {
        this.projectiles.forEach(projectile => {
            projectile.draw();
        });
        this.projectiles = this.projectiles.filter(
            function(value) {
                return value.position.x < canvasWidth;
        });
    }
}

class Projectile extends MovableEntity {

    static sprite : HTMLImageElement;
    private _heading : Vector2D

    constructor(position : Vector2D, width : number = 33, height : number = 9) {
        super(position, width, height);
        this._speed = 7;
        this._heading = new Vector2D(this._speed, 0);
    }

    draw() {
        this.updatePosition(this._heading);
        super.draw(pcContext, Projectile.sprite);
    }
}

Projectile.sprite = new Image();
Projectile.sprite.src = "sprites/laserGreen.bmp";