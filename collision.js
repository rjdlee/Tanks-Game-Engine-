checkWall = function(shapes, ax, ay, v, e) {

	if(shapes === 'rect') {

		for(var i = 3; i >= 0; i--) {

			var vWall = false,
				collisionWall = false,
				dotProd;

			if(ax - v[i].x <= 5) {

				//Vector from coordinate to wall
				vWall = [v[i].x, 0];
				dotProd = e[i].x * vWall[0] + e[i].y * vWall[1];

				collisionWall = 'left';

			} else if(ax - v[i].x >= canvasWidth - 105) {

				vWall = [v[i].x, 0];
				dotProd = e[i].x * vWall[0] + e[i].y * vWall[1];

				collisionWall = 'right';

			} else if(ay - v[i].y  <= 5) {

				vWall = [0, e[i].y];
				dotProd = e[i].x * vWall[0] + e[i].y * vWall[1];

				collisionWall = 'top';

			} else if(ay - v[i].y >= canvasHeight - 105) {

				vWall = [0, e[i].y];
				dotProd = e[i].x * vWall[0] + e[i].y * vWall[1];

				collisionWall = 'bottom';

			}

			if(collisionWall)
				return [collisionWall, dotProd];

		}

		return false;

	} else if(shapes === 'circle') {

		if(ax <= 0 || ax >= canvasWidth - 500) {

			return 'x';

		} else if(ay <= 0 || ay >= canvasHeight - 110) {

			return 'y';

		}

	}

};

checkNear = function(shapes, ax, ay, aRad, bx, by, bRad) {

	var max_radius = this.radius + target_radius;

	if(this.pos.x > target.pos.x - max_radius && this.pos.x < target.pos.x + max_radius && this.pos.y > target.pos.y - max_radius && this.pos.y < target.pos.y + max_radius) {
		return true;
	} else {
		return false;
	}

};

checkCollision = function(shapes, ax, ay, aAngle, bx, by, bAngle) {

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