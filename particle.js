var Particle = function(x, y, angle, speed, life, radius, colour) {

	/* the particle's position */

	this.pos = {

		x: x || 0,
		y: y || 0

	};

	/* set specified or default values */

	this.speed = speed || 5;
	this.radius = radius || 2;

	var date = new Date();

	this.life = life || 60; //Lifespan
	this.born = date.getTime(); //Time of birth
	this.lived = 0; //Time lived

	this.colour = colour || [255, 255, 255];

	/* the particle's velocity */

	this.vel = {

		x: Math.cos(angle) * speed,
		y: -Math.sin(angle) * speed

	};

	date = null;

};

Particle.prototype.checkAlive = function(currentTime) {

	this.lived = currentTime - this.born;

	if(this.lived >= this.life)
		return false;
	else
		return true;

};

Particle.prototype.getLived = function() {

	return this.lived;

};

/*
	Check for a collision with a solid wall and boundaries
*/
Particle.prototype.checkWall = function() {

	if(this.pos.x <= 0) {

		this.vel.x = -this.vel.x;

	} else if(this.pos.x >= canvasWidth - 110) {

		this.vel.x = -this.vel.x;

	} else if(this.pos.y <= 0) {

		this.vel.y = -this.vel.y;

	} else if(this.pos.y >= canvasHeight - 110) {

		this.vel.y = -this.vel.y;

	}

};

/* 
	Roughly check for a possible collision with another particle
*/
Particle.prototype.checkNear = function(target, target_radius) {

	var max_radius = this.radius + target_radius;

	if(this.pos.x > target.pos.x - max_radius && this.pos.x < target.pos.x + max_radius && this.pos.y > target.pos.y - max_radius && this.pos.y < target.pos.y + max_radius) {
		return true;
	} else {
		return false;
	}

};

/* 
	Check for a collision or overlap 
*/
Particle.prototype.checkCollision = function(target, min_radius, angle, shape) {

	if(shape === 'circle') {

		var xy = Math.pow((this.pos.x - target.pos.x), 2) + Math.pow((this.pos.y - target.pos.y), 2);
		var hypoteneuse = Math.pow((this.radius + target.radius), 2);

		/* If the collision occurs on the edges of the balls, return 2. Otherwise return 1 if overlapping. Otherwise no collision. */
		if(xy < hypoteneuse && xy > hypoteneuse - min_radius) {
			return 2;
		} else if(xy < hypoteneuse) {
			return 1;
		} else {
			return false;
		}

	} else if(shape === 'rect') {

		var dx = angle[0] * (this.pos.x - target.pos.x),
			dy = angle[1] * (this.pos.y - target.pos.y);

		var newX = dx - dy + target.pos.x;
			newY = dy + dx + target.pos.y;

			//console.log(newX, newY, '      ', this.pos.x, this.pos.y, '      ', target.pos.x, target.pos.y);

		if(newX > target.pos.x - target.dimension.x && newX < target.pos.x + target.dimension.x &&
			newY > target.pos.y - target.dimension.y && newY < target.pos.y + target.dimension.y) {
			return true;
		} else {
			return false;
		}

	}

};

/* 
	Calculate a collision
*/
Particle.prototype.collide = function(target) {

	var object_vel_x = this.vel.x;
	var object_vel_y = this.vel.y;

	var target_vel_x = target.vel.x;
	var target_vel_y = target.vel.y;

	this.vel = {

		x: (target_vel_x * target.radius) / this.radius,
		y: (target_vel_y * target.radius) / this.radius

	};

	target.vel = {

		x: (object_vel_x * this.radius) / target.radius,
		y: (object_vel_y * this.radius) / target.radius

	};

	this.speed = Math.sqrt(Math.pow(this.vel.x, 2) + Math.pow(this.vel.y, 2));
	target.speed = Math.sqrt(Math.pow(target.vel.x, 2) + Math.pow(target.vel.y, 2));

};