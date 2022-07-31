export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = game.height - this.height;
        this.hVelocity = 0;
        this.vVelocity = 0;
        this.weight = 1;
        this.image = document.getElementById('player');
        this.maxSpeed = 8;
        this.jumpPower = 28;
    }
    update(input) {
        // horizontal movement
        this.x += this.hVelocity;
        if (input.includes('ArrowRight')) {
            this.hVelocity = this.maxSpeed;
        } else if (input.includes('ArrowLeft')) {
            this.hVelocity = -this.maxSpeed;
        } else {
            this.hVelocity = 0;
        }
        if (this.x < 0) this.x = 0;
        if (this.x > (this.game.width - this.width)) this.x = this.game.width - this.width;
        // vertical movement
        if (input.includes('ArrowUp') && this.onGround()) {
            this.vVelocity = -this.jumpPower;
        }
        this.y += this.vVelocity;
        if (!this.onGround()) {
            this.vVelocity += this.weight;
        } else {
            this.vVelocity = 0;
        }

    }
    draw(context) {
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height;
    }
}