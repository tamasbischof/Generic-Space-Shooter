/**Displays the game splash on instantiation */
class Splash {

    private _splashImg: HTMLImageElement = new Image();
    _alpha: number = 0;
    _fadeSpeed: number = 0.02;

    constructor() {
        //load splash bmp
        this._splashImg.src = "sprites/logo.bmp";
        //set up the background (plain black)
        fcContext.beginPath();
        fcContext.fillStyle = "#000000";
        fcContext.rect(0, 0, canvasWidth, canvasHeight);
        fcContext.fill();
        window.requestAnimationFrame(() => this.draw());
    }

    //will fade the logo in, wait 2 seconds, then fade it out
    draw() {
        acContext.clearRect(0, 0, canvasWidth, canvasHeight);
        this._alpha += this._fadeSpeed;
        acContext.globalAlpha = this._alpha;
        if (this._alpha >= 1) { //will be hit only when the splash has been faded in
            this._fadeSpeed = -this._fadeSpeed;
            window.setTimeout(() => this.draw(), 2000);
            acContext.drawImage(this._splashImg, 0, 0);
            return;
        }
        if (this._alpha <= 0) { //hit only when animation is complete, proceed to menu
            new Menu();
            acContext.globalAlpha = 1;
            return;
        }
        acContext.drawImage(this._splashImg, 0, 0);
        window.requestAnimationFrame(() => this.draw());
    }
}