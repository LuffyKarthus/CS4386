
// JavaScript Document/Users/karthus/Desktop/CS4386/ai.js

/* by Eric

Please follow the return format of aiAction()

1. focusCardIndex:

2. destPos: {pos:__,x:(__%3)*105+ai.gridPosX,y:Math.floor(__/3)*105+170}  (player.gridPosX if burn player's card)

3. if AI want to steal a card from player, also provide
		stealToPos: {pos:__,x:(__%3)*105+player.gridPosX,y:Math.floor(__/3)*105+170}

4. if AI want to use torch, provide the burn target
		burnTarget: (ai/player)
*/
<<<<<<< HEAD

=======
>>>>>>> 2aae06a1c21a67d4c36cd7ad45f7219a4a7364b5
function aiAction(){
	if (gameDifficulty == VERY_HARD) return veryAggressive();
	else if (gameDifficulty == HARD) return aggressive();
	else if (gameDifficulty == NORMAL) return targetOriented();
	else return random();
<<<<<<< HEAD
=======

>>>>>>> 2aae06a1c21a67d4c36cd7ad45f7219a4a7364b5
}

function veryAggressive(){
	//thoughts by jimmyshum:
	//ai player would not only be target-oriented, it would also think about the player grid for raising the probability of winning the game
	var choose;
	var destPos;
	var stealToPos;
	var prior = new Array();
	var occupiedGrid = 0;

	//count the empty grid in ai panel
	for(var i=0;i<9;i++){
		if(ai.grid[i]){
			occupiedGrid++;
		}
	}
	if(occupiedGrid == 0)
		return targetOriented();

	else{
		//consideration about the player Grid
		var playerValueArr = checkPlayerGridValue(player.grid);
		
		


		for(var i=0;i<6;i++){
			if(dealtCards[i].suit == SPECIAL_SUIT){
				// Crown card
				if(dealtCards[i].rank == 0){
					choose = i;
					if(!ai.grid[4]){
						var p = 4;
						destPos = {pos:p,x:(p%3)*105+ai.gridPosX,y:Math.floor(p/3)*105+170};
						return {focusCardIndex:choose,destPos:destPos};
				
					}
					else{
						do{
							do{
								randNum = Math.floor(Math.random()*9);	
							}while(randNum == 9);
						
							if (!ai.grid[randNum]) {
								destPos = {pos:randNum,x:(randNum%3)*105+ai.gridPosX,y:Math.floor(randNum/3)*105+170};
							}
		
						}while(ai.grid[randNum]);
						
						return {focusCardIndex:choose,destPos:destPos};
				
					}
				} 

				// Thief card
				if(dealtCards[i].rank == 1){
					choose = i;

					var isChoose = false;

					for(var i=0;i<9;i++){
						if(player.grid[i])
						if(player.grid[i].suit == SPECIAL_SUIT){
							if(player.grid[i].rank == 0){
								var p = i;
								isChoose = true;
							}
						}
					}
					if(!isChoose){
						var highest = calMaxValue(playerValueArr);
						for(var i=0;i<9;i++){
							if(playerValueArr[i] == highest){
								prior.push(i);
							}
						}
						var p = prior[Math.floor(Math.random()*prior.length)];
						prior = new Array();
					}



					destPos = {pos:p,x:(p%3)*105+player.gridPosX,y:Math.floor(p/3)*105+170};


					var AIValueArr = checkAIComGridValue(player.grid[p],ai.grid);
			
					var highest = calMaxValue(AIValueArr);
					for(var i=0;i<9;i++){
						if(!ai.grid[i])
						if(AIValueArr[i] == highest){
							prior.push(i);
						}
					}
					
					var q = prior[Math.floor(Math.random()*prior.length)];
					prior = new Array();
					stealToPos = {pos:q,x:(q%3)*105+ai.gridPosX,y:Math.floor(q/3)*105+170};
					return {focusCardIndex:choose,destPos:destPos,stealToPos:stealToPos};
					//end temp approach

				}
				// Torch card
				if(dealtCards[i].rank == 2){
					choose = i;
					var highest = calMaxValue(playerValueArr);
					for(var i=0;i<9;i++){
						if(playerValueArr[i] == highest){
							prior.push(i);
						}
					}
					
					var p = prior[Math.floor(Math.random()*prior.length)];
					prior = new Array();
					destPos = {pos:p,x:(p%3)*105+player.gridPosX,y:Math.floor(p/3)*105+170};
					return {focusCardIndex:choose,destPos:destPos,burnTarget:"player"};
				}
			}
		}
		//test
		return targetOriented();
		//test

	}
}
function aggressive(){
	//thoughts by jimmyshum:
	//ai player would not only be target-oriented, it would also think about the player grid for raising the probability of winning the game
	var choose;
	var destPos;
	var stealToPos;
	var prior = new Array();
	var occupiedGrid = 0;

	//count the empty grid in ai panel
	for(var i=0;i<9;i++){
		if(ai.grid[i]){
			occupiedGrid++;
		}
	}
	if(occupiedGrid == 0)
		return targetOriented();

	else{

		//consideration about the player Grid
		var playerValueArr = checkPlayerGridValue(player.grid);

		for(var i=0;i<6;i++){
			if(dealtCards[i].suit == SPECIAL_SUIT){


				// Crown card
				if(dealtCards[i].rank == 0){
					choose = i;
					if(!ai.grid[4]){
						var p = 4;
						destPos = {pos:p,x:(p%3)*105+ai.gridPosX,y:Math.floor(p/3)*105+170};
						return {focusCardIndex:choose,destPos:destPos};
				
					}
					else{
						do{
							do{
								randNum = Math.floor(Math.random()*9);	
							}while(randNum == 9);
						
							if (!ai.grid[randNum]) {
								destPos = {pos:randNum,x:(randNum%3)*105+ai.gridPosX,y:Math.floor(randNum/3)*105+170};
							}
		
						}while(ai.grid[randNum]);
						
						return {focusCardIndex:choose,destPos:destPos};
				
					}
				} 
				// Thief card
				if(dealtCards[i].rank == 1){

					//random approach
					choose = i;
					do{
						do{
							randNum = Math.floor(Math.random()*9);	
						}while(randNum == 9);
						
						if (player.grid[randNum]) {
							destPos = {pos:randNum,x:(randNum%3)*105+player.gridPosX,y:Math.floor(randNum/3)*105+170};
						}
		
					}while(!player.grid[randNum]);


					do{
						do{
							randNum = Math.floor(Math.random()*9);	
						}while(randNum == 9);
						
						if (!ai.grid[randNum]) {
							stealToPos = {pos:randNum,x:(randNum%3)*105+ai.gridPosX,y:Math.floor(randNum/3)*105+170};
						}
		
					}while(ai.grid[randNum]);

					return {focusCardIndex:choose,destPos:destPos,stealToPos:stealToPos};
					

				}
				// Torch card
				if(dealtCards[i].rank == 2){
					choose = i;
					var highest = calMaxValue(playerValueArr);
					for(var i=0;i<9;i++){
						if(playerValueArr[i] == highest){
							prior.push(i);
						}
					}
					
					var p = prior[Math.floor(Math.random()*prior.length)];
					prior = new Array();
					destPos = {pos:p,x:(p%3)*105+player.gridPosX,y:Math.floor(p/3)*105+170};
					return {focusCardIndex:choose,destPos:destPos,burnTarget:"player"};
				}
			}
		}
		
		/*
		var valueArr = checkAIGridValue(dealtCards,ai.grid);
		var maxValueInValueArr = new Array();
		for(var i=0;i<6;i++){
			maxValueInValueArr.push(calMaxValue(valueArr[i]));
		}
		var highest = calMaxValue(maxValueInValueArr);
		for(var i=0;i<6;i++){
			if(maxValueInValueArr[i] == highest){
				prior.push(i);
			}
		}
		choose = prior[Math.floor(Math.random()*prior.length)];
		prior = new Array();



		highest = calMaxValue(valueArr[choose]);
		for(var i=0;i<9;i++){
			//test
			//alert("valueArr" + i + ": " + valueArr[choose][i] + "  highest: " + highest);
			if(valueArr[choose][i] == highest){
				prior.push(i);
			}
		}


		//alert(prior.length);
		do{
			var p = prior[Math.floor(Math.random()*prior.length)];
			if(!ai.grid[p]){
				destPos = {pos:p,x:(p%3)*105+ai.gridPosX,y:Math.floor(p/3)*105+170};
			}
		}while(ai.grid[p]);
		prior = new Array();

		//test
		//alert("choose: " + choose + "  destPos: " + p );


		return {focusCardIndex:choose,destPos:destPos};

		}

	*/
	}
	return targetOriented();
}

function max(num1,num2,num3,num4){


	//check
	//alert(num1 + " " + num2 + " " + num3 + " " + num4);
	//

	var highest = num1;
	if(num2 > highest){
		highest = num2;
	}
	if(num3 > highest){
		highest = num3;
	}
	if(num4 > highest)
		highest = num4;
	return highest;
}
function analysisPlayerGridCards(playerCard,card1,card2){
	return analysisGridCards(playerCard,card1,card2);
}
function analysisAIGridCards(dealtCard,card1,card2){
	return analysisGridCards(dealtCard,card1,card2);
}
function checkPlayerGridValue(grid){
	//var valueArr = new Array();
	var playerGridValue = [0,0,0,0,0,0,0,0,0];
		playerGridValue = calPlayerGridValue(playerGridValue,grid);
		
	return playerGridValue;
}
function checkAIComGridValue(card,grid){
	var aiGridValue = [0,0,0,0,0,0,0,0,0];
		aiGridValue = calAIGridValue(aiGridValue,card,grid);
		
	return aiGridValue;
}

function calPlayerGridValue(value,grid){
	var currValue = -1;
	for(var i=0;i<9;i++){
		//test
		//alert("i: " + i + " "+grid[i]);

		if(grid[i]){
			var currCard = grid[i];
			switch(i){
				case 0: currValue = max(analysisPlayerGridCards(currCard,grid[1],grid[2]), analysisPlayerGridCards(currCard,grid[3],grid[6]), analysisPlayerGridCards(currCard,grid[4],grid[8]),0);break;
				case 1: currValue = max(analysisPlayerGridCards(currCard,grid[0],grid[2]), analysisPlayerGridCards(currCard,grid[4],grid[7]),0,0);break;
				case 2: currValue = max(analysisPlayerGridCards(currCard,grid[0],grid[1]), analysisPlayerGridCards(currCard,grid[5],grid[8]), analysisPlayerGridCards(currCard,grid[4],grid[6]),0);break;
				case 3: currValue = max(analysisPlayerGridCards(currCard,grid[4],grid[5]), analysisPlayerGridCards(currCard,grid[0],grid[6]),0,0);break;
				case 4: currValue = max(analysisPlayerGridCards(currCard,grid[3],grid[5]), analysisPlayerGridCards(currCard,grid[1],grid[7]), analysisPlayerGridCards(currCard,grid[0],grid[8]),analysisPlayerGridCards(currCard,grid[2],grid[6]));break;
				case 5: currValue = max(analysisPlayerGridCards(currCard,grid[3],grid[4]), analysisPlayerGridCards(currCard,grid[2],grid[8]),0,0);break;
				case 6: currValue = max(analysisPlayerGridCards(currCard,grid[7],grid[8]), analysisPlayerGridCards(currCard,grid[0],grid[3]), analysisPlayerGridCards(currCard,grid[2],grid[4]),0);break;
				case 7: currValue = max(analysisPlayerGridCards(currCard,grid[6],grid[8]), analysisPlayerGridCards(currCard,grid[1],grid[4]),0,0);break;
				case 8: currValue = max(analysisPlayerGridCards(currCard,grid[6],grid[7]), analysisPlayerGridCards(currCard,grid[2],grid[5]), analysisPlayerGridCards(currCard,grid[0],grid[4]),0);break;
		
			}
		}
		else{
			currValue = -1;
		}
		
		//if(!currCard){
			
		//}

		//test
		//alert("curr:" + i + " currValue:" + currValue);
		//
		value[i] = currValue;
	}
	return value;
}
//to analysis 
function analysisGridCards(dealtCard,card1,card2){
	var c1 = -1;
	var c2 = -1;
	//for the case of no card inside the grid
	if(!card1)
		c1 = 0;
	if(!card2)
		c2 = 0;
	if(c1 == -1 && c2 == -1){
		//Three cards exists
	if((dealtCard.rank >= 10 && dealtCard.rank <= 12) && (card1.rank >= 10 && card1.rank <= 12) && (card2.rank >= 10 && card2.rank <= 12)){
		if(dealtCard.suit == card1.suit && dealtCard.suit == card2.suit && card1.suit == card2.suit){
			if(dealtCard.rank != card1.rank && dealtCard.rank != card2.rank && card1.rank != card2.rank){ //JQK Straight Flush
				return 6+2;
			}

		}
		else{
			if(dealtCard.rank != card1.rank && dealtCard.rank != card2.rank && card1.rank != card2.rank){ //JQK Straight
				return 3+2;
			}
			else // Same kind
				return 2+2;
		}
	}
	else{ //not JQK
		var cardArr = new Array();
			cardArr.push(dealtCard.rank);
			cardArr.push(card1.rank);
			cardArr.push(card2.rank);
			cardArr.sort();
		if(dealtCard.suit == card1.suit && dealtCard.suit == card2.suit && card1.suit == card2.suit){
			if(cardArr[2] - cardArr[1] == 1 && cardArr[1] - cardArr[0] == 1){ //Straight Flush
				return 5+2;
			}
			else //Flush
				return 4+2;
		}
		else
			if(cardArr[2] - cardArr[1] == 1 && cardArr[1] - cardArr[0] == 1){ //Straight
				return 3+2;
			}
			else if(dealtCard.rank - card1.rank == 0 && dealtCard.rank - card2.rank == 0)//same kind
				return 2+2;
			else //Cant form anything
				return 0;
	}

	}
	//for dealtCard only
	if(c1 == 0 && c2 == 0){
		//no comparison
		return 1;

	}
	//for one 
	if(c1 == 0){
		if(dealtCard.rank >= 10 && dealtCard.rank <= 12 && card2.rank >= 10 && card2.rank <= 12){ //JQK 
			if(dealtCard.suit == card2.suit && dealtCard.rank != card2.rank){ //JQK Straight Flush
				return 6;
			}
			else{
				if(dealtCard.rank - card2.rank >= -2 && dealtCard.rank - card2.rank <= 2 && dealtCard.rank != card2.rank){  //JQK Straight
					return 3;
				}
				else if(dealtCard.rank - card2.rank == 0){ //JQK same kind
					return 2;
				}
			}
		}
		else{
			
			if(dealtCard.suit == card2.suit){ //not JQK
				if(dealtCard.rank - card2.rank >= -2 && dealtCard.rank - card2.rank <= 2 && dealtCard.rank != card2.rank){ //Straight Flush
					return 5;
				}
				else	//Flush
					return 4;
			}
			else{
				if(dealtCard.rank - card2.rank >= -2 && dealtCard.rank - card2.rank <= 2 && dealtCard.rank != card2.rank){ //Straight
					return 3;
				}
				else if(dealtCard.rank - card2.rank == 0){ //Same kind
					return 2;
				}
				else //can't form these kind above
					return 0;
			}
			

		}

	}

	if(c2 == 0){
		if(dealtCard.rank >= 10 && dealtCard.rank <= 12 && card1.rank >= 10 && card1.rank <= 12){ //JQK 
			if(dealtCard.suit == card1.suit && dealtCard.rank != card1.rank){ //JQK Straight Flush
				return 6;
			}
			else{
				if(dealtCard.rank - card1.rank >= -2 && dealtCard.rank - card1.rank <= 2 && dealtCard.rank != card1.rank){  //JQK Straight
					return 3;
				}
				else if(dealtCard.rank - card1.rank == 0){ //JQK same kind
					return 2;
				}
			}
		}
		else{
			if(dealtCard.suit == card1.suit){ //not JQK
				if(dealtCard.rank - card1.rank >= -2 && dealtCard.rank - card1.rank <= 2 && dealtCard.rank != card1.rank){ //Straight Flush
					return 5;
				}
				else	//Flush
					return 4;
			}
			else{
				if(dealtCard.rank - card1.rank >= -2 && dealtCard.rank - card1.rank <= 2 && dealtCard.rank != card1.rank){ //Straight
					return 3;
				}
				else if(dealtCard.rank - card1.rank == 0){ //Same kind
					return 2;
				}
				else //can't form these kind above
					return 0;
			}
		

		}

	}

}

function max(num1,num2,num3,num4){
	//check
	//alert(num1 + " " + num2 + " " + num3 + " " + num4);
	//
	var highest = num1;
	if(num2 > highest){
		highest = num2;
	}
	if(num3 > highest){
		highest = num3;
	}
	if(num4 > highest)
		highest = num4;
	return highest;
}

function calMaxValue(value){
	var highest = value[0];
	for(var i=1;i<9;i++){
		if(value[i] > highest){
			highest = value[i];
		}
	}
	return highest;
}

function targetOriented(){
	//thoughts by jimmyshum:
	//ai player would like to choose some particular conditions for awarding higher scores 
	var choose;
	var destPos;
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
		if(prior.length > 0){
			choose = prior[Math.floor(Math.random()*prior.length)];
			prior = new Array();
		}
		else
			return random();
		//test
		//alert("choose-0: " +choose);


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
				destPos = {pos:randNum,x:(randNum%3)*105+ai.gridPosX,y:Math.floor(randNum/3)*105+170};
			}
			//|check
			//alert(!ai.grid[randNum]);
			//|check
		}while(ai.grid[randNum]);

		return {focusCardIndex:choose,destPos:destPos};

	}
	else{
		var valueArr = checkAIGridValue(dealtCards,ai.grid);
		var maxValueInValueArr = new Array();
		for(var i=0;i<6;i++){
			maxValueInValueArr.push(calMaxValue(valueArr[i]));
		}
		var highest = calMaxValue(maxValueInValueArr);
		for(var i=0;i<6;i++){
			if(maxValueInValueArr[i] == highest){
				prior.push(i);
			}
		}
		choose = prior[Math.floor(Math.random()*prior.length)];
		prior = new Array();



		highest = calMaxValue(valueArr[choose]);
		for(var i=0;i<9;i++){
			//test
			//alert("valueArr" + i + ": " + valueArr[choose][i] + "  highest: " + highest);
			if(valueArr[choose][i] == highest){
				prior.push(i);
			}
		}


		//alert(prior.length);
		do{
			var p = prior[Math.floor(Math.random()*prior.length)];
			if(!ai.grid[p]){
				destPos = {pos:p,x:(p%3)*105+ai.gridPosX,y:Math.floor(p/3)*105+170};
			}
		}while(ai.grid[p]);
		prior = new Array();

		//test
		//alert("choose: " + choose + "  destPos: " + p );


		return {focusCardIndex:choose,destPos:destPos};



	}
	return random();

}



//to analysis 

function calAIGridValue(value,dealtCard,grid){
	var currValue = -1;
	for(var i=0;i<9;i++){


		if(!grid[i]){
			switch(i){
				case 0: currValue = max(analysisAIGridCards(dealtCard,grid[1],grid[2]), analysisAIGridCards(dealtCard,grid[3],grid[6]), analysisAIGridCards(dealtCard,grid[4],grid[8]),0);break;
				case 1: currValue = max(analysisAIGridCards(dealtCard,grid[0],grid[2]), analysisAIGridCards(dealtCard,grid[4],grid[7]),0,0);break;
				case 2: currValue = max(analysisAIGridCards(dealtCard,grid[0],grid[1]), analysisAIGridCards(dealtCard,grid[5],grid[8]), analysisAIGridCards(dealtCard,grid[4],grid[6]),0);break;
				case 3: currValue = max(analysisAIGridCards(dealtCard,grid[4],grid[5]), analysisAIGridCards(dealtCard,grid[0],grid[6]),0,0);break;
				case 4: currValue = max(analysisAIGridCards(dealtCard,grid[3],grid[5]), analysisAIGridCards(dealtCard,grid[1],grid[7]), analysisAIGridCards(dealtCard,grid[0],grid[8]),analysisAIGridCards(dealtCard,grid[2],grid[6]));break;
				case 5: currValue = max(analysisAIGridCards(dealtCard,grid[3],grid[4]), analysisAIGridCards(dealtCard,grid[2],grid[8]),0,0);break;
				case 6: currValue = max(analysisAIGridCards(dealtCard,grid[7],grid[8]), analysisAIGridCards(dealtCard,grid[0],grid[3]), analysisAIGridCards(dealtCard,grid[2],grid[4]),0);break;
				case 7: currValue = max(analysisAIGridCards(dealtCard,grid[6],grid[8]), analysisAIGridCards(dealtCard,grid[1],grid[4]),0,0);break;
				case 8: currValue = max(analysisAIGridCards(dealtCard,grid[6],grid[7]), analysisAIGridCards(dealtCard,grid[2],grid[5]), analysisAIGridCards(dealtCard,grid[0],grid[4]),0);break;
		
			}
		}

		//test
		//alert("curr:" + i + " currValue:" + currValue);
		//
		value[i] = currValue;
	}
	return value;
	

}

function checkAIGridValue(dealtCards,grid){
	var valueArr = new Array();
	var value = [0,0,0,0,0,0,0,0,0];
	for(var i=0;i<6;i++){
		if(dealtCards[i].suit != SPECIAL_SUIT){
			value = calAIGridValue(value,dealtCards[i],grid);
		}
		valueArr.push(value);




		value = [0,0,0,0,0,0,0,0,0];
	}
	return valueArr;
}


////////////////////////end of target-oriented


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
/*function conservative(){
	var choose;
	var destPos;
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
		if(prior.length > 0){
			choose = prior[Math.floor(Math.random()*prior.length)];
			prior = new Array();
		}
		else
			return random();
		//test
		//alert("choose-0: " +choose);


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
				destPos = {pos:randNum,x:(randNum%3)*105+ai.gridPosX,y:Math.floor(randNum/3)*105+170};
			}
			//|check
			//alert(!ai.grid[randNum]);
			//|check
		}while(ai.grid[randNum]);

		return {focusCardIndex:choose,destPos:destPos};

	}
	else{
		var valueArr = checkAIGridValueForConservative(dealtCards,ai.grid);
		var maxValueInValueArr = new Array();
		for(var i=0;i<6;i++){
			maxValueInValueArr.push(calMaxValue(valueArr[i]));
		}
		var highest = calMaxValue(maxValueInValueArr);
		for(var i=0;i<6;i++){
			if(maxValueInValueArr[i] == highest){
				prior.push(i);
			}
		}
		choose = prior[Math.floor(Math.random()*prior.length)];
		prior = new Array();



		highest = calMaxValue(valueArr[choose]);
		for(var i=0;i<9;i++){
			//test
			//alert("valueArr" + i + ": " + valueArr[choose][i] + "  highest: " + highest);
			if(valueArr[choose][i] == highest){
				prior.push(i);
			}
		}


		//alert(prior.length);
		do{
			var p = prior[Math.floor(Math.random()*prior.length)];
			if(!ai.grid[p]){
				destPos = {pos:p,x:(p%3)*105+ai.gridPosX,y:Math.floor(p/3)*105+170};
			}
		}while(ai.grid[p]);
		prior = new Array();

		//test
		//alert("choose: " + choose + "  destPos: " + p );


		return {focusCardIndex:choose,destPos:destPos};



	}
	return random();
}
//to analysis 

function calAIGridValueForConservative(value,dealtCard,grid){
	var currValue = -1;
	for(var i=0;i<9;i++){


		if(!grid[i]){
			switch(i){
				case 0: currValue = max(analysisAIGridCardsForConservative(dealtCard,grid[1],grid[2]), analysisAIGridCardsForConservative(dealtCard,grid[3],grid[6]), analysisAIGridCardsForConservative(dealtCard,grid[4],grid[8]),0);break;
				case 1: currValue = max(analysisAIGridCardsForConservative(dealtCard,grid[0],grid[2]), analysisAIGridCardsForConservative(dealtCard,grid[4],grid[7]),0,0);break;
				case 2: currValue = max(analysisAIGridCardsForConservative(dealtCard,grid[0],grid[1]), analysisAIGridCardsForConservative(dealtCard,grid[5],grid[8]), analysisAIGridCardsForConservative(dealtCard,grid[4],grid[6]),0);break;
				case 3: currValue = max(analysisAIGridCardsForConservative(dealtCard,grid[4],grid[5]), analysisAIGridCardsForConservative(dealtCard,grid[0],grid[6]),0,0);break;
				case 4: currValue = max(analysisAIGridCardsForConservative(dealtCard,grid[3],grid[5]), analysisAIGridCardsForConservative(dealtCard,grid[1],grid[7]), analysisAIGridCardsForConservative(dealtCard,grid[0],grid[8]),analysisAIGridCardsForConservative(dealtCard,grid[2],grid[6]));break;
				case 5: currValue = max(analysisAIGridCardsForConservative(dealtCard,grid[3],grid[4]), analysisAIGridCardsForConservative(dealtCard,grid[2],grid[8]),0,0);break;
				case 6: currValue = max(analysisAIGridCardsForConservative(dealtCard,grid[7],grid[8]), analysisAIGridCardsForConservative(dealtCard,grid[0],grid[3]), analysisAIGridCardsForConservative(dealtCard,grid[2],grid[4]),0);break;
				case 7: currValue = max(analysisAIGridCardsForConservative(dealtCard,grid[6],grid[8]), analysisAIGridCardsForConservative(dealtCard,grid[1],grid[4]),0,0);break;
				case 8: currValue = max(analysisAIGridCardsForConservative(dealtCard,grid[6],grid[7]), analysisAIGridCardsForConservative(dealtCard,grid[2],grid[5]), analysisAIGridCards(dealtCard,grid[0],grid[4]),0);break;
		
			}
		}

		//test
		//alert("curr:" + i + " currValue:" + currValue);
		//
		value[i] = currValue;
	}
	return value;
	

}

function checkAIGridValueForConservative(dealtCards,grid){
	var valueArr = new Array();
	var value = [0,0,0,0,0,0,0,0,0];
	for(var i=0;i<6;i++){
		if(dealtCards[i].suit != SPECIAL_SUIT){
			value = calAIGridValueForConservative(value,dealtCards[i],grid);
		}
		valueArr.push(value);




		value = [0,0,0,0,0,0,0,0,0];
	}
	return valueArr;
}

function analysisAIGridCardsForConservative(dealtCard,card1,card2){
	return analysisGridCardsForConservative(dealtCard,card1,card2);
}
function analysisGridCardsForConservative(dealtCard,card1,card2){
	var c1 = -1;
	var c2 = -1;
	//for the case of no card inside the grid
	if(!card1)
		c1 = 0;
	if(!card2)
		c2 = 0;
	
	}
	//for dealtCard only
	if(c1 == 0 && c2 == 0){
		//no comparison
		return 1;

	}
	//for one 
	if(c1 == 0){
		if(dealtCard.rank >= 10 && dealtCard.rank <= 12 && card2.rank >= 10 && card2.rank <= 12){ //JQK 
			if(dealtCard.suit == card2.suit && dealtCard.rank != card2.rank){ //JQK Straight Flush
				return 8-6;
			}
			else{
				if(dealtCard.rank - card2.rank >= -2 && dealtCard.rank - card2.rank <= 2 && dealtCard.rank != card2.rank){  //JQK Straight
					return 8-3;
				}
				else if(dealtCard.rank - card2.rank == 0){ //JQK same kind
					return 8-2;
				}
			}
		}
		else{
			
			if(dealtCard.suit == card2.suit){ //not JQK
				if(dealtCard.rank - card2.rank >= -2 && dealtCard.rank - card2.rank <= 2 && dealtCard.rank != card2.rank){ //Straight Flush
					return 8-5;
				}
				else	//Flush
					return 8-4;
			}
			else{
				if(dealtCard.rank - card2.rank >= -2 && dealtCard.rank - card2.rank <= 2 && dealtCard.rank != card2.rank){ //Straight
					return 8-3;
				}
				else if(dealtCard.rank - card2.rank == 0){ //Same kind
					return 8-2;
				}
				else //can't form these kind above
					return 0;
			}
			

		}

	}

	if(c2 == 0){
		if(dealtCard.rank >= 10 && dealtCard.rank <= 12 && card1.rank >= 10 && card1.rank <= 12){ //JQK 
			if(dealtCard.suit == card1.suit && dealtCard.rank != card1.rank){ //JQK Straight Flush
				return 8-6;
			}
			else{
				if(dealtCard.rank - card1.rank >= -2 && dealtCard.rank - card1.rank <= 2 && dealtCard.rank != card1.rank){  //JQK Straight
					return 8-3;
				}
				else if(dealtCard.rank - card1.rank == 0){ //JQK same kind
					return 8-2;
				}
			}
		}
		else{
			if(dealtCard.suit == card1.suit){ //not JQK
				if(dealtCard.rank - card1.rank >= -2 && dealtCard.rank - card1.rank <= 2 && dealtCard.rank != card1.rank){ //Straight Flush
					return 8-5;
				}
				else	//Flush
					return 8-4;
			}
			else{
				if(dealtCard.rank - card1.rank >= -2 && dealtCard.rank - card1.rank <= 2 && dealtCard.rank != card1.rank){ //Straight
					return 8-3;
				}
				else if(dealtCard.rank - card1.rank == 0){ //Same kind
					return 8-2;
				}
				else //can't form these kind above
					return 0;
			}
		

		}

	}
	if(c1 == -1 && c2 == -1){
		//Three cards exists
	if((dealtCard.rank >= 10 && dealtCard.rank <= 12) && (card1.rank >= 10 && card1.rank <= 12) && (card2.rank >= 10 && card2.rank <= 12)){
		if(dealtCard.suit == card1.suit && dealtCard.suit == card2.suit && card1.suit == card2.suit){
			if(dealtCard.rank != card1.rank && dealtCard.rank != card2.rank && card1.rank != card2.rank){ //JQK Straight Flush
				return (8-6)+2;
			}

		}
		else{
			if(dealtCard.rank != card1.rank && dealtCard.rank != card2.rank && card1.rank != card2.rank){ //JQK Straight
				return (8-3)+2;
			}
			else // Same kind
				return (8-2)+2;
		}
	}
	else{ //not JQK
		var cardArr = new Array();
			cardArr.push(dealtCard.rank);
			cardArr.push(card1.rank);
			cardArr.push(card2.rank);
			cardArr.sort();
		if(dealtCard.suit == card1.suit && dealtCard.suit == card2.suit && card1.suit == card2.suit){
			if(cardArr[2] - cardArr[1] == 1 && cardArr[1] - cardArr[0] == 1){ //Straight Flush
				return (8-5)+2;
			}
			else //Flush
				return (8-4)+2;
		}
		else
			if(cardArr[2] - cardArr[1] == 1 && cardArr[1] - cardArr[0] == 1){ //Straight
				return (8-3)+2;
			}
			else if(dealtCard.rank - card1.rank == 0 && dealtCard.rank - card2.rank == 0)//same kind
				return (8-2)+2;
			else //Cant form anything
				return 0;
	}
x
}
/*function conservative()
{
	var found;
	
	for (var i = 0; i < 9; i++){
		if (!ai.grid[i%9]) {										//ai.grid[i] : check whether the grid has card or not 
			var destPos = {pos:i,x:(i%3)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};	
			break;
		}
	}
	
	for (var i = 0; i < 6; i++){
		if (dealtCards[i].suit != SPECIAL_SUIT ){									// normal cards		
			found=i;	
			break;								
		}
	}
	

	for (var i = 0; i < 6; i++){

		if (dealtCards[i].suit==SPECIAL_SUIT && dealtCards[i].rank==0){				//get Joker  
			found=i;
			//alert("Joker");
			return {focusCardIndex:found,destPos:destPos};	
		}
		else if (dealtCards[i].suit==SPECIAL_SUIT && dealtCards[i].rank==2){		//get Torch 
			found=i;
			//alert("Torch");

			do (n = Math.floor(Math.random()*9))
			while(!player.grid[n]);
			
			var destPos = {pos:n,x:(n%3)*105+player.gridPosX,y:Math.floor(n/3)*105+170};
			
			return {focusCardIndex:found,destPos:destPos,burnTarget:"player"};
		}
		else if (dealtCards[i].suit==SPECIAL_SUIT && dealtCards[i].rank==1){
			found=i;
			//alert("Thief");															//get Thief
			do (k = Math.floor(Math.random()*9))
			while(!player.grid[k]);
			var destPos = {pos:k,x:(k%3)*105+player.gridPosX,y:Math.floor(k/3)*105+170};


			do (m = Math.floor(Math.random()*9))
			while(ai.grid[m]);
			var stealToPos = {pos:m,x:(m%3)*105+ai.gridPosX,y:Math.floor(m/3)*105+170};
			alert(stealToPos.pos);

			return {focusCardIndex:found,destPos:destPos,stealToPos:stealToPos};
		}

	}

										//  Pairs,Flush,Straight.If a pattern can't be formed ,then simply pick a card
	for (var i=0;i<9;i++){								
		for (var j=0;j<6;j++){
										// Get for pairs  and three of a kind  
								if ( ai.grid[i]  &&  dealtCards[j].rank==ai.grid[i].rank ){				
									found=j;									
									for (var z=0;z<3;z++){
										if (!ai.grid[z]){
											alert("pairs");
											var destPos = {pos:z,x:(z)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};
											return {focusCardIndex:found,destPos:destPos};	
										}
									}	
								}
				}
	}
										// Get for Flush
	for (var i=0;i<9;i++){								
		for (var j=0;j<6;j++){
								if (ai.grid[i] && dealtCards[j].suit==ai.grid[i].suit ){		
									found=j;												
									for (var z=0;z<3;z++){
										if (!ai.grid[z]){
											alert("flush");
											var destPos = {pos:z,x:(z)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};
											return {focusCardIndex:found,destPos:destPos};	
										}
									}					
								}
			}
		}	
										// Get for Straight
	for (var i=0;i<9;i++){								
		for (var j=0;j<6;j++){
								if ( (ai.grid[i]  &&  ((dealtCards[j].rank-1>ai.grid[i].rank) || (dealtCards[j].rank+1>ai.grid[i].rank) ) )){	 	
									found=j;
									//		if (ai.grid[(i)] && ai.grid [(i+1)%8] && ai.grid[(i+2)%8])
											{
													for (var z=0;z<3;z++){
														if (!ai.grid[z]){
															alert("straight");
															var destPos = {pos:z,x:(z)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};
															return {focusCardIndex:found,destPos:destPos};	
														}
													}
											}	
									}		
			
		}	
	}												//focusCardIndex : the index from the card deck 						
	return {focusCardIndex:found,destPos:destPos};	//destPos : the position of the ai grid 
}
*/

