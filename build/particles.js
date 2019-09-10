/**Handles the emission of particles. Has a finite lifetime, only active while it has particles to animate. A draw() call is required each frame to properly emit particles.*/
class ParticleEmitter {
    /**
     * Creates a new instance of this class.
     * @param type A Particle type that has a Vector2D argument for its constructor.
     * @param startPosition A Vector2D value to be passed for each particle.
     * @param count Number of particles to emit.
     */
    constructor(type, startPosition, count) {
        this._active = true;
        this._particles = new Array(count);
        for (let i = 0; i < count; i++) {
            let particle = new type(new Vector2D(startPosition.x, startPosition.y));
            this._particles[i] = particle;
        }
        window.requestAnimationFrame(() => this.draw());
    }
    get active() { return this._active; }
    draw() {
        this._particles.forEach(particle => {
            particle.draw();
        });
        this._particles = this._particles.filter(function (value) { return value.expired == false; });
        if (this._particles.length != 0) {
            window.requestAnimationFrame(() => this.draw());
        }
        else {
            this._active = false;
        }
    }
    disable() {
        this._active = false;
    }
}
/**Handles the emission of particles. Has an infinite lifetime, and will emit particles until deactivated all across the canvas. A draw() call is required to properly animate the particles.*/
class ContinousParticleEmitter {
    /**
     * Creates a new instance of this class.
     * @param type A Particle type that has a Vector2D argument for its constructor.
     * @param maxCount The maximum number of particles to be animated at any one time.
     */
    constructor(type, maxCount) {
        this._active = true;
        this._maxCount = maxCount;
        this._particles = new Array(maxCount);
        this._type = type;
        for (let i = 0; i < this._particles.length; i++) {
            //spread particles accross the screen
            this._particles[i] = this.createNewParticle();
        }
    }
    get active() { return this._active; }
    /**Instantiates a new particle. */
    createNewParticle() {
        let position = Vector2D.getRandom();
        position.x *= Canvases.canvasWidth;
        position.y *= Canvases.canvasHeight;
        return new this._type(position);
    }
    draw() {
        this._particles.forEach(particle => {
            particle.draw();
        });
        this._particles = this._particles.filter(function (value) { return value.expired == false; });
        if (this._particles.length < this._maxCount) {
            for (let i = this._particles.length; i < this._maxCount; i++) {
                this._particles.push(this.createNewParticle());
            }
        }
    }
    /**Deactivates this emitter, stopping it from drawing any more particles. */
    disable() {
        this._active = false;
    }
}
/**Base class for all particles. */
class Particle {
    constructor(sprite, startPosition) {
        this._expired = false; //flag denoting if this particle has run its lifetime
        this._sprite = sprite;
        this._position = startPosition;
    }
    get expired() { return this._expired; }
    draw() {
        this.updatePosition();
        Canvases.pcContext.drawImage(this._sprite, this._position.x, this._position.y);
    }
}
/**A simple white square, moving away from its starting position in a random direction and fading out during its lifetime. */
class WhiteSquareParticle extends Particle {
    constructor(startPosition) {
        super(WhiteSquareParticle.sprite, startPosition);
        this.currentAlpha = 1;
        this._speed = 1.5;
        this._velocity = Vector2D.getRandom();
        this._velocity.normalize();
        this._velocity.scale(this._speed);
        this._lifeTime = 1;
        this._expired = false;
    }
    updatePosition() {
        this._position.add(this._velocity);
    }
    draw() {
        this.updatePosition();
        this.currentAlpha -= game.deltaTime / this._lifeTime;
        if (this.currentAlpha <= 0) {
            this._expired = true;
            return;
        }
        Canvases.pcContext.save();
        Canvases.pcContext.globalAlpha = this.currentAlpha;
        Canvases.pcContext.drawImage(this._sprite, this._position.x, this._position.y);
        Canvases.pcContext.restore();
    }
}
//keep a single copy of the particle sprite for better performance
WhiteSquareParticle.sprite = new Image();
WhiteSquareParticle.sprite.src = "sprites/whiteSquare.bmp";
/**A star-shaped particle that fades out during its lifetime after a random delay. */
class StarParticle extends Particle {
    constructor(startPosition) {
        super(StarParticle.sprite, startPosition);
        this._currentAlpha = 1;
        this._degradation = 0.016;
        this._lifeTime = 1.5;
        this._delay = Math.random();
        this._expired = false;
    }
    updatePosition() {
    }
    draw() {
        this._delay -= this._degradation;
        if (this._delay > 0) {
            return;
        }
        this._currentAlpha -= this._degradation / this._lifeTime;
        //after the animation is complete
        if (this._currentAlpha <= 0) {
            this._expired = true;
            return;
        }
        Canvases.pcContext.save(); //lower the opacity only for the current particle
        Canvases.pcContext.globalAlpha = this._currentAlpha;
        Canvases.pcContext.drawImage(this._sprite, this._position.x, this._position.y);
        Canvases.pcContext.restore();
    }
}
//store the image in the class, not in each instance
StarParticle.sprite = new Image();
StarParticle.sprite.src = "sprites/starSmall.bmp";
//# sourceMappingURL=particles.js.map