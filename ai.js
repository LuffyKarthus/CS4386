// JavaScript Document/Users/karthus/Desktop/CS4386/ai.js

/* Eric

Plz follow the return format of aiAction().

1. focusCardIndex:

2. destPos: {pos:__,x:(__%3)*105+ai.gridPosX,y:Math.floor(__/3)*105+170}  !!!!!!! player.gridPosX if burn player's card

3. if AI steal a card from player, plz also provide
		stealToPos: {pos:__,x:(__%3)*105+player.gridPosX,y:Math.floor(__/3)*105+170}

4. plz provide the burn target if use burn
		burnTarget:

5. if AI use clown, plz provide the suit and the rank
		suit:
		rank:
*/
function aiAction(){
	toReturn = conservative();
	console.log(toReturn.destPos.pos+" "+toReturn.focusCardIndex);
	return toReturn;
}
	//return targetOriented();
	//For refecing
	//suit 0 - 3 => spade heart diamond club
	//suit 4 => special card

function conservative()
{
	var found;
	
	for (var i = 0; i < 9; i++){
		if (!ai.grid[i%8]) {										//ai.grid[i] : check whether the grid has card or not 
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
									//	if (ai.grid [(i+1)%8] && ai.grid[(i+2)%8]){ 		
										/*
										for(var k=0;k<8;k++)
										{
											if (!ai.grid[k])
												ai.grid[k];
										}
										*/
												for (var z=0;z<3;z++){
													if (!ai.grid[z]){
													//	alert("pairs");
														var destPos = {pos:z,x:(z)*105+ai.gridPosX,y:Math.floor(i%3)*105+170};
														return {focusCardIndex:found,destPos:destPos};	
													}
												}
									//	}	
								}
				}
	}
										// Get for Flush
	for (var i=0;i<9;i++){								
		for (var j=0;j<6;j++){
								if (ai.grid[i] && dealtCards[j].suit==ai.grid[i].suit ){		
									found=j;
							//			if (ai.grid[(i)] && ai.grid [(i+1)%8] && ai.grid[(i+2)%8])
										{												
												for (var z=0;z<3;z++){
													if (!ai.grid[z]){
													//	alert("flush");
														var destPos = {pos:z,x:(z)*105+ai.gridPosX,y:Math.floor(i%3)*105+170};
														return {focusCardIndex:found,destPos:destPos};	
													}
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
														//	alert("straight");
															var destPos = {pos:z,x:(z)*105+ai.gridPosX,y:Math.floor(i%3)*105+170};
															return {focusCardIndex:found,destPos:destPos};	
														}
													}
											}	
									}		
			
		}	
	}												//focusCardIndex : the index from the card deck 
	//alert("random");						
	return {focusCardIndex:found,destPos:destPos};	//destPos : the position of the ai grid 
}
	

/*
function aggressive(){
	//thoughts by jimmyshum:
	//ai player would not only be target-oriented, it would also think about the player grid for raising the probability of winning the game

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
		alert("choose-0: " +choose);


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
		var valueArr = checkValue(dealtCards,ai.grid);
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
			if(valueArr[choose][i] == highest){
				prior.push(i);
			}
		}
		var p = prior[Math.floor(Math.random()*prior.length)];
		if(!ai.grid[p]){
			destPos = {pos:p,x:(p%3)*105+ai.gridPosX,y:Math.floor(p/3)*105+170};
		}
		prior = new Array();

		//test
		alert("choose: " + choose + "  destPos: " + p );


		return {focusCardIndex:choose,destPos:destPos};





	}
	return random();

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
function analysisCards(dealtCard,card1,card2){
	var c1 = -1;
	var c2 = -1;
	//for the case of no card inside the grid
	if(!card1)
		c1 = 0;
	if(!card2)
		c2 = 0;

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


	//Three cards exists

	if((dealtCard.rank >= 10 && dealtCard.rank <= 12) && (card1.rank >= 10 && card1.rank <= 12) && (card2.rank >= 10 && card2.rank <= 12)){
		if(dealtCard.suit == card1.suit && dealtCard.suit == card2.suit && card1.suit == card2.suit){
			if(dealtCard.rank != card1.rank && dealtCard.rank != card2.rank && card1.rank != card2.rank){ //JQK Straight Flush
				return 6;
			}

		}
		else{
			if(dealtCard.rank != card1.rank && dealtCard.rank != card2.rank && card1.rank != card2.rank){ //JQK Straight
				return 3;
			}
			else // Same kind
				return 2;
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
				return 5;
			}
			else //Flush
				return 4;
		}
		else
			if(cardArr[2] - cardArr[1] == 1 && cardArr[1] - cardArr[0] == 1){ //Straight
				return 3;
			}
			else if(dealtCard.rank - card1.rank == 0 && dealtCard.rank - card2.rank == 0)//same kind
				return 2;
			else //Cant form anything
				return 0;
	}
	return 0;




}
function calValue(value,dealtCard,grid){
	var currValue = -1;
	for(var i=0;i<9;i++){


		if(!grid[i]){
			switch(i){
				case 0: currValue = max(analysisCards(dealtCard,grid[1],grid[2]), analysisCards(dealtCard,grid[3],grid[6]), analysisCards(dealtCard,grid[4],grid[8]),0);break;
				case 1: currValue = max(analysisCards(dealtCard,grid[0],grid[2]), analysisCards(dealtCard,grid[4],grid[7]),0,0);break;
				case 2: currValue = max(analysisCards(dealtCard,grid[0],grid[1]), analysisCards(dealtCard,grid[5],grid[8]), analysisCards(dealtCard,grid[4],grid[6]),0);break;
				case 3: currValue = max(analysisCards(dealtCard,grid[4],grid[5]), analysisCards(dealtCard,grid[0],grid[6]),0,0);break;
				case 4: currValue = max(analysisCards(dealtCard,grid[3],grid[5]), analysisCards(dealtCard,grid[1],grid[7]), analysisCards(dealtCard,grid[0],grid[8]),analysisCards(dealtCard,grid[2],grid[6]));break;
				case 5: currValue = max(analysisCards(dealtCard,grid[3],grid[4]), analysisCards(dealtCard,grid[2],grid[8]),0,0);break;
				case 6: currValue = max(analysisCards(dealtCard,grid[7],grid[8]), analysisCards(dealtCard,grid[0],grid[3]), analysisCards(dealtCard,grid[2],grid[4]),0);break;
				case 7: currValue = max(analysisCards(dealtCard,grid[6],grid[8]), analysisCards(dealtCard,grid[1],grid[4]),0,0);break;
				case 8: currValue = max(analysisCards(dealtCard,grid[6],grid[7]), analysisCards(dealtCard,grid[2],grid[5]), analysisCards(dealtCard,grid[0],grid[4]),0);break;
		
			}
		}

		//test
		//alert("curr:" + i + " currValue:" + currValue);
		//
		value[i] = currValue;
	}
	return value;
	

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
function checkValue(dealtCards,grid){
	var valueArr = new Array();
	var value = [0,0,0,0,0,0,0,0,0];
	for(var i=0;i<6;i++){
		if(dealtCards[i].suit != SPECIAL_SUIT){
			value = calValue(value,dealtCards[i],grid);
		}
		valueArr.push(value);


		//test
		/*
		var temp = "";
		for(var j=0;j<9;j++){
			temp = temp + value[i] + " ";
		}
		alert(i+ ":  " + temp);
		//
		
		value = [0,0,0,0,0,0,0,0,0];
	}
	return valueArr;
}
*/
