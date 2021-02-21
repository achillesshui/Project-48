class StartRope {
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 0.04,
            length: 300
        }
        this.pointB = pointB
        this.startRope = Constraint.create(options);
        World.add(world, this.startRope);
    }
    
    detach() {
        this.startRope.bodyA = null;
    }

    attach(body) {
        this.startRope.bodyA = body;
    }

    display() {
        var pointA = this.startRope.bodyA.position;
        var pointB = this.pointB;
        line(pointA.x, pointA.y, pointB.x, pointB.y);
    }
}