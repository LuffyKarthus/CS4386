// JavaScript Document
focusCardIndex = -1;
isStealing = false;

function mouseDownHandler(e){
	if (!player.move || isStealing) return;
	
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	//console.log("Down: "+mouseX+" "+mouseY);
	
	//Select a card
	if (mouseX >= 210 && mouseX <= 750 && mouseY >= 520 && mouseY <= 610) {
		focusCardIndex = Math.floor((mouseX-210)/90);
		focusCardAdjustX = mouseX-210-focusCardIndex*90;
		focusCardAdjustY = mouseY-520;
		
		dealtCards[focusCardIndex].posX = mouseX-focusCardAdjustX;
		dealtCards[focusCardIndex].posY = mouseY-focusCardAdjustY;
		dealtCards[focusCardIndex].scale = 1.1;
		
		aniClear();
		//Poker or clown
		if (dealtCards[focusCardIndex].suit != SPECIAL_SUIT || dealtCards[focusCardIndex].suit == SPECIAL_SUIT && dealtCards[focusCardIndex].rank == CLOWN_RANK)
			aniShow = setInterval("aniHighlightGrid([player.getGridStatus(false),null])",80);
		//Thief
		if (dealtCards[focusCardIndex].suit == SPECIAL_SUIT && dealtCards[focusCardIndex].rank == THIEF_RANK)
			aniShow = setInterval("aniHighlightGrid([null,ai.getGridStatus(true)])",80);
		//Torch
		if (dealtCards[focusCardIndex].suit == SPECIAL_SUIT && dealtCards[focusCardIndex].rank == TORCH_RANK)
			aniShow = setInterval("aniHighlightGrid([player.getGridStatus(true),ai.getGridStatus(true)])",80);
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
	} else {
		if (mouseX >= player.gridPosX-2 && mouseX <= player.gridPosX+298 && mouseY >= 135 && mouseY <= 165 && (mouseX-player.gridPosX)%38 >= 2) {
			var index = Math.floor((mouseX-player.gridPosX)/38);
			if (player.hands[index] && aniHighlightHandInFoucusIndex != index) {
				aniClear();
				aniHighlightHandPos = player.hands[index].matchPos;
				aniHighlightHandInFoucus = true;
				aniHighlightHandInFoucusIndex = index;
				aniShow = setInterval("aniHighlightHand(player.gridPosX,aniHighlightHandPos)",20);	
			}
		} else if (mouseX >= ai.gridPosX-8 && mouseX <= ai.gridPosX+308 && mouseY >= 125 && mouseY <= 175 && (mouseX-ai.gridPosX)%38 >= 2) {
			var index = Math.floor((mouseX-ai.gridPosX)/38);
			if (ai.hands[index] && aniHighlightHandInFoucusIndex != index) {
				aniClear();
				aniHighlightHandPos = ai.hands[index].matchPos;
				aniHighlightHandInFoucus = true;
				aniHighlightHandInFoucusIndex = index;
				aniShow = setInterval("aniHighlightHand(ai.gridPosX,aniHighlightHandPos)",20);	
			}
		} else {
			aniHighlightHandInFoucus = false;
			aniHighlightHandInFoucusIndex = -1;
		}
	}
}

function mouseUpHandler(e){
	if (!player.move) return;
	
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	//console.log("Up: "+mouseX+" "+mouseY);
	
	//Drop on player's grid
	if (focusCardIndex >= 0 && mouseX >= player.gridPosX && mouseX <= player.gridPosX+300 && mouseY >= 170 && mouseY <= 470)
		if ((mouseX-player.gridPosX)%105 <= 90 && (mouseY-170)%105 <= 90) {
			var posX = Math.floor((mouseX-player.gridPosX)/105);
			var posY = Math.floor((mouseY-170)/105);
			if (dealtCards[focusCardIndex].suit != SPECIAL_SUIT || dealtCards[focusCardIndex].rank != THIEF_RANK)
				if (player.updateGrid(posY*3+posX,dealtCards[focusCardIndex])) {
					dealtCards[focusCardIndex] = null;
					isStealing = false;
					
					player.move = false;
				}
		}
	
	//Drop on AI's grid
	if (focusCardIndex >= 0 && mouseX >= ai.gridPosX && mouseX <= ai.gridPosX+300 && mouseY >= 170 && mouseY <= 470)
		if ((mouseX-ai.gridPosX)%105 <= 90 && (mouseY-170)%105 <= 90) {
			var posX = Math.floor((mouseX-ai.gridPosX)/105);
			var posY = Math.floor((mouseY-170)/105);
			
			if (dealtCards[focusCardIndex].suit == SPECIAL_SUIT && dealtCards[focusCardIndex].rank == THIEF_RANK) {
				stoleCard = ai.updateGrid(posY*3+posX,dealtCards[focusCardIndex]);
				if (stoleCard) {
					aniClear();
					aniShow = setInterval("aniHighlightGrid([player.getGridStatus(false),null])",80);
					
					dealtCards[focusCardIndex] = stoleCard;
					ai.updateHands();
					
					isStealing = true;
					
					return;
				}
			}
			
			if (dealtCards[focusCardIndex].suit == SPECIAL_SUIT && dealtCards[focusCardIndex].rank == TORCH_RANK)
				if (ai.updateGrid(posY*3+posX,dealtCards[focusCardIndex])) {
					dealtCards[focusCardIndex] = null;
					
					player.move = false;
				}
		}
	
	if (!isStealing) {
		aniClear();
		focusCardIndex = -1;
	}
}

function mouseOutHandler(e){
	if (!player.move || isStealing) return;
	
	aniClear();
	focusCardIndex = -1;
}