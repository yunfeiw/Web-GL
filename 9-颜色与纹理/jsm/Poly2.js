const defAttr = () => ({
    gl: null,
    type: 'POINTS',
    source: [],
    sourceSize: 0,
    elementBytes: 4,
    categorySize: 0,
    attributes: {},
    uniforms: {}
})

export default class Poly {
    constructor(attr) {
        Object.assign(this, defAttr(), attr);
        this.init();
    }
    init() {
        if (!this.gl) { return };

    }
    // 计算尺寸
    calculateSize() {
        const { attributes, elementBytes, source } = this;
        let categorySize = 0; // 类目尺寸
        Object.values(attributes).forEach(ele => {
            const { size, index } = ele;
            categorySize += size;
            ele.byteIndex = index * elementBytes;
        });
        this.categorySize = categorySize;
        this.categoryBytes = categorySize * elementBytes;
        this.sourceSize = source.length / categorySize;
    }
    // 更新属性
    updateAttribute() {
        const { gl, attributes, categoryBytes, source } = this;
        const sourceBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, sourceBuffer);
        gl.bufferData(gl.ARRAY, new Float32Array(source), gl.STATIC_DRAW);
        for (let [key, { size, byteIndex }] of Object.entries(attributes)) {
            const attr = gl.getAttribuLocation(gl.program, key);
            gl.vertexAttribPointer(
                attr,
                size,
                gl.FLOAT,
                false,
                categoryBytes,
                byteIndex
            );
            gl.enableVertexAttribArray(attr);
        }
    }
    // 更新点位
    updateUniform() {
        const { gl, uniforms } = this;
        for (let [key, val] of Object.entries(uniforms)) {
            const { type, value } = val;
            const u = gl.getUniformLocation(gl.program, key);
            if (type.includes('Matrix')) {
                gl[type](u, false, value);
            } else {
                gl[type](u, value);
            }
        }
    }
    // 绘制
    draw(type = this.type) {
        const { gl, sourceSize } = this;
        gl.drawArrays(gl[type], 0, sourceSize);
    }
}