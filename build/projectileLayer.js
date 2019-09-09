class ProjectileLayer {
    constructor() {
        this.projectiles = new Array();
        this.canShoot = true;
    }
    addprojectile(position) {
        if (!this.canShoot) {
            return;
        }
        this.projectiles.push(new Projectile(position));
        this.canShoot = false;
        window.setTimeout(() => { this.canShoot = true; }, 500);
    }
    draw() {
        this.projectiles.forEach(projectile => {
            projectile.draw();
        });
        this.projectiles = this.projectiles.filter(function (value) {
            return value.outOfBounds == false && value.collided == false;
        });
    }
}
class Projectile extends MovableEntity {
    constructor(position, width = 33, height = 9) {
        super(position, width, height);
        //put projectile's center at position
        this._position.y -= this._height / 2;
        this._speed = 7;
        this._heading = new Vector2D(this._speed, 0);
        this._actorType = ActorType.Projectile;
    }
    draw() {
        this.updatePosition(this._heading);
        if (this.position.x > canvasWidth) {
            this.outOfBounds = true;
            this.destroy();
            return;
        }
        this.resolveCollision();
        super.draw(pcContext, Projectile.sprite);
    }
}
//static initialization
Projectile.sprite = new Image();
Projectile.sprite.src = "sprites/laserGreen.bmp";
//# sourceMappingURL=projectileLayer.js.map