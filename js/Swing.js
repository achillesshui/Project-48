class Swing {
    constructor(bodyA, pointB){
        var options = {
            bodyA: bodyA,
            pointB: pointB,
            stiffness: 1.0,
            length: 1
        }
        this.pointB = pointB;
        this.z = 300;                              
        this.swing = Constraint.create(options);
        World.add(world, this.swing);
    }
    
    fly() {
        this.swing.bodyA = null;
    }

    display() {
        var pointA = this.swing.bodyA.position;
        var pointB = this.pointB;
        line(pointA.x, pointA.y, pointB.x, pointB.y);
    }
}