var tankBattle = {},
    canvasWidth = window.innerWidth,
    canvasHeight = window.innerHeight,
    circle = Math.PI * 2,
    tanks = [],
    mouse = new Mouse(),
    mouseCoords = [],
    keydown = [];

//Initialization of the canvas
function init() {

  var tCanvas = document.getElementById('tCanvas'),
      mCanvas = document.getElementById('mCanvas');

  tCanvas.width = canvasWidth - 100;
  tCanvas.height = canvasHeight - 100;
  mCanvas.width = canvasWidth - 100;
  mCanvas.height = canvasHeight - 100;

  tankBattle.ctx = tCanvas.getContext("2d");
  tankBattle.ctxM = mCanvas.getContext("2d");

  // Initialize tank image sprites
  tankBattle.imgTank = new Image();
  tankBattle.imgTank.src = "images/Tank.png";
  tankBattle.imgTankHead = new Image();
  tankBattle.imgTankHead.src = "images/TankHead.png";

  //Set the new tank's position
  tankBattle.t = new Transform(tankBattle.ctx);
  tanks.push(new Tank(true, canvasWidth / 2, canvasHeight / 2));
  //tanks.push(new Tank(false, 0, 0));

  createListeners();

}

/*

Start game listeners

*/
function createListeners() {

  //Left click for firing
  document.onmousedown = function() {
    keydown[0] = true;
  };

  //Track mouse position
  document.onmousemove = function(e) {
    mouseCoords = [e.pageX, e.pageY];
  };

  document.onkeydown = function(e) {
    keydown[e.keyCode] = true;
  };

  document.onkeyup = function(e) {
    keydown[e.keyCode] = false;
  };

}

setTimeout(function(){

  init();

 // The following function is courtesy of Opera Engineer Erik Mіller -- see
 // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

  var lastTime = 0,
    vendors = ['moz', 'webkit'];

  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {

    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelRequestAnimationFrame = window[vendors[x]+'CancelRequestAnimationFrame'];

  }

  if (!window.requestAnimationFrame) {

    var f = function(callback, element) {

      var currTime = new Date().getTime(),
      timeToCall = Math.max(0, 16 - (currTime - lastTime)),
      id = window.setTimeout(function() {

        callback(currTime + timeToCall);

      }, timeToCall);

      lastTime = currTime + timeToCall;

      return id;

    };

    window.requestAnimationFrame = f;

  }

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id)
  {
    clearTimeout(id);
  };

 (function gameloop()
 {

  requestAnimationFrame(gameloop);
  update();

 })();
},300);