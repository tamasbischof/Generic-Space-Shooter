class Menu {

    static logo: HTMLImageElement;
    _buttons: Array<MenuButton> = new Array<MenuButton>(4);
    private _buttonClicked: boolean = false;
    private _canvasRect : ClientRect;
    private _clickHandler = (event: MouseEvent) => this.checkClick(event);
    private _particleEmitter: ContinousParticleEmitter<StarParticle>;

    constructor() {
        fcContext.clearRect(0, 0, canvasWidth, canvasHeight);
        ncContext.clearRect(0, 0, canvasWidth, canvasHeight);
        pcContext.clearRect(0, 0, canvasWidth, canvasHeight);
        acContext.clearRect(0, 0, canvasWidth, canvasHeight);
        fcContext.fillStyle = "#000000";
        fcContext.fillRect(0, 0, canvasWidth, canvasHeight);
        this._buttons[0] = new MenuButton(MenuButton.game1Button, 250, () => this.startGame());
        this._buttons[1] = new MenuButton(MenuButton.game2Button, 330, () => this.startGame());
        this._buttons[2] = new MenuButton(MenuButton.game3Button, 410, () => this.startGame());
        this._buttons[3] = new MenuButton(MenuButton.exitButton, 490, () => this.exit());
        this._canvasRect = actorCanvas.getBoundingClientRect();
        this._particleEmitter = new ContinousParticleEmitter<StarParticle>(StarParticle, 15);
        actorCanvas.addEventListener('click', this._clickHandler);
        window.requestAnimationFrame(() => this.draw());
    }

    draw() {
        if (this._buttonClicked) {
            return;
        }
        pcContext.clearRect(0, 0, canvasWidth, canvasHeight);
        acContext.clearRect(0, 0, canvasWidth, canvasHeight);
        //draw the logo
        acContext.drawImage(Menu.logo, canvasWidth / 2 - Menu.logo.width / 2, 50);
        //draw the buttons
        this._buttons.forEach(button => {
            button.draw();
        });
        //draw particle effect
        this._particleEmitter.draw();
        window.requestAnimationFrame(() => this.draw());
    }

    checkClick(event: MouseEvent) {
        this._buttons.forEach(button => {
            if (button.check(event.clientX - this._canvasRect.left, event.clientY - this._canvasRect.top)) {
                this._buttonClicked = true;
            }
        });
    }

    startGame() {
        game = new Game();
        game.start();
        this.deregisterListener();
    }

    exit() {
        window.location.href = "http://bischoftamas.com";
        this.deregisterListener();
    }

    deregisterListener() {
        actorCanvas.removeEventListener('click', this._clickHandler);
    }
}

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
        let xPos = canvasWidth / 2 - sprite.width / 2;
        this._topLeftCorner = new Vector2D(xPos, yPos);
        this._bottomRightCorner = new Vector2D(xPos + sprite.width, yPos + sprite.height);
    }

    check(mouseX: number, mouseY: number): boolean {
        if (mouseX < this._topLeftCorner.x || mouseX > this._bottomRightCorner.x ||
            mouseY < this._topLeftCorner.y || mouseY > this._bottomRightCorner.y) {
            return false;
        }
        this._action();
        return true;
    }

    draw() {
        acContext.drawImage(this._sprite, this._topLeftCorner.x, this._topLeftCorner.y);
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


class GameOver {

    private fadeDuration: number = 0.5;
    private lingerDuration: number = 3;
    private gameOverGraphic: HTMLImageElement = new Image();
    currentAlpha: number = 0;

    constructor() {
        pcContext.clearRect(0, 0, canvasWidth, canvasHeight);
        acContext.clearRect(0, 0, canvasWidth, canvasHeight);
        this.gameOverGraphic.src = "sprites/gameOver.bmp";
        window.requestAnimationFrame(() => this.draw());
    }

    draw() {
        acContext.clearRect(0, 0, canvasWidth, canvasHeight);
        this.currentAlpha += game.deltaTime / this.fadeDuration;
        acContext.globalAlpha = this.currentAlpha;
        if (this.currentAlpha >= 1) {
            this.fadeDuration = -this.fadeDuration;
            window.setTimeout(() => this.draw(), this.lingerDuration * 1000);
            acContext.drawImage(this.gameOverGraphic, 0, 0);
            return;
        }
        if (this.currentAlpha <= 0) {
            acContext.globalAlpha = 1;
            new Menu();
            return;
        }
        console.log(this.gameOverGraphic);
        acContext.drawImage(this.gameOverGraphic, 0, 0);
        window.requestAnimationFrame(() => this.draw());
    }
}