class Player extends MovableEntity {

    private readonly _input: InputHandler;
    private _destroyed: boolean = false;

    get destroyed(): boolean { return this._destroyed; }

    constructor(width: number = 50, height: number = 50) {
        super(new Vector2D(0, canvasHeight / 2), width, height);
        this._input = new InputHandler(this, 5);
        this._width = width;
        this._height = height;
        this._sprite = new Image();
        this._sprite.src = "sprites/player.bmp";
        this._actorType = ActorType.Player;
        window.addEventListener('keydown', (e) => { this._input.handleKeyDown(e); });
        window.addEventListener('keyup', (e) => { this._input.handleKeyUp(e); });
    }

    draw() {
        if (!this.destroyed) {
            this.clampToCanvas();
            this.resolveCollision();
            this._input.handleInput();
        }
        if (!this.collided) {
            super.draw(acContext);
        }
        else if (!this.destroyed) {
            this.destroy();
            this._destroyed = true;
        }
    }

    shootProjectile() {
        game.projectileLayer.addprojectile(new Vector2D(this._position.x, this._position.y + this._height / 2));
    }

    clampToCanvas() {
        if (this._position.x > canvasWidth - this._width) {
            this._position.x = canvasWidth - this._width;
        }
        if (this._position.x < 0) {
            this._position.x = 0;
        }
        if (this._position.y > canvasHeight - this._height) {
            this._position.y = canvasHeight - this._height;
        }
        if (this._position.y < 0) {
            this._position.y = 0;
        }
    }

    destroy() {
        game.projectileLayer.addEmitter(new ParticleEmitter<WhiteSquareParticle>(WhiteSquareParticle, this._position, 10));
    }
}