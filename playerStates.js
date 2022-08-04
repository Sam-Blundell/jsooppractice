import { Dust } from './particles.js';

const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
    ROLLING: 4,
    DIVING: 5,
    HIT: 6,
}

const speeds = {
    STILL: 0,
    SLOW: 1,
    FAST: 2,
}

class State {
    constructor(state, game) {
        this.state = state;
        this.game = game;
    }
}

export class Sitting extends State {
    constructor(game) {
        super('SITTING', game);
    }
    enter () {
        this.game.player.frameX = 0;
        this.game.player.frameY = 5;
        this.game.player.maxFrame = 4;
    }
    handleInput(input) {
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.game.player.setState(states.RUNNING, speeds.FAST);
        }
        if (input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.setState(states.JUMPING, speeds.FAST);
        }
        if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING, speeds.FAST);
        }
    }
}

export class Running extends State {
    constructor(game) {
        super('RUNNING', game);
    }
    enter () {
        this.game.player.frameX = 0;
        this.game.player.frameY = 3;
        this.game.player.maxFrame = 8;
    }
    handleInput(input) {
        this.game.particles.push(new Dust(this.game, this.game.player.x + (this.game.player.width / 1.5), this.game.player.y + (this.game.player.height * 0.95)));
        if (input.includes('ArrowDown')) {
            this.game.player.setState(states.SITTING, speeds.STILL);
        }
        if (input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.setState(states.JUMPING, speeds.FAST);
        }
        if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING, speeds.FAST);
        }
   }
}

export class Jumping extends State {
    constructor(game) {
        super('JUMPING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 1;
        this.game.player.maxFrame = 6;
        this.game.player.maxSpeed = 4;
        this.game.player.vVelocity = -this.game.player.jumpPower;
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, speeds.FAST);
            this.game.player.maxSpeed = 8;
        };
        if (this.game.player.vVelocity >= 0) {
            this.game.player.setState(states.FALLING, speeds.FAST);
        }
        if (input.includes('Enter')) {
            this.game.player.setState(states.ROLLING, speeds.FAST);
        }
    } 
}

export class Falling extends State {
    constructor(game) {
        super('FALLING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 2;
        this.game.player.maxFrame = 6;
    }
    handleInput(input) {
        if (this.game.player.onGround()) {
            this.game.player.setState(states.RUNNING, speeds.FAST);
            this.game.player.maxSpeed = 8;
        };
    }
}

export class Rolling extends State {
    constructor(game) {
        super('ROLLING', game);
    }
    enter() {
        this.game.player.frameX = 0;
        this.game.player.frameY = 6;
        this.game.player.maxFrame = 6;
    }
    handleInput(input) {
        if (!input.includes('Enter')) {
            if (this.game.player.onGround()) {
                this.game.player.setState(states.RUNNING, speeds.FAST);
            } else {
                this.game.player.setState(states.FALLING, speeds.SLOW)
            }
        }            
        if (input.includes('ArrowUp') && this.game.player.onGround()) {
            this.game.player.vVelocity = -this.game.player.jumpPower;
        }
    };
}
