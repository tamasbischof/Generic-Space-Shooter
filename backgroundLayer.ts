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
        this.farBackgroundImg.onload = () => { this.farFillPattern = fcContext.createPattern(this.farBackgroundImg, "repeat"); }
    }

    private calculateOffset() {
        if (this.nearOffset < canvasWidth + this.nearBackgroundImg.width) {
            this.nearOffset += this.nearSpeed;
        }
        else {
            this.nearOffset = 0;
        }
        if (this.farOffset < canvasWidth + this.farBackgroundImg.width) {
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
        fcContext.fillStyle = this.farFillPattern;
        fcContext.save();
        fcContext.translate(-this.farOffset, 0);
        fcContext.fill();
        fcContext.restore();
    }

    drawNear() {
        // ncContext.fillStyle = this.nearFillPattern;
        // ncContext.save();
        // ncContext.translate(-this.nearOffset, 0);
        // ncContext.fill();
        // ncContext.restore();
        ncContext.drawImage(this.nearBackgroundImg, canvasWidth - this.nearOffset, 0);
        ncContext.drawImage(this.nearBackgroundImg, 0 - this.nearOffset, 0);
        ncContext.drawImage(this.nearBackgroundImg, canvasWidth * 2 - this.nearOffset, 0);
    }
}