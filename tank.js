/* 

  Tank class 
  Note: tank head is 54 x 16 pixels.

  */

function Tank(active, x, y, angle) {

  this.active = active || false;               // Player if true, otherwise AI
  this.colour = [255, 255, 255];               // Not used

  this.lastBullet = 0;                        //Time of last bullet
  this.bulletDelay = 500;                     //Cooldown
  this.bullets = [];                          //All bullets from this tank
  this.speed = 0;                             //Bullet speed

  this.boundingBox = false;                   //Bounding box for tank

  //Current position of tank
  this.pos = {

    x: x || 0,
    y: y || 0

  };

  //Dimensions of tank divided in half
  this.dimension = {

    x: 35,
    y: 30

  };

  this.rot = {

    speed: Math.PI / 64,
    trigSpeed: [],
    bodyAngle: Math.PI / 135,
    angle: 0,
    sin: 0,
    cos: 0

  };

  this.radius = Math.sqrt(this.dimension.x * this.dimension.x + this.dimension.y * this.dimension.y);
  this.rot.trigSpeed = [Math.cos(-this.rot.speed), Math.sin(-this.rot.speed), Math.cos(this.rot.speed), Math.sin(this.rot.speed)];

  this.setPosition(this.pos.x, this.pos.y);

}

// Array Remove - By John Resig (MIT Licensed)
Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};

Tank.prototype.setTrig = function() {

  var rad = this.rot.angle / 180 * Math.PI;

  this.rot.sin = Math.sin(rad);
  this.rot.cos = Math.cos(rad);

};

Tank.prototype.getVertices = function() {

var h1 = this.rot.cos * this.dimension.x,
    h2 = this.rot.sin * this.dimension.x,
    h3 = this.rot.cos * this.dimension.y,
    h4 = this.rot.sin * this.dimension.y;

    v = [

    {
        x: h1 - h4,
        y: h2 + h3
    },

    {
        x: h1 + h4,
        y: h2 - h3
    },

    {
        x: -h1 + h4,
        y: -h2 - h3
    },

    {
        x: -h1 - h4,
        y: -h2 + h3
    }

    ];

  if(this.boundingBox) {

    tankBattle.ctx.beginPath();
    tankBattle.ctx.moveTo(v[0].x, v[0].y);
    tankBattle.ctx.lineTo(v[1].x, v[1].y);
    tankBattle.ctx.lineTo(v[2].x, v[2].y);
    tankBattle.ctx.lineTo(v[3].x, v[3].y);
    tankBattle.ctx.lineTo(v[0].x, v[0].y);

    tankBattle.ctx.lineWidth = 1;
    tankBattle.ctx.strokeStyle = 'blue';
    tankBattle.ctx.stroke();

  }

  return v;

};

/* 

Find edges of Tank              A   B  
Sides are AB, BC, CD, and DA;   D   C

*/
Tank.prototype.getEdges = function() {

  var v = this.getVertices(),

  e = [

    {
      x: v[1].x - v[0].x,
      y: v[1].y - v[0].y
    },

    {
      x: v[2].x - v[1].x,
      y: v[2].y - v[1].y
    },

    {
      x: v[3].x - v[2].x,
      y: v[3].y - v[2].y
    },

    {
      x: v[0].x - v[3].x,
      y: v[0].y - v[3].y
    }

  ];

  return e;

};

Tank.prototype.checkActive = function() {

  return this.active;

};

/*

Check key presses

*/
Tank.prototype.checkListeners = function() {

  var commands = [];

  if (keydown[37] || keydown[65])          //Left
    commands.push('left');
  else if (keydown[39] || keydown[68])     //Right
    commands.push('right');
  else
    commands.push(0);

  if (keydown[38] || keydown[87])          //Up
    commands.push('up');
  else if (keydown[40] || keydown[83])     //Down
    commands.push('down');
  else
    commands.push(0);

  return commands;

};