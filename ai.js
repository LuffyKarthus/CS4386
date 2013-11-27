// JavaScript Document
function aiAction(){
	for (var i = 0; i < 9; i++)
		if (!ai.grid[i]) {
			var destPos = {pos:i,x:(i%3)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};
			break;
		}
	
	if (dealtCards[0].suit == SPECIAL_SUIT && dealtCards[0].rank == TORCH_RANK)
		for (var i = 0; i < 9; i++)
			if (player.grid[i]) {
				var destPos = {pos:i,x:(i%3)*105+player.gridPosX,y:Math.floor(i/3)*105+170};
				var burnTarget = "player";
				break;
			}
			
	if (dealtCards[0].suit == SPECIAL_SUIT && dealtCards[0].rank == THIEF_RANK) {
		var stealToPos = destPos;
		for (var i = 0; i < 9; i++)
			if (player.grid[i]) {
				destPos = {pos:i,x:(i%3)*105+player.gridPosX,y:Math.floor(i/3)*105+170};
				break;
			}
	}
	
	return {focusCardIndex:0,destPos:destPos,stealToPos:stealToPos,burnTarget:burnTarget};
}