/** Represents a point or direction. */
class Vector2D {
    x: number;
    y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static getRandom() : Vector2D {
        return new Vector2D(Math.random() * 2 - 1, Math.random() * 2 - 1);
    }

    add(otherVector: Vector2D) {
        this.x += otherVector.x;
        this.y += otherVector.y;
    }

    scale(scalar: number) {
        this.x *= scalar;
        this.y *= scalar;
    }

    multiply(scalar: number) : Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar);
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

/**Denotes a rectangle-shaped collider */
class Collider {

    readonly _extents: Vector2D;
    readonly _owner: MovableEntity;
    checkedThisFrame: boolean = false;

    get topLeftCorner(): Vector2D {
        return new Vector2D(this._owner.position.x - this._extents.x,
            this._owner.position.y - this._extents.y);
    }

    get bottomRightCorner(): Vector2D {
        return new Vector2D(this._owner.position.x + this._extents.x,
            this._owner.position.y + this._extents.y);
    }

    constructor(extents: Vector2D, owner: MovableEntity) {
        this._owner = owner;
        this._extents = extents;
        game.collisionChecker.registerCollider(this);
    }

    checkOverLap(otherCollider: Collider) {
        this.checkedThisFrame = true;
        //check if the collision matters
        switch (this._owner.actorType) {
            case ActorType.Projectile:
                if (otherCollider._owner.actorType == ActorType.Player ||
                    otherCollider._owner.actorType == ActorType.Projectile) {
                    return;
                }
                break;
            case ActorType.Enemy:
                if (otherCollider._owner.actorType == ActorType.Enemy) {
                    return;
                }
                break;
            case ActorType.Player:
                if (otherCollider._owner.actorType == ActorType.Player ||
                    otherCollider._owner.actorType == ActorType.Projectile) {
                    return;
                }
                break;
        }
        let topLeft = this.topLeftCorner;
        let botRight = this.bottomRightCorner;
        let otherTopLeft = otherCollider.topLeftCorner;
        let otherBotRight = otherCollider.bottomRightCorner;

        //check if a collision happened
        //check if one is to the right of the other - no overlap in this case
        if (topLeft.x > otherBotRight.x ||
            otherTopLeft.x > botRight.x) {
            return;
        }
        //check if one is positioned below the other (remember, canvas y-axis is "flipped"), no overlap in this case either
        if (topLeft.y > otherBotRight.y ||
            otherTopLeft.y > botRight.y) {
            return;
        }
        //otherwise mark both as handled
        this._owner.collided = true;
        this._owner.collidedWith = otherCollider;
        otherCollider._owner.collided = true;
        otherCollider._owner.collidedWith = this;

    }
}

/**Performs collision checking on each registered Collider. Automatically removes Colliders whose owners are expired. A checkCollisions() call is required each frame to properly evaluate collisions.
 * Use the registerCollider(Collider) method to add a Collider for checking.*/
class CollisionChecker {

    private _colliders: Array<Collider> = new Array<Collider>();

    /**Use to add a collider for collision checking */
    registerCollider(collider: Collider) {
        this._colliders.push(collider);
    }

    /**Call on frames that need collision checking. */
    checkCollisions() {
        this._colliders.forEach(function(collider) {
            //check against each collider in the scene
            this._colliders.forEach(function(otherCollider) {
                //however, no need to check again if the collider has been checked already in an outer loop iteration
                if (otherCollider.checkedThisFrame) {
                    return;
                }
                collider.checkOverLap(otherCollider);
            }.bind(this));
            collider.checkedThisFrame = true;
        }.bind(this));

        //reset flags
        this._colliders.forEach(collider => { collider.checkedThisFrame = false });
        this._colliders = this._colliders.filter(function(value) { return value._owner.collided == false && value._owner.outOfBounds == false });
    }
}

class MovableEntity {
    protected _position: Vector2D;
    protected _sprite: HTMLImageElement;
    protected _width: number;
    protected _height: number;
    protected _speed: number;
    protected _actorType: ActorType;
    protected readonly _collider: Collider;
    outOfBounds: boolean = false;
    collided: boolean = false; //this keeps track of only fatal collisions
    collidedWith: Collider; //change to array if handling more than one collision is required in the future (e.g. enemies bouncing off each other)

    get position(): Vector2D { return this._position; }
    get collider(): Collider { return this._collider; }
    get actorType(): ActorType { return this._actorType; }

    protected constructor(position: Vector2D, width: number, height: number) {
        this._position = position;
        this._width = width;
        this._height = height;
        this._collider = new Collider(new Vector2D(width / 2, height / 2), this);
    }

    updatePosition(direction: Vector2D) {
        this._position.add(direction.multiply(game.deltaTime));
    }

    draw(context: CanvasRenderingContext2D, sprite: HTMLImageElement = this._sprite) {
        context.drawImage(sprite, this._position.x, this._position.y, this._width, this._height);
    }

    resolveCollision() {
        if (!this.collided) return;
        else {
            this.destroy();
        }
    }

    destroy() {

    }
}