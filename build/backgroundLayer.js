class BackgroundLayer {
    constructor() {
        this.farOffset = 0;
        this.nearOffset = 0;
        this.farSpeed = 1;
        this.nearSpeed = 4;
        this.nearBackgroundImg = new Image();
        this.nearBackgroundImg.src = "sprites/meteorBackground.bmp";
        this.nearBackgroundImg.onload = () => { this.nearFillPattern = ncContext.createPattern(this.nearBackgroundImg, "repeat-x"); };
        this.farBackgroundImg = new Image();
        this.farBackgroundImg.src = "sprites/starBackground.bmp";
        this.farBackgroundImg.onload = () => { this.farFillPattern = fcContext.createPattern(this.farBackgroundImg, "repeat"); };
    }
    calculateOffset() {
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
//# sourceMappingURL=backgroundLayer.js.map