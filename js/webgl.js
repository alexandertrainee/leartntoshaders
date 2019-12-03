function initWebgl(){
    let VS;
    let FS;
    loadTextResource("../shaders/vertexShader.glsl").then(result => {
        console.log(result);
        VS = result;
        return loadTextResource("../shaders/fragmentShader.glsl");
    }).then(result => {
        console.log(result);
        FS = result;
        return StartWebgl(VS,FS);
    }).catch(error =>{
        return new Error("some error happened" + error);
    })
}
function loadTextResource(url){
    return new Promise((resolve,reject) => {
        var request = new XMLHttpRequest();
        request.open("GET" ,url, true);
        request.onload = () => {
            if (request.status >= 200 && request.status < 300){
                resolve(request.responseText);
            } else {
                reject("Error, http status" + request.status + "on resource" + url);
            }
        }
        request.send();
    })
}

function createShader(gl, type, source){
    let shader = gl.createShader(type);

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);

    if (success){
        return shader;
    }

    console.log(gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return undefined;
}

function createProgram(gl, vertexShader, fragmentShader){
    let program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.validateProgram(program);

    let success = gl.getProgramParameter(program, gl.VALIDATE_STATUS);

    if(success){
        return program;
    }

    console.log(gl.gsetProgramInfoLog(program));
    gl.deleteProgram(program);
    return undefined;
}

function StartWebgl(vertexSource, fragmentSource){

    let canvas = document.getElementById("canvas");
    let gl = canvas.getContext("webgl2");

    if(!gl){
        return new Error("webgl2 not loaded :c");
    } else {
        console.log("all is okey");
    }

    canvas.height = gl.canvas.clientHeight;
    canvas.width = gl.canvas.clientWidth;

    gl.viewport(0,0, gl.canvas.height, gl.canvas.width);

   console.log(gl);

    let vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexSource);
    let fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentSource);

    let program = createProgram(gl, vertexShader, fragmentShader);

}

document.addEventListener("DOMContentLoaded" , function(){
    initWebgl();
})

