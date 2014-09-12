var tankBattle = {
  width: 30,
  height: 20,
  score: 0,
  hiScore: 0,
  lives: 3
};

var canvasWidth = 0;
var canvasHeight = 0;
var tankA;


//Initialization of the canvas
function init(width, height) {
  canvasWidth = document.width;
  canvasHeight = document.height;

  var tCanvas = $("<canvas width='"+width+"' height='"+height+"' style='zIndex:0; position:absolute; left:0; top:0'></canvas>");
  tCanvas.appendTo(document.getElementById("gameDiv"));

  var mCanvas = $("<canvas width='"+width+"' height='"+height+"' name='tankA' style='zIndex:1; position:absolute; left:0; top:0'></canvas>");
  mCanvas.appendTo(document.getElementById("gameDiv"));

  tankBattle.ctxT = tCanvas.get(0).getContext("2d");
  tankBattle.ctxM = mCanvas.get(0).getContext("2d");

  tankBattle.imgTank = new Image();
  tankBattle.imgTank.src = "images/Tank.png";

  tankBattle.imgTankHead = new Image();
  tankBattle.imgTankHead.src = "images/TankHead.png";

  tankBattle.t = new Transform(tankBattle.ctxT);

  $(document).mousemove(function(e){
    mouseLocation(e.pageX, e.pageY);
  });

  window.keydown = {};

  $(document).bind("keydown", function (event) {
    keydown[event.keyCode] = true;
  });

  $(document).bind("keyup", function (event) {
    keydown[event.keyCode] = false;
  });
}