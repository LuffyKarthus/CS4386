// JavaScript Document
aniShow = null;
aniHighlightHandInFoucus = false;
aniHighlightHandInFoucusIndex = -1;

function aniHighlightGrid(status){
	if (animation) {
		animation.clearRect(0,0,960,640);
		animation.globalAlpha = ((aniFrame%20 > 10)?20-aniFrame%20:aniFrame%20)/10;
		//Left
		for (var i = 0; i < 9; i++)
			if (status[0] && status[0][i]) animation.drawImage(image,0,560,108,108,106+105*(i%3),161+105*Math.floor(i/3),108,108);
		//Right
		for (var i = 0; i < 9; i++)
			if (status[1] && status[1][i]) animation.drawImage(image,0,560,108,108,536+105*(i%3),161+105*Math.floor(i/3),108,108);
		aniFrame++;
	}
}

function aniHighlightHand(gridPosX,matchPos){
	if (animation) {
		animation.clearRect(0,0,960,640);
		animation.globalAlpha = ((aniFrame > 10)?20-aniFrame:aniFrame)/10;
		for (var i = 0; i < matchPos.length; i++)
			animation.drawImage(image,110,560,108,108,gridPosX-9+105*(matchPos[i]%3),161+105*Math.floor(matchPos[i]/3),108,108);
		if (aniHighlightHandInFoucus && aniFrame < 10 || !aniHighlightHandInFoucus) aniFrame++;
		if (aniFrame > 20) aniClear();
	}
}

function aniDropCardEffect(gridPosX,effectPos){
	if (animation) {
		animation.clearRect(0,0,960,640);
		animation.globalAlpha = 1-aniFrame*0.05;
		animation.drawImage(image,0,560,108,108,Math.floor((gridPosX-9+105*(effectPos%3))-108*(aniFrame*0.05)*0.5),
								Math.floor((161+105*Math.floor(effectPos/3))-108*(aniFrame*0.05)*0.5),108*(1+aniFrame*0.05),108*(1+aniFrame*0.05));
		aniFrame++;
		if (aniFrame > 20) aniClear();
	}
}

function aniBurnCardEffect(gridPosX,effectPos){
	if (animation) {
		animation.clearRect(0,0,960,640);
		animation.globalAlpha = 1-aniFrame*0.05;
		animation.drawImage(image,270,360,90,90,gridPosX+105*(effectPos%3),170+105*Math.floor(effectPos/3),90,90);
		if (aniFrame%5 == 0) animation.drawImage(image,225,560,80,100,Math.floor(gridPosX+5+105*(effectPos%3)-90*(aniFrame*0.05)*0.25),
													Math.floor(260+105*Math.floor(effectPos/3)-100*(1+aniFrame*0.025)),80*(1+aniFrame*0.025),100*(1+aniFrame*0.025));
		else animation.drawImage(image,315,560,80,100,Math.floor(gridPosX+5+105*(effectPos%3)-90*(aniFrame*0.05)*0.25),
									Math.floor(260+105*Math.floor(effectPos/3)-100*(1+aniFrame*0.025)),80*(1+aniFrame*0.025),100*(1+aniFrame*0.025));
		aniFrame++;
		if (aniFrame > 20) aniClear();
	}
}

function aniClear(){
	if (aniShow) clearInterval(aniShow);
	if (animation) animation.clearRect(0,0,960,640);
	aniShow = null;
	aniFrame = 0;
}

function renderBoard(){
	if (board) {
		board.clearRect(0,0,960,640);
		board.drawImage(image,0,515,380,45,290,20,380,45);
		board.drawImage(image,396,360,774,416,93,82,774,416);
		
		//Draw the arrow
		board.save(); 
		board.translate(480,320);
		board.rotate(arrowRotateDegree*Math.PI/180);
		board.drawImage(image,270,680,80,80,-40,-40,80,80);
		board.restore();
		
		player.drawContent();
		ai.drawContent();
	}	
}

function renderSurface(){
	if (surface) {
		surface.clearRect(0,0,960,640);
		surface.drawImage(image,0,680,90,90,210,520,90,90);
		for (var i = 0; i < 4; i++)
			surface.drawImage(image,90,680,90,90,300+90*i,520,90,90);
		surface.drawImage(image,180,680,90,90,660,520,90,90);
		
		for (var i = 0; i < 6; i++)
			if (dealtCards[i]) {
				if (i != focusCardIndex) dealtCards[i].drawCard(surface,210+90*i,520);
				if (dealtCards[i].scale < 1) dealtCards[i].scale += 0.1;
				else if (i != focusCardIndex) dealtCards[i].scale = 1;
			}
		if (focusCardIndex >= 0) {
			dealtCards[focusCardIndex].drawCard(surface,dealtCards[focusCardIndex].posX,dealtCards[focusCardIndex].posY);
			if (isStealing) {
				surface.globalAlpha = 0.4;
				surface.drawImage(image,90,360,90,90,Math.floor(dealtCards[focusCardIndex].posX-4.5),Math.floor(dealtCards[focusCardIndex].posY-4.5),99,99);
				surface.globalAlpha = 1;
			}
		}
		surface.drawImage(image,250,470,22,34,ai.mouseX,ai.mouseY,22,34);
	}
}

function renderWelcome(){
	if (welcome) {
		welcome.clearRect(0,0,960,640);
		for (var i = 0; i < aniFlyingCards.length; i++)
			if (aniFlyingCards[i]) {
				welcome.globalAlpha = Math.max(1-aniFlyingCards[i].card.scale*0.2,0);
				aniFlyingCards[i].card.drawCard(welcome,	aniFlyingCards[i].card.posX-45,aniFlyingCards[i].card.posY-45);
				aniFlyingCards[i].card.scale += 0.1;
				aniFlyingCards[i].card.posX += Math.floor(15*Math.cos(aniFlyingCards[i].flyAngle));
				aniFlyingCards[i].card.posY += Math.floor(15*Math.sin(aniFlyingCards[i].flyAngle));
			}
		welcome.globalAlpha = 1;
		welcome.drawImage(image,0,515,380,45,290,aniLogoPosY,380,45);
		for (var i = 0; i < 4; i++) {
			if (focusDifficultyIndex == i) welcome.drawImage(image,300*i,780,300,100,180+300*(i%2),260+100*Math.floor(i*0.5),300,100);
			else welcome.drawImage(image,20+300*i,800,260,60,200+300*(i%2),280+100*Math.floor(i*0.5),260,60);
		}
		welcome.fillStyle = "#0033FF";
		welcome.font = "30px Lilita One";
		welcome.textAlign = "center";
		welcome.fillText("Please select a difficulty",480,500);
		welcome.font = "15px Lilita One";
		welcome.fillText("Developed by Eric, Jimmy and Karthus",480,610);
	}
}