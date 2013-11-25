// JavaScript Document/Users/karthus/Desktop/CS4386/ai.js
function aiAction(){
	return conservative();
	//For refecing
	/*for (var i = 0; i < 6; i++)

		//suit 0 - 3 => spade heart diamond club
		//suit 4 => special card

		if (dealtCards[i].suit <= 3) {
			var choose = i;
			break;
		}
	for (var i = 0; i < 9; i++)

		//ai.grid[i] : check whether the grid has card or not 
		if (!ai.grid[i]) {
			var destPos = {pos:i,x:(i%3)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};
			break;
		}
	
	//focusCardIndex : the index from the card deck 
	//destPos : the position of the ai grid 
	return {focusCardIndex:choose,destPos:destPos};*/
}
function aggressive(){
	//thoughts by jimmyshum:
	//ai player would not only be target-oriented, it would also think about the player grid for raising the probability of winning the game

}
function targetOriented(){
	//thoughts by jimmyshum:
	//ai player would like to choose some particular conditions for awarding higher scores 
}

function conservative(){
	//thoughts by jimmyshum:
	//ai tends to get points for completing any conditions
	var pick=new Array();
	var j=0;
	for (var i=0;i<6;i++)									// not picking up the special cards
	{
			if (dealtCards[i].suit!=SPECIAL_SUIT)
			{
				pick[j]=i;
				j++;
				break;
			}
	}

	for (var i = 0; i < 9; i++)

		//ai.grid[i] : check whether the grid has card or not 
		if (!ai.grid[i]) {
			var destPos = {pos:i,x:(i%3)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};
			break;
		}

	for (var i=0;i<9;i++)					//Priority from getting pairs,Straight,Flush.    If a pattern can't be formed  ,then simply pick a card
	{
		for (var j=0;j<6;j++)
		{
			if (dealtCards[j].rank==ai.grid[i].rank && ai.grid[i+3]%8){				// Get for pairs && ai.grid[i] : check whether the grid has card or not 		
				
					var deskPos={pos:i,x:((i+3)%3)*105+ai.gridPosX,y:Math.floor((i+3)/3)*105+170};
						return {focusCardIndex:choose,destPos:destPos};
			}
			if ( (dealtCards[j].rank-1>ai.grid[i].rank) || (dealtCards[j].rank+1>ai.grid[i].rank) && ai.grid[i+3]%8){					// Get for Straight && ai.grid[i] : check whether the grid has card or not
				{
					var deskPos={pos:i,x:((i+3)%3)*105+ai.gridPosX,y:Math.floor((i+3)/3)*105+170};
					return {focusCardIndex:choose,destPos:destPos};
				}																	
			}
			if (dealtCards[j].suit==ai.grid[i].suit && ai.grid[i+3]%8){					// Get for Flush && ai.grid[i] : check whether the grid has card or not
				{
					var deskPos={pos:i,x:((i+3)%3)*105+ai.gridPosX,y:Math.floor((i+3)/3)*105+170};
						return {focusCardIndex:choose,destPos:destPos};
				}																
			}
			/*
			if (!ai.grid[i]) {															// just get a card && check whether the grid has card or not
					var destPos = {pos:i,x:((i+3)%3)*105+ai.gridPosX,y:Math.floor((i+3)/3)*105+170};
					return {focusCardIndex:choose,destPos:destPos};
			}
			*/
		}	
	}
			return {focusCardIndex:choose,destPos:destPos};							//focusCardIndex : the index from the card deck 
																					//destPos : the position of the ai grid 

}
function random(){
	//thoughts by jimmyshum:
	//ai player would choose the cards in random

	var randNum;

	//For the CardDeck Part
	//to ensure that the random num is within 0 - 5 (6 will cause arrayOutOfBound)
	do{
	 	randNum = Math.floor(Math.random()*6);

	 	//|check
	 	//alert("choose: "+randNum);
	 	//|check
	}while(randNum == 6);
	var choose = randNum;

	//For the ai grid part
	//to ensure that the random num is within 0 - 5 (6 will cause arrayOutOfBound)
	do{
		do{
			randNum = Math.floor(Math.random()*9);	
		}while(randNum == 9);
		//|check
		//alert("destPos: "+randNum);
		//|check
		if (!ai.grid[randNum]) {
			var destPos = {pos:randNum,x:(randNum%3)*105+ai.gridPosX,y:Math.floor(randNum/3)*105+170};
		}
		//|check
		//alert(!ai.grid[randNum]);
		//|check
	}while(ai.grid[randNum]);

	//focusCardIndex : the index from the card deck 
	//destPos : the position of the ai grid 
	return {focusCardIndex:choose,destPos:destPos};


}