var Joystick = pc.createScript('joystick');

Joystick.attributes.add("circle", { type: "entity" });
Joystick.attributes.add("radius", { type: "number", default: 100 });

Joystick.prototype.initialize = function () {
    this.xPosition = 0;
    this.yPosition = 0;

    this.app.mouse.on(pc.EVENT_MOUSEDOWN, this.onMouseDown, this);
    this.app.mouse.on(pc.EVENT_MOUSEUP, this.onMouseUp, this);
    this.app.mouse.on(pc.EVENT_MOUSEMOVE, this.onMouseMove, this);
};

Joystick.prototype.onMouseDown = function (event) {
    this.isPressed = true;
};

Joystick.prototype.onMouseUp = function (event) {
    this.isPressed = false;
    this.xPosition = 0;
    this.yPosition = 0;
    this.circle.setLocalPosition(0, 0, 0);
};

Joystick.prototype.onMouseMove = function (event) {
    if (!this.isPressed) return;

    var dx = event.dx;
    var dy = event.dy;

    var pos = this.circle.getLocalPosition();

    pos.x += dx;
    pos.y -= dy;

    var len = pos.length();

    if (len > this.radius) {
        pos.normalize().scale(this.radius);
    }

    this.circle.setLocalPosition(pos);

    this.xPosition = pos.x / this.radius;
    this.yPosition = pos.y / this.radius;
};
