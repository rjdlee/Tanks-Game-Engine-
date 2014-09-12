var Mouse = function() {

    //Format of this.mousePos: currentMouseX, currentMouseY, previousTankX, previousTankY, previousMouseX, previousMouseY
    this.mousePos = [0, 0, 0, 0, 0, 0];

    this.aimerAngle = 0;

    //Keep track of all active this.bullets
    this.bullets = [];

};

Mouse.prototype.mouseLocation = function(mouseX, mouseY) {

  //tankBattle.ctxM.clearRect(this.mousePos[0] - 5, this.mousePos[1] - 5, 10, 10);

  tankBattle.ctxM.beginPath();
  tankBattle.ctxM.arc(mouseX, mouseY, 5, 0, Math.PI * 2, false);
  tankBattle.ctxM.fill();

  this.mousePos[0] = mouseX;
  this.mousePos[1] = mouseY;

};

Mouse.prototype.aim = function(tankX, tankY) {

  //Draw aimer line.
  var pX;
  var pY;

  if(this.mousePos[4] - this.mousePos[2] >= 0){
    pX = 5;
  } else {
    pX = -5;
  }

  if(this.mousePos[5] - this.mousePos[3] >= 0){
    pY = 5;
  } else {
    pY = -5;
  }

  /*if(this.mousePos[4] - this.mousePos[2] > -2 && this.mousePos[4] - this.mousePos[2] < 2){
    tankBattle.ctxM.clearRect(this.mousePos[2] + pX, this.mousePos[3] + pX, this.mousePos[4] - this.mousePos[2] - pX, this.mousePos[5] - this.mousePos[3] - pX);
  } else {
    tankBattle.ctxM.clearRect(this.mousePos[2] - pX, this.mousePos[3] - pY, this.mousePos[4] - this.mousePos[2] + pX, this.mousePos[5] - this.mousePos[3] + pY);
  }

  tankBattle.ctxM.clearRect(0, 0, canvasWidth, canvasHeight);*/

  //Draw a line from the tank to the cursor.
  tankBattle.ctxM.beginPath();
  tankBattle.ctxM.moveTo(tankX, tankY);
  tankBattle.ctxM.lineTo(this.mousePos[0], this.mousePos[1]);
  tankBattle.ctxM.stroke();

  this.mousePos[2] = tankX;
  this.mousePos[3] = tankY;
  this.mousePos[4] = this.mousePos[0];
  this.mousePos[5] = this.mousePos[1];

  //Calculating aimer rotation.
  var deltaX = this.mousePos[0] - tankX;
  var deltaY = this.mousePos[1] - tankY;

  this.aimerAngle = Math.atan2(deltaY, deltaX);

  return aimerAngle;

};

Mouse.prototype.bullet_shoot = function(spawn_x, spawn_y) {

    this.bullets.push(
        new Particle(
          spawn_x,
          spawn_y,
          -this.aimerAngle,
          5,
          60,
          10,
          '#000'
          )
        );

};

Mouse.prototype.bullet_render = function() {

  for (var i = this.bullets.length - 1; i > 0; i--) {

    var bullet = this.bullets[i];

    bullet.checkWall();

    /* calculate the particle's new position based on the seconds passed */
    bullet.pos.x += bullet.vel.x;
    bullet.pos.y += bullet.vel.y;

    /* draw the particle */
    tankBattle.ctxM.fillStyle = '#000';

    var x = bullet.pos.x;
    var y = bullet.pos.y;

    tankBattle.ctxM.beginPath();
    tankBattle.ctxM.arc(x, y, 5, 0, Math.PI * 2);
    tankBattle.ctxM.fill();
  }

};