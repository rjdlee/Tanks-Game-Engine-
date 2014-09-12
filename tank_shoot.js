/*

Create a new bullet in the direction of the aimer

*/
Tank.prototype.bullet_shoot = function(spawn_x, spawn_y) {

  if(this.active === true && keydown[0]) {

    var date = new Date(),
    time = date.getTime();

    if(time - this.lastBullet >= this.bulletDelay) {

      this.bullets.push(
        new Particle(
          spawn_x || mouse.mousePos[2],
          spawn_y || mouse.mousePos[3],
          -mouse.getAngle(),
          8,
          6000,
          10,
          '#ffff96'
          )
        );

      this.lastBullet = time;

    }

    keydown[0] = false;

  }

};

/*

Render the array of bullets with new positions

*/
Tank.prototype.bullet_render = function() {

  var date = new Date(),
      time = date.getTime();

  for (var i = this.bullets.length - 1; i >= 0; i--) {

    var bullet = this.bullets[i];

    //Delete the bullet if it has exceeded its lifespan
    if(!bullet.checkAlive(time)) {
      this.bullets.remove(i);
      return;
    }

    if(bullet.getLived() > this.radius / 5 * 95) {
      if(bullet.checkCollision(this, 0, [this.rot.cos, this.rot.sin], 'rect')) {
        this.bullets.remove(i);
        return;
      }
    }

    bullet.checkWall();

    //calculate the particle's new position based on the seconds passed
    bullet.pos.x += bullet.vel.x;
    bullet.pos.y += bullet.vel.y;

    // Draw the particle with the new x and y
    tankBattle.ctxM.fillStyle = bullet.colour;

    tankBattle.ctxM.beginPath();
    tankBattle.ctxM.arc(bullet.pos.x, bullet.pos.y, 5, 0, circle);
    tankBattle.ctxM.fill();
  }

  date = null;

};