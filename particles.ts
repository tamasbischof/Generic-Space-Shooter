
class ParticleEmitter<T extends Particle> implements IParticleEmitter {

    _particles: T[]
    _active : boolean = true;
    get active() { return this._active; }

    constructor(type: (new(startPosition: Vector2D) => T), startPosition: Vector2D, count : number) {
        this._particles = new Array<T>(count);
        for (let i = 0; i < count; i++) {
            let particle : T = new type(new Vector2D(startPosition.x, startPosition.y));
            this._particles[i] = particle;
        }
        window.requestAnimationFrame(() => this.draw());
    }

    draw() {
        this._particles.forEach(particle => {
            particle.draw();
        });
        this._particles = this._particles.filter(function(value) { return value.expired == false; });
        if (this._particles.length != 0) {
            window.requestAnimationFrame(() => this.draw());
        }
        else {
            this._active = false;
        }
    }
}

interface IParticleEmitter {
    readonly active : boolean;
    draw();
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
        pcContext.drawImage(this._sprite, this._position.x, this._position.y);
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
        pcContext.save();
        pcContext.globalAlpha = this.currentAlpha;
        pcContext.drawImage(this._sprite, this._position.x, this._position.y);
        pcContext.restore();
    }
}

WhiteSquareParticle.sprite = new Image();
WhiteSquareParticle.sprite.src = "sprites/whiteSquare.bmp"