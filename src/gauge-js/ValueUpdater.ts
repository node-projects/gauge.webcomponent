import { AnimationUpdater } from "./AnimationUpdater.js";

export abstract class ValueUpdater {
    animationSpeed: number = 32;
    clear: boolean;
    displayedValue: any = 0;
    value: any = [20];
    ctx: any;
    canvas: HTMLCanvasElement;

    constructor(addToAnimationQueue: boolean = true, clear: boolean = true) {
        if (addToAnimationQueue == null) { addToAnimationQueue = true; }
        if (clear == null) { clear = true; }
        this.clear = clear;
        if (addToAnimationQueue) {
            AnimationUpdater.add(this);
        }
    }

    update(force: boolean) {
        if (force == null) { force = false; }
        if (force || (this.displayedValue !== this.value)) {
            if (this.ctx && this.clear) {
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
            const diff = this.value - this.displayedValue;
            if (Math.abs(diff / this.animationSpeed) <= 0.001) {
                this.displayedValue = this.value;
            } else {
                this.displayedValue = this.displayedValue + (diff / this.animationSpeed);
            }
            this.render();
            return true;
        }
        return false;
    }
    abstract render();
}