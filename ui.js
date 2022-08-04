export default class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = 'Helvetica';
    }
    draw(context) {
        context.font = `${this.fontSize}px ${this.fontFamily}`;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // score
        context.fillText(`Score: ${this.game.score} ${this.game.debug ? 'Debug Mode On.' : ''}`, 20, 50);
        // timer
        context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
        context.fillText(`Time: ${Math.round(this.game.gameTime / 1000)}`, 20, 80);
        context.fillText(`Lives: ${this.game.currentLives}`, 20, 110);
        context.fillText(`Energy: ${this.game.energy}`, 20, 140);
        // game over
        if (this.game.gameOver === true) {
            context.textAlign = 'center';
            context.font = `${this.fontSize * 2}px ${this.fontFamily}`;
            if (this.game.score >= this.game.targetScore) {
                context.fillText('win', this.game.width * 0.5, (this.game.height * 0.5) - 20);
                context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
                context.fillText('win subtitle', this.game.width * 0.5, (this.game.height * 0.5) + 20);
            } else {
                context.fillText('lose', this.game.width * 0.5, (this.game.height * 0.5) - 20);
                context.font = `${this.fontSize * 0.8}px ${this.fontFamily}`;
                context.fillText('lose subtitle', this.game.width * 0.5, (this.game.height * 0.5) + 20);
            }
        }
    }
}