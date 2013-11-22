// JavaScript Document
focusCardIndex = -1;

function mouseDownHandler(e){
	if (!allowMouse) return;
	
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	console.log("Down: "+mouseX+" "+mouseY);
	
	//Select a card
	if (mouseX >= 210 && mouseX <= 750 && mouseY >= 520 && mouseY <= 610) {
		focusCardIndex = Math.floor((mouseX-210)/90);
		focusCardAdjustX = mouseX-210-focusCardIndex*90;
		focusCardAdjustY = mouseY-520;
		
		dealtCards[focusCardIndex].posX = mouseX-focusCardAdjustX;
		dealtCards[focusCardIndex].posY = mouseY-focusCardAdjustY;
		dealtCards[focusCardIndex].scale = 1.1;
		
		aniFrame = 0;
		aniShow = setInterval("aniHighlightGrid()",80);
	}
}

function mouseMoveHandler(e){
	if (!allowMouse) return;
	
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	//console.log("Move: "+mouseX+" "+mouseY);
	
	if (focusCardIndex >= 0) {
		dealtCards[focusCardIndex].posX = mouseX-focusCardAdjustX;
		dealtCards[focusCardIndex].posY = mouseY-focusCardAdjustY;
	}
}

function mouseUpHandler(e){
	if (!allowMouse) return;
	
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	console.log("Up: "+mouseX+" "+mouseY);
	
	aniClear();
	if (focusCardIndex >= 0 && dealtCards[focusCardIndex].posX >= player.gridPosX-15 && dealtCards[focusCardIndex].posX <= player.gridPosX+315 && dealtCards[focusCardIndex].posY >= 155 && dealtCards[focusCardIndex].posY <= 485) {
		var posX = dealtCards[focusCardIndex].posX-player.gridPosX+15;
		var posY = dealtCards[focusCardIndex].posY-155;
		if (posX%105 <= 30 && posY%105 <= 30) {
			posX = Math.floor(posX/105);
			posY = Math.floor(posY/105);
			if (!player.grid[posY*3+posX]) {
				dealtCards[focusCardIndex].scale = 1;
				player.grid[posY*3+posX] = dealtCards[focusCardIndex];
				dealtCards[focusCardIndex] = null;
			}
		}
	}
	focusCardIndex = -1;
}

function mouseOutHandler(e){
	if (!allowMouse) return;
	
	aniClear();
	focusCardIndex = -1;
}