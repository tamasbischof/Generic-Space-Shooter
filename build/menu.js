class Menu {
    constructor() {
        this._buttons = new Array(4);
        this._buttonClicked = false;
        this._clickHandler = (event) => this.checkClick(event);
        Canvases.fcContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.ncContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.pcContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.acContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.fcContext.fillStyle = "#000000";
        Canvases.fcContext.fillRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        this._buttons[0] = new MenuButton(MenuButton.game1Button, 250, () => this.startGame());
        this._buttons[1] = new MenuButton(MenuButton.game2Button, 330, () => this.startGame());
        this._buttons[2] = new MenuButton(MenuButton.game3Button, 410, () => this.startGame());
        this._buttons[3] = new MenuButton(MenuButton.exitButton, 490, () => this.exit());
        this._canvasRect = Canvases.actorCanvas.getBoundingClientRect();
        this._particleEmitter = new ContinousParticleEmitter(StarParticle, 15);
        Canvases.actorCanvas.addEventListener('click', this._clickHandler);
        window.requestAnimationFrame(() => this.draw());
    }
    draw() {
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
    checkClick(event) {
        this._buttons.forEach(button => {
            if (button.check(event.clientX - this._canvasRect.left, event.clientY - this._canvasRect.top)) {
                this._buttonClicked = true;
            }
        });
    }
    startGame() {
        this.deregisterListener();
        game = new Game();
        game.start();
    }
    exit() {
        this.deregisterListener();
        window.location.href = "http://bischoftamas.com";
    }
    deregisterListener() {
        Canvases.actorCanvas.removeEventListener('click', this._clickHandler);
    }
}
class MenuButton {
    constructor(sprite, yPos, action) {
        this._sprite = sprite;
        this._action = action;
        let xPos = Canvases.canvasWidth / 2 - sprite.width / 2;
        this._topLeftCorner = new Vector2D(xPos, yPos);
        this._bottomRightCorner = new Vector2D(xPos + sprite.width, yPos + sprite.height);
    }
    check(mouseX, mouseY) {
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
class GameOver {
    constructor() {
        this.fadeDuration = 0.5;
        this.lingerDuration = 3;
        this.gameOverGraphic = new Image();
        this.currentAlpha = 0;
        Canvases.pcContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.acContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        this.gameOverGraphic.src = "sprites/gameOver.bmp";
        window.requestAnimationFrame(() => this.draw());
    }
    draw() {
        Canvases.acContext.clearRect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        this.currentAlpha += game.deltaTime / this.fadeDuration;
        Canvases.acContext.globalAlpha = this.currentAlpha;
        if (this.currentAlpha >= 1) {
            this.fadeDuration = -this.fadeDuration;
            window.setTimeout(() => this.draw(), this.lingerDuration * 1000);
            Canvases.acContext.drawImage(this.gameOverGraphic, 0, 0);
            return;
        }
        if (this.currentAlpha <= 0) {
            Canvases.acContext.globalAlpha = 1;
            new Menu();
            return;
        }
        console.log(this.gameOverGraphic);
        Canvases.acContext.drawImage(this.gameOverGraphic, 0, 0);
        window.requestAnimationFrame(() => this.draw());
    }
}
//# sourceMappingURL=menu.js.map