class Game {
    constructor() {
        this.player = new Player();
        this.backgroundLayer = new BackgroundLayer();
        this.projectileLayer = new ProjectileLayer();
        this.enemySpawner = new EnemySpawner();
        window.requestAnimationFrame(() => this.draw());
    }
    //start draw loop
    draw() {
        fcContext.clearRect(0, 0, canvasWidth, canvasHeight);
        ncContext.clearRect(0, 0, canvasWidth, canvasHeight);
        pcContext.clearRect(0, 0, canvasWidth, canvasHeight);
        acContext.clearRect(0, 0, canvasWidth, canvasHeight);
        this.backgroundLayer.drawAll();
        this.projectileLayer.draw();
        this.player.draw();
        this.enemySpawner.draw();
        window.requestAnimationFrame(() => this.draw());
    }
}
//# sourceMappingURL=game.js.map