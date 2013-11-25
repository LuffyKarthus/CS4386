// JavaScript Document/Users/karthus/Desktop/CS4386/ai.js
function aiAction(){
	return random();
	//For refecing
	/*for (var i = 0; i < 6; i++)

		//suit 0 - 3 => spade heart diamond club
		//suit 4 => special card

		if (dealtCards[i].suit <= 3) {
			var choose = i;
			break;
		}
	for (var i = 0; i < 9; i++)

		//ai.grid[i] : check whetther the grid has card or not 
		if (!ai.grid[i]) {
			var destPos = {pos:i,x:(i%3)*105+ai.gridPosX,y:Math.floor(i/3)*105+170};
			break;
		}
	
	//focusCardIndex : the index from the card deck 
	//destPos : the position of the ai grid 
	return {focusCardIndex:choose,destPos:destPos};*/
}
function aggressive(){


}
function targetOriented(){

}
function conservative(){

}
function random(){
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
		}while(randNum == 10);
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