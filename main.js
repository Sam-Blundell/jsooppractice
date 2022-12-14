import Player from './player.js';
import InputHandler from './input.js';
import Background from './background.js';
import { FlyingEnemy, GroundEnemy, ClimbingEnemy } from './enemies.js';
import UI from './ui.js';
import CollisionAnimation from './collisionAnimation.js';

window.addEventListener('load', function() {
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    canvas.width = 900;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundLevel = 82;
            this.speed = 0;
            this.speedModifier = 2;
            this.enemyInterval = 1000;
            this.enemyTimer = 0;
            this.score = 0;
            this.targetScore = 25;
            this.maxLives = 5;
            this.currentLives = this.maxLives;
            this.energy = 100;
            this.fontColor = 'black';
            this.debug = false;
            this.background = new Background(this);
            this.player = new Player(this);
            this.enemies = [];
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.particles = [];
            this.collisions = [];
            this.gameTime = 0;
            this.maxTime = 30000;
            this.gameOver = false;
            this.player.currentState = this.player.states[0];
            this.player.currentState.enter();
        }
        update(deltaTime) {
            this.gameTime += deltaTime;
            if (this.gameTime > this.maxTime) {
                this.gameOver = true;
            }
            this.background.update();
            this.player.update(this.input.keys, deltaTime); 
            this.enemies.forEach(enemy => {
                if (enemy.markedForDeletion) {
                    this.enemies = this.enemies.filter(enemy => enemy.markedForDeletion === false);
                } else {
                    enemy.update(deltaTime);
                }
            })
            this.addEnemy(deltaTime);
            this.particles.forEach(particle => {
                particle.update();
                if (particle.markedForDeletion) {
                    this.particles = this.particles.filter(particle => particle.markedForDeletion === false);
                }
            })
            if (this.particles.length > 50) {
                this.particles.length = 50;
            }
            this.collisions.forEach(collision => {
                if (collision.markedForDeletion) {
                    this.collisions = this.collisions.filter(collision => collision.markedForDeletion === false);
                } else {
                    collision.update(deltaTime);
                }
            })
            if (this.currentLives <= 0 || this.energy <= 0) {
                this.gameOver = true;
            }
        }
        draw(context) {
            this.background.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            })
            this.particles.forEach(particle => {
                particle.draw(context);
            })
            this.collisions.forEach(collision => {
                collision.draw(context);
            })
            this.player.draw(context);
            this.ui.draw(context);
        }
        addEnemy(deltaTime) {
            if (this.enemyTimer > this.enemyInterval) {
                this.enemyTimer = 0;
                this.enemies.push(new FlyingEnemy(game));
                if (this.speed > 0 && Math.random() > 0.5) {
                    this.enemies.push(new GroundEnemy(game));
                }
                if (this.speed > 0 && Math.random() > 0.33) {
                    this.enemies.push(new ClimbingEnemy(game));
                }
            } else {
                this.enemyTimer += deltaTime;
            }
        }
    }

    const game = new Game(canvas.width, canvas.height);

    let prevTimeStamp = 0;
    function animate(timeStamp) {
        const deltaTime = timeStamp - prevTimeStamp;
        prevTimeStamp = timeStamp;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        console.log(game.gameOver);
        if (game.gameOver === false) {
            requestAnimationFrame(animate);
        }
    }
    animate(0);
})