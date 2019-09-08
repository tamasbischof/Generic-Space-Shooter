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
    scale(scalar) {
        this.x *= scalar;
        this.y *= scalar;
    }
    normalize() {
        let magnitude = this.magnitude;
        this.x /= magnitude;
        this.y /= magnitude;
    }
    get magnitude() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}
var ActorType;
(function (ActorType) {
    ActorType[ActorType["Player"] = 0] = "Player";
    ActorType[ActorType["Enemy"] = 1] = "Enemy";
    ActorType[ActorType["Projectile"] = 2] = "Projectile";
})(ActorType || (ActorType = {}));
/**denotes a rectangle-shaped collider */
class Collider {
    constructor(extents) {
        this._extents = extents;
    }
    get extents() { return this._extents; }
}
class MovableEntity {
    constructor(position, width, height) {
        this._position = position;
        this._width = width;
        this._height = height;
    }
    get position() { return this._position; }
    updatePosition(direction) {
        this._position.add(direction);
    }
    draw(context, sprite = this._sprite) {
        context.drawImage(sprite, this._position.x, this._position.y, this._width, this._height);
    }
}
//# sourceMappingURL=structures.js.map