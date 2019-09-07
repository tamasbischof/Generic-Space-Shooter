class ProjectileLayer {

    private readonly projectileSprite: HTMLImageElement;
    private projectiles: Array<Projectile>;

    constructor() {
        this.projectileSprite = new Image();
        this.projectileSprite.src = "sprites/laserGreen.bmp";
        this.projectiles = new Array<Projectile>();
    }

    addprojectile(position: Vector2D) {
        this.projectiles.push(new Projectile(position));
    }

    draw() {
        this.projectiles.forEach(projectile => {
            projectile.updatePosition();
            pcContext.drawImage(this.projectileSprite, projectile.position.x, projectile.position.y);
        });
        this.projectiles = this.projectiles.filter(
            function(value, index, array) {
                return value.position.x < canvasWidth;
        });
    }
}

class Projectile {

    private _position: Vector2D;
    private readonly speed: number;
    private readonly sprite: HTMLImageElement;

    get position(): Vector2D {
        return this._position;
    }

    constructor(position: Vector2D) {
        this._position = position;
        this.speed = 7;
    }

    updatePosition() {
        this._position.x += this.speed;
    }
}