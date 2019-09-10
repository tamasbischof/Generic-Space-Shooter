/**Displays the game splash on instantiation */
class Splash {
    constructor() {
        this._splashImg = new Image();
        this._alpha = 0;
        this._fadeSpeed = 0.02;
        //load splash bmp
        this._splashImg.src = "sprites/logo.bmp";
        //set up the background (plain black)
        fcContext.beginPath();
        fcContext.fillStyle = "#000000";
        fcContext.rect(0, 0, canvasWidth, canvasHeight);
        fcContext.fill();
        window.requestAnimationFrame(() => this.drawLogo());
    }
    //will fade the logo in, wait 2 seconds, then fade it out
    drawLogo() {
        acContext.clearRect(0, 0, canvasWidth, canvasHeight);
        this._alpha += this._fadeSpeed;
        acContext.globalAlpha = this._alpha;
        if (this._alpha >= 1) {
            this._fadeSpeed = -this._fadeSpeed;
            window.setTimeout(() => this.drawLogo(), 2000);
            acContext.drawImage(this._splashImg, 0, 0);
            return;
        }
        if (this._alpha <= 0) {
            //animation complete, proceed to menu
            new Menu();
            acContext.globalAlpha = 1;
            return;
        }
        acContext.drawImage(this._splashImg, 0, 0);
        window.requestAnimationFrame(() => this.drawLogo());
    }
}
//# sourceMappingURL=splash.js.map