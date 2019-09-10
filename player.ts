/**Represents the player's ship. Needs a draw() call each frame. */
class Player extends MovableEntity {

    private readonly _input: InputHandler;
    private _destroyed: boolean = false;

    get destroyed(): boolean { return this._destroyed; }

    constructor(width: number = 50, height: number = 50) {
        super(new Vector2D(0, Canvases.canvasHeight / 2), width, height);
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
            super.draw(Canvases.acContext);
        }
        else if (!this.destroyed) {
            this.destroy();
            this._destroyed = true;
        }
    }

    shootProjectile() {
        game.projectileLayer.addprojectile(new Vector2D(this._position.x, this._position.y + this._height / 2));
    }

    /**Keeps the player within the confines of the canvas. */
    private clampToCanvas() {
        if (this._position.x > Canvases.canvasWidth - this._width) {
            this._position.x = Canvases.canvasWidth - this._width;
        }
        if (this._position.x < 0) {
            this._position.x = 0;
        }
        if (this._position.y > Canvases.canvasHeight - this._height) {
            this._position.y = Canvases.canvasHeight - this._height;
        }
        if (this._position.y < 0) {
            this._position.y = 0;
        }
    }

    destroy() {
        game.projectileLayer.addEmitter(new ParticleEmitter<WhiteSquareParticle>(WhiteSquareParticle, this._position, 10));
    }
}

class InputHandler {

    private keys : Map<string,boolean>;

    private readonly player: Player;
    private speed: number;

    constructor(player: Player, speed: number) {
        this.keys = new Map<string,boolean>();
        this.player = player;
        this.speed = speed;
    }

    handleKeyDown(evt:KeyboardEvent) {
        this.keys.set(evt.key.toLowerCase(), true);
        evt.preventDefault();
    }

    handleKeyUp(evt:KeyboardEvent) {
        this.keys.set(evt.key.toLowerCase(), false);
        evt.preventDefault();
    }

    //direction vector y components are reversed (0,0 is upper right corner)
    handleInput() {
        let direction = new Vector2D(0,0);
        if (this.keys.get("w") || this.keys.get("arrowup")) {
            direction.y -= this.speed;
        }
        if (this.keys.get("s") || this.keys.get("arrowdown")) {
            direction.y += this.speed;
        }
        if (this.keys.get("d") || this.keys.get("arrowright")) {
            direction.x += this.speed;
        }
        if (this.keys.get("a") || this.keys.get("arrowleft")) {
            direction.x -= this.speed;
        }
        if (this.keys.get(" ")) {
            this.player.shootProjectile();
        }

        this.player.updatePosition(direction);
    }
}