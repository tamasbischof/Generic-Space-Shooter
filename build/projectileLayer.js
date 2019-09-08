class ProjectileLayer {
    constructor() {
        this.projectiles = new Array();
    }
    addprojectile(position) {
        this.projectiles.push(new Projectile(position));
    }
    draw() {
        this.projectiles.forEach(projectile => {
            projectile.draw();
        });
        this.projectiles = this.projectiles.filter(function (value) {
            return value.position.x < canvasWidth;
        });
    }
}
class Projectile extends MovableEntity {
    constructor(position, width = 33, height = 9) {
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
//# sourceMappingURL=projectileLayer.js.map