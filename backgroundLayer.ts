class BackgroundLayer {

    private farBackgroundImg: HTMLImageElement;
    private nearBackgroundImg: HTMLImageElement;
    private farFillPattern: CanvasPattern;
    private farOffset: number = 0;
    private nearOffset: number = 0;
    private farSpeed: number = 1;
    private nearSpeed: number = 4;

    constructor() {
        this.nearBackgroundImg = new Image();
        this.nearBackgroundImg.src = "sprites/meteorBackground.bmp";
        this.farBackgroundImg = new Image();
        this.farBackgroundImg.src = "sprites/starBackground.bmp";
        this.farBackgroundImg.onload = () => { this.farFillPattern = Canvases.fcContext.createPattern(this.farBackgroundImg, "repeat"); }
    }

    private calculateOffset() {
        if (this.nearOffset < Canvases.canvasWidth + this.nearBackgroundImg.width) {
            this.nearOffset += this.nearSpeed;
        }
        else {
            this.nearOffset = 0;
        }
        if (this.farOffset < Canvases.canvasWidth + this.farBackgroundImg.width) {
            this.farOffset += this.farSpeed;
        }
        else {
            this.farOffset = 0;
        }
    }

    drawAll() {
        this.calculateOffset();
        this.drawFar();
        this.drawNear();
    }

    drawFar() {
        Canvases.fcContext.fillStyle = this.farFillPattern;
        Canvases.fcContext.save();
        Canvases.fcContext.translate(-this.farOffset, 0);
        Canvases.fcContext.fill();
        Canvases.fcContext.restore();
    }

    drawNear() {
        // Canvases.ncContext.fillStyle = this.nearFillPattern;
        // Canvases.ncContext.save();
        // Canvases.ncContext.translate(-this.nearOffset, 0);
        // Canvases.ncContext.fill();
        // Canvases.ncContext.restore();
        Canvases.ncContext.drawImage(this.nearBackgroundImg, Canvases.canvasWidth - this.nearOffset, 0);
        Canvases.ncContext.drawImage(this.nearBackgroundImg, 0 - this.nearOffset, 0);
        Canvases.ncContext.drawImage(this.nearBackgroundImg, Canvases.canvasWidth * 2 - this.nearOffset, 0);
    }
}