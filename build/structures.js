/** Represents a point or direction. */
class Vector2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static getRandom() {
        return new Vector2D(Math.random() * 2 - 1, Math.random() * 2 - 1);
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
/**Denotes a rectangle-shaped collider */
class Collider {
    constructor(extents, owner) {
        this.checkedThisFrame = false;
        this._owner = owner;
        this._extents = extents;
        game.collisionChecker.registerCollider(this);
    }
    get topLeftCorner() {
        return new Vector2D(this._owner.position.x - this._extents.x, this._owner.position.y - this._extents.y);
    }
    get bottomRightCorner() {
        return new Vector2D(this._owner.position.x + this._extents.x, this._owner.position.y + this._extents.y);
    }
    checkOverLap(otherCollider) {
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
    constructor() {
        this._colliders = new Array();
    }
    /**Use to add a collider for collision checking */
    registerCollider(collider) {
        this._colliders.push(collider);
    }
    /**Call on frames that need collision checking. */
    checkCollisions() {
        this._colliders.forEach(function (collider) {
            //check against each collider in the scene
            this._colliders.forEach(function (otherCollider) {
                //however, no need to check again if the collider has been checked already in an outer loop iteration
                if (otherCollider.checkedThisFrame) {
                    return;
                }
                collider.checkOverLap(otherCollider);
            }.bind(this));
            collider.checkedThisFrame = true;
        }.bind(this));
        //reset flags
        this._colliders.forEach(collider => { collider.checkedThisFrame = false; });
        this._colliders = this._colliders.filter(function (value) { return value._owner.collided == false && value._owner.outOfBounds == false; });
    }
}
class MovableEntity {
    constructor(position, width, height) {
        this.outOfBounds = false;
        this.collided = false; //this keeps track of only fatal collisions
        this._position = position;
        this._width = width;
        this._height = height;
        this._collider = new Collider(new Vector2D(width / 2, height / 2), this);
    }
    get position() { return this._position; }
    get collider() { return this._collider; }
    get actorType() { return this._actorType; }
    updatePosition(direction) {
        this._position.add(direction);
    }
    draw(context, sprite = this._sprite) {
        context.drawImage(sprite, this._position.x, this._position.y, this._width, this._height);
    }
    resolveCollision() {
        if (!this.collided)
            return;
        else {
            this.destroy();
        }
    }
    destroy() {
    }
}
//# sourceMappingURL=structures.js.map