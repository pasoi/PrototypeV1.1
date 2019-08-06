var socket;
var canvas;
var mouseX, mouseY, mouseDown = 0,
  lastX, lastY

// window.onload=function(){
//    }

function setup(){
    var v = document.getElementById('video');
    v.addEventListener( "loadedmetadata", function (e) {
        var width = this.videoWidth,
            height = this.videoHeight;
            socket = io.connect('http://localhost:3000');
            socket.on('mouse', newDrawing);
            //canvas = createCanvas(width,height);
            //canvas.position(0,0);
            //background(255,0,255,0);
            canvas = document.getElementById('sketchpad')
            //canvas.position(0,0);
            ctx = canvas.getContext('2d')
            canvas.addEventListener('mousedown', onMouseDown, false)
            canvas.addEventListener('mousemove', onMouseMove, false)
            window.addEventListener('mouseup', onMouseUp, false)
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

function clearSketch(){
    clear();
}


// - - - - - - - - - - - - - - - - - - - - - - - - - - -

function draw(ctx,x,y) {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.fillStyle = "#FF0000";
  ctx.moveTo(lastX,lastY);
  ctx.lineTo(x,y);
  ctx.closePath();
  ctx.stroke();
}

function clearCanvas(canvas,ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function onMouseDown(e) {
  var xy = getMousePos(e);
  lastX = xy.mouseX;
  lastY = xy.mouseY;
  mouseDown = 1;
}

function onMouseUp() {
  mouseDown = 0
}

function onMouseMove(e) {
  if (mouseDown == 1) {
      var xy = getMousePos(e);
      draw(ctx, xy.mouseX, xy.mouseY);
      lastX = xy.mouseX, lastY = xy.mouseY;
  }
}

function getMousePos(e) {
    var o = {};
  if (!e)
      var e = event
  if (e.offsetX) {
      o.mouseX = e.offsetX
      o.mouseY = e.offsetY
  }
  else if (e.layerX) {
      o.mouseX = e.layerX
      o.mouseY = e.layerY
  }
  return o;
 }
