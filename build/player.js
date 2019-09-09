class Player extends MovableEntity {
    constructor(width = 50, height = 50) {
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
        this._input.handleInput();
        this.clampToCanvas();
        this.resolveCollision();
        super.draw(acContext);
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
}
//# sourceMappingURL=player.js.map