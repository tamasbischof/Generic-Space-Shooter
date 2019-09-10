/**Displays the game splash on instantiation. */
class Splash {

    private _splashImg: HTMLImageElement = new Image();
    _alpha: number = 0;
    _fadeSpeed: number = 0.02;

    constructor() {
        //load splash bmp
        this._splashImg.src = "sprites/logo.bmp";
        //set up the background (plain black)
        Canvases.fcContext.beginPath();
        Canvases.fcContext.fillStyle = "#5E3F6B";
        Canvases.fcContext.rect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.fcContext.fill();
        window.requestAnimationFrame(() => this.draw());
    }

    //will fade the logo in, wait 2 seconds, then fade it out
    private draw() {
        Canvases.acContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        this._alpha += this._fadeSpeed;
        Canvases.acContext.globalAlpha = this._alpha;
        if (this._alpha >= 1) { //will be hit only when the splash has been faded in
            this._fadeSpeed = -this._fadeSpeed;
            window.setTimeout(() => this.draw(), 2000);
            Canvases.acContext.drawImage(this._splashImg, 0, 0);
            return;
        }
        if (this._alpha <= 0) { //hit only when animation is complete, proceed to menu
            new Menu();
            Canvases.acContext.globalAlpha = 1;
            return;
        }
        Canvases.acContext.drawImage(this._splashImg, 0, 0);
        window.requestAnimationFrame(() => this.draw());
    }
}

/**Displays the menu on instantiation. */
class Menu {

    static logo: HTMLImageElement;
    _buttons: Array<MenuButton> = new Array<MenuButton>(4);
    private _buttonClicked: boolean = false;
    private _canvasRect : ClientRect; //holds a reference to the bounding rect of the uppermost canvas, to speed up calculations
    private _clickHandler = (event: MouseEvent) => this.checkClick(event); //function pointer for proper event deregistration
    private _particleEmitter: ContinousParticleEmitter<StarParticle>;

    constructor() {
        //start by clearing canvases, then filling the background layer with the background color
        Canvases.fcContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.ncContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.pcContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.acContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.fcContext.fillStyle = "#5E3F6B";
        Canvases.fcContext.fillRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        this._buttons[0] = new MenuButton(MenuButton.game1Button, 250, () => this.startGame());
        this._buttons[1] = new MenuButton(MenuButton.game2Button, 330, () => this.startGame());
        this._buttons[2] = new MenuButton(MenuButton.game3Button, 410, () => this.startGame());
        this._buttons[3] = new MenuButton(MenuButton.exitButton, 490, () => this.exit());
        this._canvasRect = Canvases.actorCanvas.getBoundingClientRect();
        this._particleEmitter = new ContinousParticleEmitter<StarParticle>(StarParticle, 20);
        Canvases.actorCanvas.addEventListener('click', this._clickHandler);
        window.requestAnimationFrame(() => this.draw());
    }

    private draw() {
        if (this._buttonClicked) {
            return;
        }
        Canvases.pcContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.acContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        //draw the logo
        Canvases.acContext.drawImage(Menu.logo, Canvases.canvasWidth / 2 - Menu.logo.width / 2, 50);
        //draw the buttons
        this._buttons.forEach(button => {
            button.draw();
        });
        //draw particle effect
        this._particleEmitter.draw();
        window.requestAnimationFrame(() => this.draw());
    }

    private checkClick(event: MouseEvent) {
        //check if the click is inside any of the buttons
        this._buttons.forEach(button => {
            if (button.check(event.clientX - this._canvasRect.left, event.clientY - this._canvasRect.top)) { //calculate canvas coordinates from client coordinates
                this._buttonClicked = true;
            }
        });
    }

    private deregisterListener() {
        Canvases.actorCanvas.removeEventListener('click', this._clickHandler);
    }

    private startGame() {
        this.deregisterListener();
        game = new Game();
        game.start();
    }

    private exit() {
        this.deregisterListener();
        window.location.href = "http://bischoftamas.com";
    }
}

/**A button in the menu. A draw() call is required each frame. */
class MenuButton {

    static game1Button: HTMLImageElement;
    static game2Button: HTMLImageElement;
    static game3Button: HTMLImageElement;
    static exitButton: HTMLImageElement;

    private _action: Function;
    private _topLeftCorner: Vector2D;
    private _bottomRightCorner: Vector2D;
    private _sprite: HTMLImageElement;

    constructor(sprite: HTMLImageElement, yPos: number, action: Function) {
        this._sprite = sprite;
        this._action = action;
        let xPos = Canvases.canvasWidth / 2 - sprite.width / 2;
        this._topLeftCorner = new Vector2D(xPos, yPos);
        this._bottomRightCorner = new Vector2D(xPos + sprite.width, yPos + sprite.height);
    }

    //calculates whether the supplied mouse coordinates fall within this button's dimensions
    check(mouseX: number, mouseY: number): boolean {
        if (mouseX < this._topLeftCorner.x || mouseX > this._bottomRightCorner.x ||
            mouseY < this._topLeftCorner.y || mouseY > this._bottomRightCorner.y) {
            return false;
        }
        this._action();
        return true;
    }

    draw() {
        Canvases.acContext.drawImage(this._sprite, this._topLeftCorner.x, this._topLeftCorner.y);
    }
}

//load bitmaps
Menu.logo = new Image();
Menu.logo.src = "sprites/player.bmp";
MenuButton.game1Button = new Image();
MenuButton.game1Button.src = "sprites/game1Button.bmp";
MenuButton.game2Button = new Image();
MenuButton.game2Button.src = "sprites/game2Button.bmp";
MenuButton.game3Button = new Image();
MenuButton.game3Button.src = "sprites/game3Button.bmp";
MenuButton.exitButton = new Image();
MenuButton.exitButton.src = "sprites/exitButton.bmp";


/**Animates the Game Over message over the current scene on instantiation, then transitions to the menu. */
class GameOver {

    private _fadeDuration: number = 0.5;
    private _lingerDuration: number = 3;
    private _gameOverGraphic: HTMLImageElement = new Image();
    private _currentAlpha: number = 0;

    constructor() {
        Canvases.pcContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.acContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        this._gameOverGraphic.src = "sprites/gameOver.bmp";
        window.requestAnimationFrame(() => this.draw());
    }

    private draw() {
        Canvases.acContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        this._currentAlpha += game.deltaTime / this._fadeDuration;
        Canvases.acContext.globalAlpha = this._currentAlpha;
        //this will be hit only after the image has full opacity
        if (this._currentAlpha >= 1) {
            this._fadeDuration = -this._fadeDuration;
            window.setTimeout(() => this.draw(), this._lingerDuration * 1000);
            Canvases.acContext.drawImage(this._gameOverGraphic, 0, 0);
            return;
        }
        //this won't be hit until after the image has been displayed
        if (this._currentAlpha <= 0) {
            Canvases.acContext.globalAlpha = 1; //restore canvas opacity
            new Menu(); //exit from the animation
            return;
        }
        Canvases.acContext.drawImage(this._gameOverGraphic, 0, 0);
        window.requestAnimationFrame(() => this.draw());
    }
}