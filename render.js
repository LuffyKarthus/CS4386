// JavaScript Document
aniShow = null;

function aniHighlightGrid(){
	if (animation) {
		animation.clearRect(0,0,960,640);
		animation.globalAlpha = ((aniFrame%20 > 10)?20-aniFrame%20:aniFrame%20)/10;
		//Left
		for (var i = 0; i < 9; i++)
			animation.drawImage(image,270,360,108,108,106+105*(i%3),161+105*Math.floor(i/3),108,108);
		//Right
		for (var i = 0; i < 9; i++)
			animation.drawImage(image,270,360,108,108,536+105*(i%3),161+105*Math.floor(i/3),108,108);
		aniFrame++;
	}
}

function aniClear(){
	if (aniShow) clearInterval(aniShow);
	if (animation) animation.clearRect(0,0,960,640);
	aniShow = null;
}

function renderBoard(){
	if (board) {
		board.clearRect(0,0,960,640);
		board.drawImage(image,396,360,774,416,93,82,774,416);
		board.drawImage(image,630,776,540,90,210,520,540,90);
		player.drawContent();
		ai.drawContent();
	}	
}

function renderSurface(){
	if (surface) {
		surface.clearRect(0,0,960,640);
		for (var i = 0; i < 6; i++) {
			if (i != focusCardIndex) dealtCards[i].drawCard(surface,210+90*i,520);
			if (dealtCards[i].scale < 1) dealtCards[i].scale += 0.1;
			else if (i != focusCardIndex) dealtCards[i].scale = 1;
		}
		if (focusCardIndex >= 0) dealtCards[focusCardIndex].drawCard(surface,dealtCards[focusCardIndex].posX,dealtCards[focusCardIndex].posY);
	}
}