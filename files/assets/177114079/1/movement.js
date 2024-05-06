var Movement = pc.createScript('movement');

Movement.attributes.add('speed', {
    type: 'number',
    default: 0.1,
    min: 0.05,
    max: 0.5,
    precision: 2,
    description: 'Controls the movement speed'
});

Movement.attributes.add("joystick", { type: "entity" });

// initialize code called once per entity
Movement.prototype.initialize = function () {
    this._joystick = this.joystick.script.joystick;
    this.force = new pc.Vec3();
};

// update code called every frame
Movement.prototype.update = function (dt) {
    this.force.x = this._joystick.xPosition;
    this.force.z = -this._joystick.yPosition;

    // if we have some non-zero force
    if (this.force.length()) {

        // calculate force vector
        var rX = Math.cos(-Math.PI * 0.25);
        var rY = Math.sin(-Math.PI * 0.25);
        this.force.set(this.force.x * rX - this.force.z * rY, 0, this.force.z * rX + this.force.x * rY);

        // clamp force to the speed
        if (this.force.length() > this.speed) {
            this.force.normalize().scale(this.speed);
        }
    }

    // apply impulse to move the entity
    this.entity.rigidbody.applyImpulse(this.force);
};
