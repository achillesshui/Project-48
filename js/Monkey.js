class Monkey {
    constructor(x, y) {
        var options = {
            restitution: 1.0,
            friction: 1.0,
            density: 1.0
        }
        this.body = Bodies.rectangle(x, y, 150, 100, options);
        this.image = loadImage("images/monkey.png");
        World.add(world, this.body);
    }

    display() {
        push();
        var angle = this.body.angle;
        translate(this.body.position.x, this.body.position.y);
        rotate(angle);
        imageMode(CENTER);
        image(this.image, 0,0, 150, 100);
        pop();
    }
}