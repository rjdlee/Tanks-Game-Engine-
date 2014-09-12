var Mouse = function() {

    //Format of this.mousePos: currentMouseX, currentMouseY, previousTankX, previousTankY, previousMouseX, previousMouseY
    this.mousePos = [0, 0, 0, 0, 0, 0];

    this.aimerLine = true;
    this.aimerAngle = 0;

};

Mouse.prototype.getAngle = function() {

  return this.aimerAngle;

};

Mouse.prototype.mouseLocation = function(mouseX, mouseY) {

  var x = mouseX !== undefined ? mouseX : this.mousePos[0],
      y = mouseY !== undefined ? mouseY : this.mousePos[1];

  tankBattle.ctxM.fillStyle = '#F6F6F6';

  tankBattle.ctxM.beginPath();
  tankBattle.ctxM.arc(mouseX, mouseY, 5, 0, circle, false);
  tankBattle.ctxM.fill();

  this.mousePos[0] = mouseX;
  this.mousePos[1] = mouseY;

};

/*

Draw a line from tank to cursor and calculate angle from tank to cursor

*/
Mouse.prototype.aim = function(tankX, tankY) {

  //Calculating aimer rotation.
  var deltaX = this.mousePos[0] - tankX,
      deltaY = this.mousePos[1] - tankY;

  if(this.aimerLine) {

    //Draw aimer line.
    var pX,
        pY;

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

    tankBattle.ctxM.setLineDash([1, ((Math.abs(deltaX) + Math.abs(deltaY)) / 10)]);
    tankBattle.ctxM.lineWidth = 5;
    tankBattle.ctxM.lineCap = 'round';

    //Draw a line from the tank to the cursor.
    tankBattle.ctxM.beginPath();
    tankBattle.ctxM.moveTo(tankX, tankY);
    tankBattle.ctxM.lineTo(this.mousePos[0], this.mousePos[1]);
    tankBattle.ctxM.stroke();

    this.mousePos[4] = this.mousePos[0];
    this.mousePos[5] = this.mousePos[1];

  }

  //Not sure why
  this.mousePos[2] = tankX;
  this.mousePos[3] = tankY;

  this.aimerAngle = Math.atan2(deltaY, deltaX);

  return this.aimerAngle;


};