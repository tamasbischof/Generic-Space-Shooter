/**Represents the player's ship. Needs a draw() call each frame. */
class Player extends MovableEntity {
    constructor() {
        super(new Vector2D(0, Canvases.canvasHeight / 2), gameSettings.playerWidth, gameSettings.playerHeight);
        this._destroyed = false;
        this._input = new InputHandler(this, 5);
        this._width = gameSettings.playerWidth;
        this._height = gameSettings.playerHeight;
        this._sprite = new Image();
        this._sprite.src = "sprites/player.bmp";
        this._actorType = ActorType.Player;
        window.addEventListener('keydown', (e) => { this._input.handleKeyDown(e); });
        window.addEventListener('keyup', (e) => { this._input.handleKeyUp(e); });
    }
    get destroyed() { return this._destroyed; }
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
    clampToCanvas() {
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
        game.projectileLayer.addEmitter(new ParticleEmitter(WhiteSquareParticle, this._position, 10));
    }
}
class InputHandler {
    constructor(player, speed) {
        this.keys = new Map();
        this.player = player;
        this.speed = gameSettings.playerSpeed;
    }
    handleKeyDown(evt) {
        if (evt.altKey || evt.ctrlKey || evt.shiftKey) {
            return;
        }
        this.keys.set(evt.key.toLowerCase(), true);
        evt.preventDefault();
    }
    handleKeyUp(evt) {
        if (evt.altKey || evt.ctrlKey || evt.shiftKey) {
            return;
        }
        this.keys.set(evt.key.toLowerCase(), false);
        evt.preventDefault();
    }
    //direction vector y components are reversed (0,0 is upper right corner)
    handleInput() {
        let direction = new Vector2D(0, 0);
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
//# sourceMappingURL=player.js.map