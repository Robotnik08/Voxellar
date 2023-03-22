export class KeyHandler {
    constructor () {
        this.keysDown = {};
        window.addEventListener("keydown", (e) => {
            this.keysDown[e.code] = true;
        })
        window.addEventListener("keyup", (e) => {
            this.keysDown[e.code] = false;
        })
        this.getKey = (keyCode) => {
            return this.keysDown[keyCode] ? true : false;
        }
    }
}