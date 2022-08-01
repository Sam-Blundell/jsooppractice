class Enemy {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.fps = 20;
        this.frameIntervalTime = 1000/this.fps;
        this.frameTimer = 0;
    }
    update() {

    }
    draw() {

    }
}

class FlyingEnemy extends Enemy {

}

class GroundEnemy extends Enemy {

}

class ClimbingEnemy extends Enemy {

}