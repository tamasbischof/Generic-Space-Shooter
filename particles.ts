
class ParticleEmitter<T extends Particle> implements IParticleEmitter {

    _particles: T[]
    _active: boolean = true;
    get active() { return this._active; }

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

class ContinousParticleEmitter<T extends Particle> implements IParticleEmitter {

    _particles: T[]
    private _active: boolean = true;
    private _maxCount: number;
    get active(): boolean { return this._active; }
    private _type: (new (startPosition: Vector2D) => T);

    constructor(type: (new (startPosition: Vector2D) => T), maxCount: number) {
        this._maxCount = maxCount;
        this._particles = new Array<T>(maxCount);
        this._type = type;
        for (let i = 0; i < this._particles.length; i++) {
            //spread particles accross the screen
            this._particles[i] = this.createNewParticle();
        }
    }

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
        else {
            this._active = false;
        }
    }
 
    disable() {
        this._active = false;
    }
}

interface IParticleEmitter {

    readonly active: boolean;
    draw();
    disable();
}

abstract class Particle {

    protected _sprite: HTMLImageElement;
    protected _velocity: Vector2D;
    protected _speed: number;
    protected _position: Vector2D;
    //how many seconds it takes for this particle to degrade
    protected _lifeTime: number;
    protected _expired: boolean = false;

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

WhiteSquareParticle.sprite = new Image();
WhiteSquareParticle.sprite.src = "sprites/whiteSquare.bmp"

class StarParticle extends Particle {

    static sprite: HTMLImageElement;
    private currentAlpha: number = 1;
    private degradation: number = 0.02;
    private _delay: number;

    constructor(startPosition: Vector2D) {
        super(StarParticle.sprite, startPosition);
        this._lifeTime = 2;
        this._delay = Math.random();
        this._expired = false;
    }

    updatePosition() {

    }

    draw() {
        this._delay -= this.degradation;
        if (this._delay > 0) {
            return;
        }
        this.currentAlpha -= this.degradation;
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

StarParticle.sprite = new Image();
StarParticle.sprite.src = "sprites/starSmall.bmp"
