// JavaScript Document
focusCardIndex = -1;
isStealing = false;

function mouseDownHandler(e){
	if (!player.move || isStealing) return;
	
	player.mouseX = e.offsetX;
	player.mouseY = e.offsetY;
	//console.log("Down: "+player.mouseX+" "+player.mouseY);
	
	//Select a card
	if (player.mouseX >= 210 && player.mouseX <= 750 && player.mouseY >= 520 && player.mouseY <= 610) {
		focusCardIndex = Math.floor((player.mouseX-210)/90);
		focusCardAdjustX = player.mouseX-210-focusCardIndex*90;
		focusCardAdjustY = player.mouseY-520;
		
		dealtCards[focusCardIndex].posX = player.mouseX-focusCardAdjustX;
		dealtCards[focusCardIndex].posY = player.mouseY-focusCardAdjustY;
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
	
	player.mouseX = e.offsetX;
	player.mouseY = e.offsetY;
	//console.log("Move: "+player.mouseX+" "+player.mouseY);
	
	if (focusCardIndex >= 0) {
		dealtCards[focusCardIndex].posX = player.mouseX-focusCardAdjustX;
		dealtCards[focusCardIndex].posY = player.mouseY-focusCardAdjustY;
	} else {
		if (player.mouseX >= player.gridPosX-2 && player.mouseX <= player.gridPosX+298 && player.mouseY >= 135 && player.mouseY <= 165 && (player.mouseX-player.gridPosX)%38 >= 2) {
			var index = Math.floor((player.mouseX-player.gridPosX)/38);
			if (player.hands[index] && aniHighlightHandInFoucusIndex != index) {
				aniClear();
				aniHighlightHandPos = player.hands[index].matchPos;
				aniHighlightHandInFoucus = true;
				aniHighlightHandInFoucusIndex = index;
				aniShow = setInterval("aniHighlightHand(player.gridPosX,aniHighlightHandPos)",20);
			}
		} else if (player.mouseX >= ai.gridPosX-8 && player.mouseX <= ai.gridPosX+308 && player.mouseY >= 125 && player.mouseY <= 175 && (player.mouseX-ai.gridPosX)%38 >= 2) {
			var index = Math.floor((player.mouseX-ai.gridPosX)/38);
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
	
	player.mouseX = e.offsetX;
	player.mouseY = e.offsetY;
	//console.log("Up: "+player.mouseX+" "+player.mouseY);
	
	//Drop on player's grid
	if (focusCardIndex >= 0 && player.mouseX >= player.gridPosX && player.mouseX <= player.gridPosX+300 && player.mouseY >= 170 && player.mouseY <= 470)
		if ((player.mouseX-player.gridPosX)%105 <= 90 && (player.mouseY-170)%105 <= 90) {
			var posX = Math.floor((player.mouseX-player.gridPosX)/105);
			var posY = Math.floor((player.mouseY-170)/105);
			if (dealtCards[focusCardIndex].suit != SPECIAL_SUIT || dealtCards[focusCardIndex].rank != THIEF_RANK)
				if (player.updateGrid(posY*3+posX,dealtCards[focusCardIndex])) {
					var effectPos = posY*3+posX;
					aniClear();
					aniShow = setInterval("aniDropCardEffect(player.gridPosX,"+effectPos+")",20);
					
					dealtCards[focusCardIndex] = null;
					isStealing = false;
					player.move = false;
				}
		}
	
	//Drop on AI's grid
	if (focusCardIndex >= 0 && player.mouseX >= ai.gridPosX && player.mouseX <= ai.gridPosX+300 && player.mouseY >= 170 && player.mouseY <= 470)
		if ((player.mouseX-ai.gridPosX)%105 <= 90 && (player.mouseY-170)%105 <= 90) {
			var posX = Math.floor((player.mouseX-ai.gridPosX)/105);
			var posY = Math.floor((player.mouseY-170)/105);
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
					var effectPos = posY*3+posX;
					aniClear();
					aniShow = setInterval("aniDropCardEffect(ai.gridPosX,"+effectPos+")",20);
					
					dealtCards[focusCardIndex] = null;
					player.move = false;
				}
		}
	
	if (!isStealing) {
		focusCardIndex = -1;
	}
}

function mouseOutHandler(e){
	if (!player.move || isStealing) return;
	
	aniClear();
	focusCardIndex = -1;
}