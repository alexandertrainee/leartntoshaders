var initWebgl = function(){
    var vertexShader;
    var fragmentShader;
    loadTextResource("../shaders/vertexShader.glsl").then(function(result){
        vertexShader = result;
        return loadTextResource("../shaders/fragmentShader.glsl");
    }).then(function(result){
        fragmentShader = result;
        return StartWebgl(vertexShader,fragmentShader);
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


var StartWebgl = function(a,b){
    alert("all is okey")
}
initWebgl();
