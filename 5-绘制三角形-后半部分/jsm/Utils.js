/**
 * @description：初始化着色器
 * @param {*} gl 
 * @param {*} vsSource 
 * @param {*} fsSource 
 */
function initShaders(gl, vsSource, fsSource) {
    // 创建程序
    const program = gl.createProgram();
    // 建立着色器(顶点)
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    // 建立着色器（片元）
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);
    // 装载到程序中
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    // 链接webgl上下文
    gl.linkProgram(program);
    // 启动程序
    gl.useProgram(program);
    // 挂载程序对象
    gl.program = program;


    return true;
}
/**
 * @description:创建着色器
 * @param {*} gl 
 * @param {*} type 
 * @param {*} source 
 * @returns 
 */
function loadShader(gl, type, source) {
    // 创建着色器对象
    const shader = gl.createShader(type);
    // 装载源文件到着色器对象
    gl.shaderSource(shader, source);
    // 编译着色器对象
    gl.compileShader(shader);
    // 返回着色器对象
    return shader;
}
function getMousePosInWebgl({ clientX, clientY }, canvas) {
    //鼠标在画布中的css位置
    const { left, top, width, height } = canvas.getBoundingClientRect();
    const [cssX, cssY] = [clientX - left, clientY - top];
    //解决坐标原点位置的差异
    const [halfWidth, halfHeight] = [width / 2, height / 2];
    const [xBaseCenter, yBaseCenter] = [
        cssX - halfWidth,
        cssY - halfHeight,
    ];
    // 解决y 方向的差异
    const yBaseCenterTop = -yBaseCenter;
    //解决坐标基底的差异
    return {
        x: xBaseCenter / halfWidth,
        y: yBaseCenterTop / halfHeight
    }
}
function glToCssPos({ x, y }, { width, height }) {
    const [halfWidth, halfHeight] = [width / 2, height / 2];
    return {
        x: x * halfWidth,
        y: -y * halfHeight
    }
}
export { initShaders, getMousePosInWebgl, glToCssPos };