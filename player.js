export default class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = game.height - this.height;
        this.image = document.getElementById('player');
    }
    update() {

    }
    draw(context) {
        // context.fillStyle = 'darkred';
        // context.fillRect(this.x, this.y, this.width, this.height);
        context.drawImage(this.image, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}