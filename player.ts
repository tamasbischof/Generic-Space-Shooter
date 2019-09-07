class Player {

    private readonly _width: number;
    private readonly _height: number;
    private readonly _context: CanvasRenderingContext2D;
    private readonly _sprite: HTMLImageElement;
    private readonly _input: InputHandler;
    private _position: Vector2D;

    get position() : Vector2D {
        return this._position;
    }

    constructor(canvas: HTMLCanvasElement, width: number = 50, height: number = 50) {
        this._context = canvas.getContext("2d");
        this._position = new Vector2D(0, canvas.height / 2);
        this._input = new InputHandler(this, 5);
        this._width = width;
        this._height = height;
        this._sprite = new Image();
        this._sprite.onload = () => { this.draw() };
        this._sprite.src = "sprites/player.bmp";
        window.addEventListener('keydown', (e) => { this._input.handleKeyDown(e); });
        window.addEventListener('keyup', (e) => { this._input.handleKeyUp(e); });
    }

    draw(): void {
        this._input.handleInput();
        this._context.drawImage(this._sprite, this._position.x, this._position.y, this._width, this._height);
    }

    updatePosition(direction : Vector2D) {
        this._position.add(direction);
        this.clampToCanvas();       
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