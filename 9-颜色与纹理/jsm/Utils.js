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
// 鼠标坐标

// 坐标转换
function glToCssPos({ x, y }, { width, height }) {
    const [halfWidth, halfHeight] = [width / 2, height / 2];
    return {
        x: x * halfWidth,
        y: -y * halfHeight
    }
}
// 正弦函数
function SinFn(a, Omega, phi) {
    return (x) => {
        return a * Math.sin(Omega * x + phi);
    }
}
// 线性比例尺
function ScaleLinear(ax, ay, bx, by) {
    const delta = {
        x: bx - ax,
        y: by - ay
    }
    const k = delta.y / delta.x;
    const b = ay - ax * k;
    return (x) => {
        return k * x + b;
    }
}
/* GetIndexInGrid 
  在由一维数组建立的栅格矩阵中，基于行列获取元素的索引位置 
*/
function GetIndexInGrid(w, size) {
    return function (x, y) {
      return (y * w + x) * size
    }
  }
export { initShaders, ScaleLinear, SinFn, glToCssPos, GetIndexInGrid };