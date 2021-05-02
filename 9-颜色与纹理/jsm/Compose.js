class Compose {
    constructor() {
        this.parent = null;
        this.arr = [];
    }
    add(e) {
        e.parent = this;
        this.arr.push(e);
    }
    update() {
        this.arr.forEach(e => {
            e.update();
        });
    }
}
export { Compose };