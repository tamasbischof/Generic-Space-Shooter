class ParticleEmitter {
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
class ContinousParticleEmitter {
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
        else {
            this._active = false;
        }
    }
    disable() {
        this._active = false;
    }
}
class Particle {
    constructor(sprite, startPosition) {
        this._expired = false;
        this._sprite = sprite;
        this._position = startPosition;
    }
    get expired() { return this._expired; }
    draw() {
        this.updatePosition();
        Canvases.pcContext.drawImage(this._sprite, this._position.x, this._position.y);
    }
}
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
WhiteSquareParticle.sprite = new Image();
WhiteSquareParticle.sprite.src = "sprites/whiteSquare.bmp";
class StarParticle extends Particle {
    constructor(startPosition) {
        super(StarParticle.sprite, startPosition);
        this.currentAlpha = 1;
        this.degradation = 0.02;
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
StarParticle.sprite.src = "sprites/starSmall.bmp";
//# sourceMappingURL=particles.js.map