/**Handles drawing on the background layer, implements parallax scrolling. A draw() call has to be issued per frame.*/
class BackgroundLayer {
    constructor() {
        this._farOffset = 0; //keeps track where to draw the background pattern
        this._nearOffset = 0;
        this._farSpeed = 1; //how fast the background should move
        this._nearSpeed = 4;
        this._nearBackgroundImg = new Image();
        this._nearBackgroundImg.src = "sprites/meteorBackground.bmp";
        this._farBackgroundImg = new Image();
        this._farBackgroundImg.src = "sprites/starBackground.bmp";
        this._farBackgroundImg.onload = () => { this._farFillPattern = Canvases.fcContext.createPattern(this._farBackgroundImg, "repeat"); };
    }
    draw() {
        this.calculateOffset();
        this.drawFar();
        this.drawNear();
    }
    calculateOffset() {
        if (this._nearOffset < Canvases.canvasWidth + this._nearBackgroundImg.width) {
            this._nearOffset += this._nearSpeed;
        }
        else {
            this._nearOffset = 0;
        }
        if (this._farOffset < Canvases.canvasWidth + this._farBackgroundImg.width) {
            this._farOffset += this._farSpeed;
        }
        else {
            this._farOffset = 0;
        }
    }
    drawFar() {
        Canvases.fcContext.fillStyle = this._farFillPattern;
        Canvases.fcContext.save();
        Canvases.fcContext.translate(-this._farOffset, 0);
        Canvases.fcContext.fill();
        Canvases.fcContext.restore();
    }
    drawNear() {
        Canvases.ncContext.drawImage(this._nearBackgroundImg, Canvases.canvasWidth - this._nearOffset, 0);
        Canvases.ncContext.drawImage(this._nearBackgroundImg, 0 - this._nearOffset, 0);
        Canvases.ncContext.drawImage(this._nearBackgroundImg, Canvases.canvasWidth * 2 - this._nearOffset, 0);
    }
}
/**Handles drawing on the projectile layer, animates projectiles and particle emitters. Needs a draw call each frame so that it processes projectiles and particles properly. */
class ProjectileLayer {
    constructor() {
        this._projectiles = new Array();
        this._canShoot = true;
        this._emitters = new Array();
    }
    addEmitter(emitter) {
        this._emitters.push(emitter);
    }
    addprojectile(position) {
        if (!this._canShoot) {
            return;
        }
        this._projectiles.push(new Projectile(position));
        this._canShoot = false;
        window.setTimeout(() => { this._canShoot = true; }, 500);
    }
    draw() {
        this._projectiles.forEach(projectile => {
            projectile.draw();
        });
        this._projectiles = this._projectiles.filter(function (value) {
            return value.outOfBounds == false && value.collided == false;
        });
        this._emitters.forEach(emitter => {
            emitter.draw();
        });
        this._emitters = this._emitters.filter(function (emitter) {
            return emitter.active;
        });
        if (this._emitters.length == 0 && game.player.destroyed) {
            game._gameOver = true;
        }
    }
}
/**Denotes a projectile shot by the player. Needs a draw() call each frame to be processed correctly. */
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
//# sourceMappingURL=layers.js.map