export default class CollisionAnimation {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.image = document.getElementById('hitcloud');
        this.width = 100;
        this.height = 90;
        this.frameX = 0;
        this.maxFrame = 4;
        this.markedForDeletion = false;
        this.fps = 10;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(deltaTime) {
        if (this.frameTimer >= this.frameInterval) {
            this.frameTimer = 0;
            this.frameX++;
        } else {
            this.frameTimer += deltaTime;
        }
        if (this.frameX >= this.maxFrame) {
            this.markedForDeletion = true;
        }
    }
}