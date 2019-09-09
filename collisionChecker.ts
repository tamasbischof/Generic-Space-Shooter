class CollisionChecker {

    colliders: Array<Collider> = new Array<Collider>();

    registerCollider(collider: Collider) {
        this.colliders.push(collider);
    }

    checkCollisions() {
        this.colliders.forEach(function(collider) {
            //check against each collider in the scene
            this.colliders.forEach(function(otherCollider) {
                //however, no need to check again if the collider has been checked already in an outer loop iteration
                if (otherCollider.checkedThisFrame) {
                    return;
                }
                collider.checkOverLap(otherCollider);
            }.bind(this));
            collider.checkedThisFrame = true;
        }.bind(this));

        //reset flags
        this.colliders.forEach(collider => { collider.checkedThisFrame = false });
        this.colliders = this.colliders.filter(function(value) { return value._owner.collided == false && value._owner.outOfBounds == false });
    }
}