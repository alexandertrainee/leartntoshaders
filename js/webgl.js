var initWebgl = function(){
    var VS;
    var FS;
    loadTextResource("../shaders/vertexShader.glsl").then(function(result){
        VS = result;
        return loadTextResource("../shaders/fragmentShader.glsl");
    }).then(function(result){
        FS = result;
        return StartWebgl(VS,FS);
    }).catch(function(error){
        alert("some error happened");
        console.error(error);
    })
}
var loadTextResource = function(url){
    return new Promise(function(resolve,reject){
        var request = new XMLHttpRequest();
        request.open("GET" ,url, true);
        request.onload = function(){
            if (request.status >= 200 && request.status < 300){
                resolve(request.responseText);
            } else {
                reject("Error, http status" + request.status + "on resource" + url);
            }
        }
        request.send();
    })
}


var StartWebgl = function(vertexShader, fragmentShader){
    alert("all is okey")
}

document.addEventListener("DOMContentLoaded" , function(){
    initWebgl();
})

