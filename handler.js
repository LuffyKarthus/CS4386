// JavaScript Document
focusCardIndex = -1;

function mouseDownHandler(e){
	if (!player.move) return;
	
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
		//Poker
		if (dealtCards[focusCardIndex].suit <= 3) aniShow = setInterval("aniHighlightGrid([player.getGridStatus(false),null])",80);
		
		//Torch
		if (dealtCards[focusCardIndex].suit == 4 && dealtCards[focusCardIndex].rank == 2) aniShow = setInterval("aniHighlightGrid([player.getGridStatus(true),ai.getGridStatus(true)])",80);
	}
}

function mouseMoveHandler(e){
	if (!player.move) return;
	
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	//console.log("Move: "+mouseX+" "+mouseY);
	
	if (focusCardIndex >= 0) {
		dealtCards[focusCardIndex].posX = mouseX-focusCardAdjustX;
		dealtCards[focusCardIndex].posY = mouseY-focusCardAdjustY;
	}
}

function mouseUpHandler(e){
	if (!player.move) return;
	
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	console.log("Up: "+mouseX+" "+mouseY);
	
	aniClear();
	if (focusCardIndex >= 0 && mouseX >= player.gridPosX && mouseX <= player.gridPosX+300 && mouseY >= 170 && mouseY <= 470) {
		if ((mouseX-player.gridPosX)%105 <= 90 && (mouseY-170)%105 <= 90) {
			var posX = Math.floor((mouseX-player.gridPosX)/105);
			var posY = Math.floor((mouseY-170)/105);
			if (player.updateGrid(posY*3+posX,dealtCards[focusCardIndex])) dealtCards[focusCardIndex] = null;
		}
	}
	focusCardIndex = -1;
}

function mouseOutHandler(e){
	if (!player.move) return;
	
	aniClear();
	focusCardIndex = -1;
}