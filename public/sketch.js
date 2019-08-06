var socket;
var canvas;

// window.onload=function(){
//    }
  
function setup(){
    var v = document.getElementById('video');
    v.addEventListener( "loadedmetadata", function (e) {
        var width = this.videoWidth,
            height = this.videoHeight;
            socket = io.connect('http://localhost:3000');
            socket.on('mouse', newDrawing);
            canvas = createCanvas(width,height);
            canvas.position(0,0);
            background(255,0,255,0);
    }, false );  
   
    


}

function newDrawing(data){
    noStroke();
    fill(255,0,100);
    ellipse(data.x, data.y, 10, 10);
}

function mouseDragged(){
    console.log('Sending: ' + mouseX + ',' + mouseY);

    var data = {
        x: mouseX,
        y: mouseY
    }
socket.emit('mouse', data);

    noStroke();
    fill(255,255, 125);
    ellipse(mouseX, mouseY, 10, 10);
   
    
}

function draw(){
}

function clearSketch(){
    clear();
}