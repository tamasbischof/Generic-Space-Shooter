/**Handles drawing on the background layer, implements parallax scrolling. A draw() call has to be issued per frame.*/
class BackgroundLayer {

    private _farBackgroundImg: HTMLImageElement;
    private _nearBackgroundImg: HTMLImageElement;
    private _farFillPattern: CanvasPattern;
    private _farOffset: number = 0; //keeps track where to draw the background pattern
    private _nearOffset: number = 0;

    constructor() {
        this._nearBackgroundImg = new Image();
        this._nearBackgroundImg.src = "sprites/meteorBackground.bmp";
        this._farBackgroundImg = new Image();
        this._farBackgroundImg.src = "sprites/starBackground.bmp";
        this._farBackgroundImg.onload = () => { this._farFillPattern = Canvases.fcContext.createPattern(this._farBackgroundImg, "repeat"); }
    }

    draw() {
        this.calculateOffset();
        this.drawFar();
        this.drawNear();
    }

    private calculateOffset() {
        if (this._nearOffset < Canvases.canvasWidth + this._nearBackgroundImg.width) {
            this._nearOffset += gameSettings.nearBackgroundSpeed * game.deltaTime;
        }
        else {
            this._nearOffset = 0;
        }
        if (this._farOffset < Canvases.canvasWidth + this._farBackgroundImg.width) {
            this._farOffset += gameSettings.farBackgroundSpeed * game.deltaTime;
        }
        else {
            this._farOffset = 0;
        }
    }

    private drawFar() {
        Canvases.fcContext.fillStyle = this._farFillPattern;
        Canvases.fcContext.save();
        Canvases.fcContext.translate(-this._farOffset, 0);
        Canvases.fcContext.fill();
        Canvases.fcContext.restore();
    }

    private drawNear() {
        Canvases.ncContext.drawImage(this._nearBackgroundImg, Canvases.canvasWidth - this._nearOffset, 0);
        Canvases.ncContext.drawImage(this._nearBackgroundImg, 0 - this._nearOffset, 0);
        Canvases.ncContext.drawImage(this._nearBackgroundImg, Canvases.canvasWidth * 2 - this._nearOffset, 0);
    }
}

/**Handles drawing on the projectile layer, animates projectiles and particle emitters. Needs a draw call each frame so that it processes projectiles and particles properly. */
class ProjectileLayer {

    private _projectiles: Array<Projectile> = new Array<Projectile>();
    private _canShoot: boolean = true;
    private _emitters: Array<IParticleEmitter> = new Array<IParticleEmitter>();

    addEmitter(emitter: IParticleEmitter) {
        this._emitters.push(emitter);
    }

    addprojectile(position: Vector2D) {
        if (!this._canShoot) { return; }
        this._projectiles.push(new Projectile(position));
        this._canShoot = false;
        window.setTimeout(() => { this._canShoot = true }, gameSettings.playerShotCooldown * 1000);
    }

    draw() {
        this._projectiles.forEach(projectile => {
            projectile.draw();
        });
        this._projectiles = this._projectiles.filter(
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
        if (this._emitters.length == 0 && game.player.destroyed) {
            game.setGameOver();
        }
    }
}

/**Denotes a projectile shot by the player. Needs a draw() call each frame to be processed correctly. */
class Projectile extends MovableEntity {

    static sprite: HTMLImageElement;
    private _heading: Vector2D

    constructor(position: Vector2D, width: number = 33, height: number = 9) {
        super(position, width, height);
        //put projectile's center at position
        this._position.y -= this._height / 2;
        this._speed = gameSettings.projectileSpeed;
        this._heading = new Vector2D(this._speed, 0);
        this._actorType = ActorType.Projectile;
    }

    draw() {
        this.updatePosition(this._heading);
        if (this.position.x > Canvases.canvasWidth) { //mark for destruction when it completely leaves the screen
            this.outOfBounds = true;
            this.destroy();
            return;
        }
        this.resolveCollision();
        super.draw(Canvases.pcContext, Projectile.sprite);
    }
}

//static initialization
Projectile.sprite = new Image();
Projectile.sprite.src = "sprites/laserGreen.bmp";