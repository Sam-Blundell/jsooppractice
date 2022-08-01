const states = {
    SITTING: 0,
    RUNNING: 1,
    JUMPING: 2,
    FALLING: 3,
}

const speeds = {
    STILL: 0,
    SLOW: 1,
    FAST: 2,
}

class State {
    constructor(state) {
        this.state = state;
    }
}

export class Sitting extends State {
    constructor(player) {
        super('SITTING');
        this.player = player;
    }
    enter () {
        this.player.frameX = 0;
        this.player.frameY = 5;
        this.player.maxFrame = 4;
    }
    handleInput(input) {
        if (input.includes('ArrowLeft') || input.includes('ArrowRight')) {
            this.player.setState(states.RUNNING, speeds.FAST);
        }
        if (input.includes('ArrowUp') && this.player.onGround()) {
            this.player.setState(states.JUMPING, speeds.SLOW);
        }
    }
}

export class Running extends State {
    constructor(player) {
        super('RUNNING');
        this.player = player;
    }
    enter () {
        this.player.frameX = 0;
        this.player.frameY = 3;
        this.player.maxFrame = 8;
    }
    handleInput(input) {
        if (input.includes('ArrowDown')) {
            this.player.setState(states.SITTING, speeds.STILL);
        }
        if (input.includes('ArrowUp') && this.player.onGround()) {
            this.player.setState(states.JUMPING, speeds.SLOW);
        }
    }
}

export class Jumping extends State {
    constructor(player) {
        super('JUMPING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 1;
        this.player.maxFrame = 6;
        this.player.maxSpeed = 4;
        this.player.vVelocity = -this.player.jumpPower;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING, speeds.FAST);
            this.player.maxSpeed = 8;
        };
        if (this.player.vVelocity >= 0) {
            this.player.setState(states.FALLING, speeds.SLOW);
        }
    }
}

export class Falling extends State {
    constructor(player) {
        super('FALLING');
        this.player = player;
    }
    enter() {
        this.player.frameX = 0;
        this.player.frameY = 2;
        this.player.maxFrame = 6;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.setState(states.RUNNING, speeds.FAST);
            this.player.maxSpeed = 8;
        };
    }
}