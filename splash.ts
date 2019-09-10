/**Displays the game splash on instantiation */
class Splash {

    private _splashImg: HTMLImageElement = new Image();
    _alpha: number = 0;
    _fadeSpeed: number = 0.02;

    constructor() {
        //load splash bmp
        this._splashImg.src = "sprites/logo.bmp";
        //set up the background (plain black)
        Canvases.fcContext.beginPath();
        Canvases.fcContext.fillStyle = "#000000";
        Canvases.fcContext.rect(0, 0, Canvases.canvasWidth, Canvases.canvasHeight);
        Canvases.fcContext.fill();
        window.requestAnimationFrame(() => this.draw());
    }

    //will fade the logo in, wait 2 seconds, then fade it out
    draw() {
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