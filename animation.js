// JavaScript Document
function aniHighlightGrid(){
	animation = $("#animation")[0].getContext && $("#animation")[0].getContext("2d");
	if (animation) {
		animation.clearRect(0,0,960,640);
		animation.globalAlpha = ((aniFrame%20 > 10)?20-aniFrame%20:aniFrame%20)/10;
		//Left
		for (i = 0; i < 9; i++)
			animation.drawImage(image,270,360,108,108,106+105*(i%3),161+105*Math.floor(i/3),108,108);
		for (i = 0; i < 9; i++)
		//Right
			animation.drawImage(image,270,360,108,108,536+105*(i%3),161+105*Math.floor(i/3),108,108);
		aniFrame++;
	}
}

function aniClear(){
	if (aniShow) clearInterval(aniShow);
	animation.clearRect(0,0,960,640);
}