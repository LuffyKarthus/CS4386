// JavaScript Document/Users/karthus/Desktop/CS4386/ai.js
function aiAction(){
	for (var i = 0; i < 6; i++)
		if (dealtCards[i].suit <= 3) {
			var choose = i;
			break;
		}
	for (var i = 0; i < 9; i++)
		if (!ai.grid[i]) {
			var destPos = {pos:i,x:(i%3)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};
			break;
		}
	
	return {focusCardIndex:choose,destPos:destPos};
}
function aggressive(){

}
function targetOriented(){

}
function conservative(){

}
function random(){
	
}