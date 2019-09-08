class InputHandler {

    private keys : Map<string,boolean>;

    private readonly player: Player;
    private speed: number;

    constructor(player: Player, speed: number) {
        this.keys = new Map<string,boolean>();
        this.player = player;
        this.speed = speed;
    }

    handleKeyDown(evt:KeyboardEvent) {
        this.keys.set(evt.key.toLowerCase(), true);
        evt.preventDefault();
    }

    handleKeyUp(evt:KeyboardEvent) {
        this.keys.set(evt.key.toLowerCase(), false);
        console.log(evt.key.toLowerCase());
        evt.preventDefault();
    }

    //direction vector y components are reversed (0,0 is upper right corner)
    handleInput() {
        let direction = new Vector2D(0,0);
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
        }

        this.player.updatePosition(direction);
    }
}