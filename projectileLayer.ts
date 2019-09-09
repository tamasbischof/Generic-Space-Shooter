class ProjectileLayer {

    private projectiles: Array<Projectile> = new Array<Projectile>();
    private canShoot: boolean = true;
    private _emitters: Array<IParticleEmitter> = new Array<IParticleEmitter>();

    addEmitter(emitter: IParticleEmitter) {
        this._emitters.push(emitter);
    }

    addprojectile(position: Vector2D) {
        if (!this.canShoot) { return; }
        this.projectiles.push(new Projectile(position));
        this.canShoot = false;
        window.setTimeout(() => { this.canShoot = true }, 500);
    }

    draw() {
        this.projectiles.forEach(projectile => {
            projectile.draw();
        });
        this.projectiles = this.projectiles.filter(
            function (value) {
                return value.outOfBounds == false && value.collided == false;
        });
        this._emitters.forEach(emitter => {
            emitter.draw();
        });
        this._emitters = this._emitters.filter(
            function (emitter) { 
                return emitter.active;
        });
    }
}

class Projectile extends MovableEntity {

    static sprite: HTMLImageElement;
    private _heading: Vector2D

    constructor(position: Vector2D, width: number = 33, height: number = 9) {
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