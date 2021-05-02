class Track {
    constructor(target) {
        this.target = target;
        this.parent = null;
        this.loop = false;
        this.rate = 0.01;
        this.len = 4;
    }
    update() {
        const { target, len, loop } = this;
        for (var i = 0; i < target.length; i = i + len) {
        if (target[i] >= 1) {
            this.rate = -0.01;
        } else if (target[i] <= -1) {
            this.rate = 0.01;
        }
        target[i] = target[i] + this.rate;
            console.log(target[i])
        }
    }
}
export { Track };