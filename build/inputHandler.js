class InputHandler {
    constructor(player, speed) {
        this.keys = new Map();
        this.player = player;
        this.speed = speed;
    }
    handleKeyDown(evt) {
        this.keys.set(evt.key.toLowerCase(), true);
        evt.preventDefault();
    }
    handleKeyUp(evt) {
        this.keys.set(evt.key.toLowerCase(), false);
        console.log(evt.key.toLowerCase());
        evt.preventDefault();
    }
    //direction vector y components are reversed (0,0 is upper right corner)
    handleInput() {
        let direction = new Vector2D(0, 0);
        if (this.keys.get("w") || this.keys.get("arrowup")) {
            direction.y -= this.speed;
        }
        if (this.keys.get("s") || this.keys.get("arrowdown")) {
            direction.y += this.speed;
        }
        if (this.keys.get("d") || this.keys.get("arrowright")) {
            direction.x += this.speed;
        }
        if (this.keys.get("a") || this.keys.get("arrowleft")) {
            direction.x -= this.speed;
        }
        if (this.keys.get(" ")) {
            game.projectileLayer.addprojectile(new Vector2D(this.player.position.x, this.player.position.y));
            console.log("fire");
        }
        this.player.updatePosition(direction);
    }
}
//# sourceMappingURL=inputHandler.js.map