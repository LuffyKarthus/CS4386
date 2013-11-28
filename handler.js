// JavaScript Document
focusDifficultyIndex = -1;

focusCardIndex = -1;
isStealing = false;

function welcomeMouseDownHandler(e){
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	//console.log("Down: "+mouseX+" "+mouseY);
	
	if (gameDifficulty == -1 && mouseX >= 180 && mouseX <= 780 && mouseY >= 280 && mouseY <= 480) {
		gameDifficulty = Math.floor((mouseY-280)/100)*2+Math.floor((mouseX-180)/300);
		playSound(PICK_CARD);
	}
}

function welcomeMouseMoveHandler(e){
	var mouseX = e.offsetX;
	var mouseY = e.offsetY;
	//console.log("Down: "+mouseX+" "+mouseY);
	
	if (gameDifficulty == -1 && mouseX >= 180 && mouseX <= 780 && mouseY >= 280 && mouseY <= 480)
		focusDifficultyIndex = Math.floor((mouseY-280)/100)*2+Math.floor((mouseX-180)/300);
	else focusDifficultyIndex = -1;
}

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
			
		playSound(PICK_CARD);
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
				aniHighlightHandInFoucus = true;
				aniHighlightHandInFoucusIndex = index;
				aniShow = setInterval(function(){aniHighlightHand(player.gridPosX,player.hands[index].matchPos)},20);
			}
		} else if (player.mouseX >= ai.gridPosX-8 && player.mouseX <= ai.gridPosX+308 && player.mouseY >= 125 && player.mouseY <= 175 && (player.mouseX-ai.gridPosX)%38 >= 2) {
			var index = Math.floor((player.mouseX-ai.gridPosX)/38);
			if (ai.hands[index] && aniHighlightHandInFoucusIndex != index) {
				aniClear();
				aniHighlightHandInFoucus = true;
				aniHighlightHandInFoucusIndex = index;
				aniShow = setInterval(function(){aniHighlightHand(player.gridPosX,ai.hands[index].matchPos)},20);
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
					aniClear();
					if (dealtCards[focusCardIndex].suit == SPECIAL_SUIT && dealtCards[focusCardIndex].rank == TORCH_RANK)
						aniShow = setInterval(function(){aniBurnCardEffect(player.gridPosX,posY*3+posX)},20);
					else aniShow = setInterval(function(){aniDropCardEffect(player.gridPosX,posY*3+posX)},20);
					
					if (dealtCards[focusCardIndex].suit == SPECIAL_SUIT && dealtCards[focusCardIndex].rank == CLOWN_RANK) playSound(PLACE_CLOWN);
					else if (dealtCards[focusCardIndex].suit == SPECIAL_SUIT && dealtCards[focusCardIndex].rank == TORCH_RANK) playSound(TORCH);
					else playSound(PLACE_CARD);
					
					dealtCards[focusCardIndex] = null;
					focusCardIndex = -1;
					isStealing = false;
					player.move = false;
					
					return;
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
					
					playSound(THIEF);
					
					dealtCards[focusCardIndex] = stoleCard;
					ai.updateHands();
					isStealing = true;
					
					return;
				}
			}
			
			if (dealtCards[focusCardIndex].suit == SPECIAL_SUIT && dealtCards[focusCardIndex].rank == TORCH_RANK)
				if (ai.updateGrid(posY*3+posX,dealtCards[focusCardIndex])) {
					aniClear();
					aniShow = setInterval(function(){aniBurnCardEffect(ai.gridPosX,posY*3+posX)},20);
					
					playSound(TORCH);
					
					dealtCards[focusCardIndex] = null;
					focusCardIndex = -1;
					isStealing = false;
					player.move = false;
					
					return;
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