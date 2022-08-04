import { Sitting, Running, Jumping, Falling, Rolling, Diving } from './playerStates.js';

export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = game.height - (this.height + this.game.groundLevel);
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
        this.jumpPower = 26;
        this.states = [
            new Sitting(this.game),
            new Running(this.game),
            new Jumping(this.game),
            new Falling(this.game),
            new Rolling(this.game),
            new Diving(this.game),
        ];
    }
    update(input, deltaTime) {
        this.checkCollision();
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
        if (this.y > this.game.height - (this.height + this.game.groundLevel)) {
            this.y = this.game.height - (this.height + this.game.groundLevel);
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
        if (this.game.debug === true) {
            context.strokeRect(this.x, this.y, this.width, this.height);
        }
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    onGround() {
        return this.y >= this.game.height - (this.height + this.game.groundLevel);
    }
    setState(state, stateSpeed) {
        this.currentState = this.states[state];
        this.game.speed = this.game.speedModifier * stateSpeed;
        this.currentState.enter();
    }
    checkCollision() {
        this.game.enemies.forEach(enemy => {
            if (
                enemy.x <= (this.x + this.width) &&
                (enemy.x + enemy.width) >= this.x &&
                enemy.y <= (this.y + this.height) &&
                (enemy.y + enemy.height) >= this.y 
            ) {
                enemy.markedForDeletion = true;
                this.game.score += 1;
            }
        })
    }
}