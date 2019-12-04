attribute vec2 vertexPosition;


varying vec3 fragColor;

void main(){
    gl_PointSize = 10.0;
    fragColor = vec3(vertexPosition, 0);
    gl_Position = vec4(vertexPosition, 0, 1);
}