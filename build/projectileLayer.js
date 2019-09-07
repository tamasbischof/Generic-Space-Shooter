class ProjectileLayer {
    constructor() {
        this.projectileSprite = new Image();
        this.projectileSprite.src = "sprites/laserGreen.bmp";
        this.projectiles = new Array();
    }
    addprojectile(position) {
        this.projectiles.push(new Projectile(position));
    }
    draw() {
        this.projectiles.forEach(projectile => {
            projectile.updatePosition();
            pcContext.drawImage(this.projectileSprite, projectile.position.x, projectile.position.y);
        });
        this.projectiles = this.projectiles.filter(function (value) {
            return value.position.x < canvasWidth;
        });
    }
}
class Projectile {
    constructor(position) {
        this._position = position;
        this.speed = 7;
    }
    get position() {
        return this._position;
    }
    updatePosition() {
        this._position.x += this.speed;
    }
}
//# sourceMappingURL=projectileLayer.js.map