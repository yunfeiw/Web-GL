/**
 * @description时间轨
 */
export default class Track {
    constructor(target) {
        this.target = target;   // 目标
        this.parent = null; // 父级
        this.start = 0;     // 起始时间
        this.timeLen = 5;   // 时长
        this.loop = false; // 是否循环
        this.keyMap = new Map();  //循环帧
    }

    update(t) {
        const { keyMap, timeLen, target, loop, start } = this;
        // 本地事件
        let time = t - start;
        if (loop) {
            time = time % timeLen;
        }
        // 当前执行帧
        for (const [key, fms] of keyMap) {
            // 最后帧
            const last = fms.length - 1;
            if (time < fms[0][0]) {
                target[key] = fms[0][0]
            } else if (time > fms[last][0]) {
                target[key] = fms[last][1];
            } else {
                target[key] = getValBetweenFms(time, fms, last);
            }
        }
    }
}
// 线性补间动画
function getValBetweenFms(time, fms, last) {
    for (let i = 0; i < last; i++) {
        const fm1 = fms[i];
        const fm2 = fms[i + 1];
        if (time > fm1[0] && time < fm2[0]) {
            // 直线
            const delta = {
                x: fm2[0] - fm1[0],
                y: fm2[1] - fm1[1],
            }
            const k = delta.y / delta.x;
            const b = fm1[1] - fm1[0] * k;
            return k * time + b;
        }
    }
}