export default class InputHandler {
    constructor() {
        this.validKeys = ['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Enter'];
        this.keys = [];
        window.addEventListener('keydown', e => {
            if (this.validKeys.includes(e.key) && !this.keys.includes(e.key)) {
                this.keys.push(e.key);
            }
        })
        window.addEventListener('keyup', e => {
            if (this.validKeys.includes(e.key)) {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
        })
    }
}