/*

Rotate the tank's canvas around a center point

*/
Tank.prototype.rotCentre = function(centreX, centreY, angle) {

  tankBattle.ctx.globalCompositeOperation = 'destination-over';

  tankBattle.t.translate(centreX, centreY);
  tankBattle.t.rotate(angle);
  tankBattle.t.translate(-(centreX), -centreY);

  tankBattle.t.setTransform();

};

/*

Specify exact position of tank

*/
Tank.prototype.setPosition = function(posX, posY) {

  tankBattle.t.translate(posX, posY);
  tankBattle.ctx.globalCompositeOperation = 'source-over';
  tankBattle.t.save();

  this.transform(true);

};

/*

Transform the position of the tank and redraw, inclues rotation and translation.

*/
Tank.prototype.transform = function(positioned) {

  tankBattle.ctx.clearRect(-45, -45, 150, 150);

  this.setTrig();

  var tMatrix = tankBattle.t.getMatrix(),
    headAngle = -this.rot.angle + mouse.aim(tMatrix[4], tMatrix[5]),
    activeListeners = this.checkListeners(),
    v = this.getVertices(),
    e = this.getEdges(v);

  //If this tank is player controlled and hasn't been positioned, rotate and translate
  if(this.active && !positioned) {
    this.rotate(activeListeners[0]);
    this.translate(activeListeners[1], activeListeners[2]);
  }

  tankBattle.t.save();
  //Rotate and draw the head of the tank.
  this.rotCentre(8, 8, headAngle);
  tankBattle.ctx.drawImage(tankBattle.imgTankHead, 0, 0);

  //Restore the body state and draw it.
  tankBattle.t.restore();
  tankBattle.ctx.drawImage(tankBattle.imgTank, -35, -17.3);

  this.pos = {

    x: tankBattle.t.getMatrix()[4],
    y: tankBattle.t.getMatrix()[5]

  };

};

/*

Rotating the position of the tank. Parameter values: left, right

*/
Tank.prototype.rotate = function(directions) {

  if(directions[0] === undefined)
    return false;

  var rotSpeeds = this.rot.trigSpeed.slice(2, 4),
      rotMax = 6.2,
      rotDir = this.rot.speed;

  //Change sign of variables if clockwise/ left
  if(directions === 'left') {
    rotSpeeds = this.rot.trigSpeed.slice(0, 2);
    rotMax = -6.2;
    rotDir *= -1;
  }

  this.rotCentre(-1, 6, rotSpeeds); //Rotate at the speed of this.rot.speed

  if(this.rot.angle <= rotMax) //Reset the rotation angle if greater than a revolution, otherwise decrease by rot speed
    this.rot.angle = rotMax;
  else
    this.rot.angle += rotDir;

};

/* 

Translate the position of the tank if up or down keys are pressed.

*/
Tank.prototype.translate = function(directions) {

  var v  = this.getVertices(),
      e = this.getEdges(),
      deltaX = -3,
      deltaY = 0,
      isWall = checkWall('rect', this.pos.x - deltaX, this.pos.y - deltaY, v, e);

  if(isWall) {

    var absAngle = this.rot.angle < 0 ? 2 * Math.PI + this.rot.angle : this.rot.angle,
        adjustedSin = Math.sin((this.rot.angle + 90) / 180 * Math.PI),  //+ Math.PI / 2
        adjustedCos = Math.cos((this.rot.angle + 270) / 180 * Math.PI ); //+ 3 * Math.PI / 2

    if(isWall[0] === 'left' && (absAngle > Math.PI / 2 && absAngle < Math.PI / 2 * 3 && directions === 'up') ||
        isWall[0] === 'right' && ((absAngle < Math.PI / 2 || absAngle > Math.PI / 2 * 3) && directions === 'up') ||
        isWall[0] === 'top' && (absAngle > Math.PI && directions === 'up') ||
        isWall[0] === 'bottom' && (absAngle < Math.PI && directions === 'up')) {

          deltaX = adjustedSin * -3;
          deltaY = adjustedCos * -3;

      } else if(isWall[0] === 'left' && ((absAngle < Math.PI / 2 || absAngle > Math.PI / 2 * 3) && directions === 'down') ||
        isWall[0] === 'right' && (absAngle > Math.PI / 2 && absAngle < Math.PI / 2 * 3 && directions === 'down') ||
        isWall[0] === 'top' && (absAngle < Math.PI && directions === 'down') ||
        isWall[0] === 'bottom' && (absAngle > Math.PI && directions === 'down')) {

          deltaX = adjustedSin * 3;
          deltaY = adjustedCos * 3;

      } else {
        return false;
      }

    /*if(isWall[0] === 'left') {
      if(absAngle > Math.PI / 2 && absAngle < Math.PI / 2 * 3 && directions === 'up') {
          deltaX = adjustedSin * -3;
          deltaY = adjustedCos * -3;
      } else if((absAngle < Math.PI / 2 || absAngle > Math.PI / 2 * 3) && directions === 'down') {
          deltaX = adjustedSin * 3;
          deltaY = adjustedCos * 3;
      } else return false;
    } else if(isWall[0] === 'right') {
      if((absAngle < Math.PI / 2 || absAngle > Math.PI / 2 * 3) && directions === 'up') {
          deltaX = adjustedSin * -3;
          deltaY = adjustedCos * -3;
      } else if(absAngle > Math.PI / 2 && absAngle < Math.PI / 2 * 3 && directions === 'down') {
          deltaX = adjustedSin * 3;
          deltaY = adjustedCos * 3;
      } else return false;
    } else if(isWall[0] === 'top') {
      if(absAngle > Math.PI && directions === 'up') {
          deltaX = adjustedSin * -3;
          deltaY = adjustedCos * -3;
      } else if(absAngle < Math.PI && directions === 'down') {
          deltaX = adjustedSin * 3;
          deltaY = adjustedCos * 3;
      } else return false;
    } else if(isWall[0] === 'bottom') {
      if(absAngle < Math.PI && directions === 'up') {
          deltaX = adjustedSin * -3;
          deltaY = adjustedCos * -3;
      } else if(absAngle > Math.PI && directions === 'down') {
          deltaX = adjustedSin * 3;
          deltaY = adjustedCos * 3;
      } else return false;
    }*/
  }

  //console.log(deltaX, deltaY, adjustedSin, adjustedCos, absAngle, multiplier);

  if (directions === 'up') {

    tankBattle.ctx.globalCompositeOperation = 'source-over';
    tankBattle.t.translate(deltaX, deltaY);

    //this.pos.x -= deltaX;
    //this.pos.y -= deltaY;

  } else if (directions === 'down') {

    if(deltaX === -3)
      deltaX = 3;

    tankBattle.ctx.globalCompositeOperation = 'source-over';
    tankBattle.t.translate(deltaX, deltaY);

    //this.pos.x += deltaX;
    //this.pos.y += deltaY;

  } else {

    tankBattle.ctx.globalCompositeOperation = 'destination-over';
    return;

  }

};