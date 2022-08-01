import { Sitting, Running, Jumping, Falling } from './playerStates.js';

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
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 4;
        this.fps = 20;
        this.frameIntervalTime = 1000/this.fps;
        this.frameTimer = 0;
        this.maxSpeed = 8;
        this.jumpPower = 28;
        this.states = [
            new Sitting(this),
            new Running(this),
            new Jumping(this),
            new Falling(this),
        ];
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input, deltaTime) {
        this.currentState.handleInput(input);
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
        this.y += this.vVelocity;
        if (!this.onGround()) {
            this.vVelocity += this.weight;
        } else {
            this.vVelocity = 0;
        }
        // animation logic
        if (this.frameTimer > this.frameIntervalTime) {
            this.frameX = (this.frameX + 1) % (this.maxFrame + 1);
            this.frameTimer = 0;
        } else {
            this.frameTimer += deltaTime;
        }

    }
    draw(context) {
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - this.height;
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
}