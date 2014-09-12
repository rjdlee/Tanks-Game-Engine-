function update() {

	tankBattle.ctxM.clearRect(0, 0, canvasWidth, canvasHeight);
	mouse.mouseLocation(mouseCoords[0], mouseCoords[1]);

	for(var i = tanks.length - 1; i >= 0; i--) {

		tanks[i].transform();
		if(tanks[i].checkActive) {
			tanks[i].bullet_shoot();
			tanks[i].bullet_render();
		}
	}
}