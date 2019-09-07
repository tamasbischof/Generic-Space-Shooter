/** Represents a point or direction. */
class Vector2D {
    x : number;
    y : number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(otherVector : Vector2D) {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }
}

enum ActorType {
    Player,
    Enemy,
    Projectile
}

/**denotes a rectangle-shaped collider */
class Collider {

    private _extents : Vector2D;

    get extents() : Vector2D { return this._extents; }

    constructor(extents : Vector2D) {
        this._extents = extents;
    }
}