/** Represents a point or direction. */
class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    add(otherVector) {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }
}
var ActorType;
(function (ActorType) {
    ActorType[ActorType["Player"] = 0] = "Player";
    ActorType[ActorType["Enemy"] = 1] = "Enemy";
})(ActorType || (ActorType = {}));
//# sourceMappingURL=structures.js.map