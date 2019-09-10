/**Handles drawing on the background layer, implements parallax scrolling. A draw() call has to be issued per frame.*/
class BackgroundLayer {
    constructor() {
        this._farOffset = 0; //keeps track where to draw the background pattern
        this._nearOffset = 0;
        this._farSpeed = 1; //how fast the background should move
        this._nearSpeed = 4;
        this._nearBackgroundImg = new Image();
        this._nearBackgroundImg.src = "sprites/meteorBackground.bmp";
        this._farBackgroundImg = new Image();
        this._farBackgroundImg.src = "sprites/starBackground.bmp";
        this._farBackgroundImg.onload = () => { this._farFillPattern = Canvases.fcContext.createPattern(this._farBackgroundImg, "repeat"); };
    }
    draw() {
        this.calculateOffset();
        this.drawFar();
        this.drawNear();
    }
    calculateOffset() {
        if (this._nearOffset < Canvases.canvasWidth + this._nearBackgroundImg.width) {
            this._nearOffset += this._nearSpeed;
        }
        else {
            this._nearOffset = 0;
        }
        if (this._farOffset < Canvases.canvasWidth + this._farBackgroundImg.width) {
            this._farOffset += this._farSpeed;
        }
        else {
            this._farOffset = 0;
        }
    }
    drawFar() {
        Canvases.fcContext.fillStyle = this._farFillPattern;
        Canvases.fcContext.save();
        Canvases.fcContext.translate(-this._farOffset, 0);
        Canvases.fcContext.fill();
        Canvases.fcContext.restore();
    }
    drawNear() {
        // Canvases.ncContext.fillStyle = this.nearFillPattern;
        // Canvases.ncContext.save();
        // Canvases.ncContext.translate(-this.nearOffset, 0);
        // Canvases.ncContext.fill();
        // Canvases.ncContext.restore();
        Canvases.ncContext.drawImage(this._nearBackgroundImg, Canvases.canvasWidth - this._nearOffset, 0);
        Canvases.ncContext.drawImage(this._nearBackgroundImg, 0 - this._nearOffset, 0);
        Canvases.ncContext.drawImage(this._nearBackgroundImg, Canvases.canvasWidth * 2 - this._nearOffset, 0);
    }
}
//# sourceMappingURL=backgroundLayer.js.map