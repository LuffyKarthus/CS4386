// JavaScript Document/Users/karthus/Desktop/CS4386/ai.js

/* Eric

Plz follow the return format of aiAction().

1. focusCardIndex:

2. destPos: {pos:__,x:(__%3)*105+ai.gridPosX,y:Math.floor(__/3)*105+170}  !!!!!!! player.gridPosX if burn player's card

3. if AI steal a card from player, plz also provide
		stealPos: {pos:__,x:(__%3)*105+player.gridPosX,y:Math.floor(__/3)*105+170}

4. plz provide the burn target if use burn
		burnTarget:

5. if AI use clown, plz provide the suit and the rank
		suit:
		rank:

*/
function aiAction(){

	return conservative();
	//For referencing
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
function conservative(){			//By Karthus
	/*
	var pick=new Array();
	var z=0;
	for (var i=0;i<6;i++)									// not picking up the special cards{
			if (dealtCards[i].suit!=SPECIAL_SUIT){
				pick[z]=i;
				z++;
				break;
			}
	}*/
	for (var i = 0; i < 6; i++)
		if (dealtCards[i].suit != SPECIAL_SUIT ) {								//suit 0 - 3 => spade heart diamond club										
			var choose = i;														//suit 4 => special card
			break;
		}
	for (var i = 0; i < 9; i++)		
		if (!ai.grid[i]) {												//ai.grid[i] : check whether the grid has card or not 
			var destPos = {pos:i,x:(i%3)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};	
			break;
		}
	for (var i=0;i<9;i++)					//Priority from getting pairs,Straight,Flush.    If a pattern can't be formed  ,then simply pick a card
	{
		for (var j=0;j<6;j++)
		{
			if ( ai.grid[i]  &&  dealtCards[j].rank==ai.grid[i].rank){				// Get for pairs && ai.grid[i] : check whether the grid has card or not 			
					var found=j;
					alert("found");
							alert("pairs");
							if (!ai.grid[(i)%8] )
					if (ai.grid[(i)%8] ){
						var destPos = {pos:i,x:((i+1)%3)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};
						alert("check empty grid 1");
						return {focusCardIndex:found,destPos:destPos};
					}

					/*
					for (var j=0;j<9;j++){
						if (ai.grid[j].rank)
						{
							alert("find empty grid");			
						}
						break;
					}	
					*/
				//	return {focusCardIndex:found,destPos:destPos};
			}
			/*		// Get for Straight && ai.grid[i] : check whether the grid has card or not
			if ( (!ai.grid[i]  &&  ((dealtCards[j].rank-1>ai.grid[i].rank) || (dealtCards[j].rank+1>ai.grid[i].rank) ) )){		
					var destPos = {pos:i,x:(i%3)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};
					var found=j;
					return {focusCardIndex:found,destPos:destPos};
																
			}		//	&& ai.grid[i+3]%8
			if (!ai.grid[i]  && (dealtCards[j].suit==ai.grid[i].suit)){					// Get for Flush && ai.grid[i] : check whether the grid has card or not
					var destPos = {pos:i,x:(i%3)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};
					var found=j;
					return {focusCardIndex:found,destPos:destPos};															
			}
			*/
		}	
	}
				alert("random");
				return {focusCardIndex:choose,destPos:destPos};							//focusCardIndex : the index from the card deck 
																					//destPos : the position of the ai grid 
}
/*
function aggressive(){
	//thoughts by jimmyshum:
	//ai player would not only be target-oriented, it would also think about the player grid for raising the probability of winning the game

}
function targetOriented(){
	//thoughts by jimmyshum:
	//ai player would like to choose some particular conditions for awarding higher scores 
	var prior = new Array();
	var occupiedGrid = 0;
	//count the empty grid in ai panel
	for(var i=0;i<9;i++){
		if(ai.grid[i]){
			occupiedGrid++;
		}
	}

	//Action dealing with the number of empty grid , the first step
	if(occupiedGrid == 0){
		for(var i=0;i<6;i++){
			if(dealtCards[i].suit!=SPECIAL_SUIT){
				if(dealtCards[i].rank >= 10 && dealtCards[i].rank <= 12){
					prior.push(i);
				}
			}
		}
		var choose = prior[Math.floor(Math.random()*prior.length)];
		//test
		alert(choose);


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

		return {focusCardIndex:choose,destPos:destPos};

	}
	else
		return random();
}
*/
