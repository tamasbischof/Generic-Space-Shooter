/** Represents a point or direction. */
class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    add(otherVector: Vector2D) {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }

    scale(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
    }

    normalize() {
        let magnitude = this.magnitude;
        this.x /= magnitude;
        this.y /= magnitude;
    }

    get magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
}

enum ActorType {
    Player,
    Enemy,
    Projectile
}

/**denotes a rectangle-shaped collider */
class Collider {

    private _extents: Vector2D;

    get extents(): Vector2D { return this._extents; }

    constructor(extents: Vector2D) {
        this._extents = extents;
    }
}

class MovableEntity {
    protected _position: Vector2D;
    protected _sprite: HTMLImageElement;
    protected _width: number;
    protected _height: number;
    protected _speed: number;

    get position(): Vector2D { return this._position; }

    protected constructor(position: Vector2D, width: number, height: number) {
        this._position = position;
        this._width = width;
        this._height = height;
    }

    updatePosition(direction: Vector2D) {
        this._position.add(direction);
    }

    draw(context : CanvasRenderingContext2D, sprite : HTMLImageElement = this._sprite) {
        context.drawImage(sprite, this._position.x, this._position.y, this._width, this._height);
    }
}