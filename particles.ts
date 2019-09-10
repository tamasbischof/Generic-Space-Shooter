/**Handles the emission of particles. Has a finite lifetime, only active while it has particles to animate. A draw() call is required each frame to properly emit particles.*/
class ParticleEmitter<T extends Particle> implements IParticleEmitter {

    _particles: T[];
    _active: boolean = true;
    get active() { return this._active; }

    /**
     * Creates a new instance of this class.
     * @param type A Particle type that has a Vector2D argument for its constructor.
     * @param startPosition A Vector2D value to be passed for each particle.
     * @param count Number of particles to emit.
     */
    constructor(type: (new (startPosition: Vector2D) => T), startPosition: Vector2D, count: number) {
        this._particles = new Array<T>(count);
        for (let i = 0; i < count; i++) {
            let particle: T = new type(new Vector2D(startPosition.x, startPosition.y));
            this._particles[i] = particle;
        }
        window.requestAnimationFrame(() => this.draw());
    }

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
class ContinousParticleEmitter<T extends Particle> implements IParticleEmitter {

    _particles: T[];
    private _active: boolean = true;
    private _maxCount: number;
    get active(): boolean { return this._active; }
    private _type: (new (startPosition: Vector2D) => T);

    /**
     * Creates a new instance of this class.
     * @param type A Particle type that has a Vector2D argument for its constructor.
     * @param maxCount The maximum number of particles to be animated at any one time.
     */
    constructor(type: (new (startPosition: Vector2D) => T), maxCount: number) {
        this._maxCount = maxCount;
        this._particles = new Array<T>(maxCount);
        this._type = type;
        for (let i = 0; i < this._particles.length; i++) {
            //spread particles accross the screen
            this._particles[i] = this.createNewParticle();
        }
    }

    /**Instantiates a new particle. */
    private createNewParticle() {
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

interface IParticleEmitter {

    readonly active: boolean;
    draw();
    disable();
}

/**Base class for all particles. */
abstract class Particle {

    protected _sprite: HTMLImageElement;
    protected _velocity: Vector2D; //in which direction the particle should move
    protected _speed: number; //how many units per second a particle should move
    protected _position: Vector2D; //stores the particle's current position
    protected _lifeTime: number; //how many seconds it takes for this particle to degrade
    protected _expired: boolean = false; //flag denoting if this particle has run its lifetime

    get expired(): boolean { return this._expired; }

    protected constructor(sprite: HTMLImageElement, startPosition: Vector2D) {
        this._sprite = sprite;
        this._position = startPosition;
    }

    protected abstract updatePosition(): void;

    draw() {
        this.updatePosition();
        Canvases.pcContext.drawImage(this._sprite, this._position.x, this._position.y);
    }
}

/**A simple white square, moving away from its starting position in a random direction and fading out during its lifetime. */
class WhiteSquareParticle extends Particle {

    static sprite: HTMLImageElement;
    private currentAlpha: number = 1;

    constructor(startPosition: Vector2D) {
        super(WhiteSquareParticle.sprite, startPosition);
        this._speed = 1.5;
        this._velocity = Vector2D.getRandom();
        this._velocity.normalize();
        this._velocity.scale(this._speed);
        this._lifeTime = 1;
        this._expired = false;
    }

    protected updatePosition() {
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
WhiteSquareParticle.sprite.src = "sprites/whiteSquare.bmp"

/**A star-shaped particle that fades out during its lifetime after a random delay. */
class StarParticle extends Particle {

    static sprite: HTMLImageElement;
    private _currentAlpha: number = 1;
    private _delay: number;
    private _degradation: number = 0.016;

    constructor(startPosition: Vector2D) {
        super(StarParticle.sprite, startPosition);
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
StarParticle.sprite.src = "sprites/starSmall.bmp"
