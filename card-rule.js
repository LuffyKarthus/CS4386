// JavaScript Document
function checkMatch(grid){
	if (royalFlush([grid[0],grid[1],grid[2]]))...
	
	return matches;	//array[8]
}
//e.g.
//[0] = "RoyalFlush"
//[1] = null
//[2] = null
//[3] = "Straight"
//......

function royalFlush(cards)				// +600 points	highest value of straightFlush() JQK 

{

	if (StraightFlush()==true && JQK==true)	// JQK pass an array for checking

	return true;	

	return false;

}



function straightFlush(cards)		//Done		//+250 points
{
	if (straight(cards) == true && flush(cards)==true)
		return true;
	else
		return false;

}





function straight(cards)				//+150 points	123,234,456,	Check Sorting 	
{
	sort(cards);
	if (cards[2].num - cards[1].num == 1 && cards[1].num - cards[0].num == 1)
		return true;
	else
		return false;

}





function flush(cards)				//+100 points	Suits-Diamond,Club,Heart,Spade	Check

{

	//if ( player.grid[i].card.suit==[0] &&  player.grid[i+1].card.suit==[0] &&  player.grid[i+1].card.suit==[0] )
	if(cards[0].suit == cards[1].suit && cards[1].suit == cards[2].suit)
		return true;
	else
		return false;

}





function pairs(cards)				//+50 points	A pair		

{

	if ()

	return true;

	return false;

}



function threeOfAKind(cards)			//+100 points	three cards of the same value

{
	
	if (player.grid[i].card.rank==player.grid[i+1].card.rank==player.grid[i+2].card.rank)	// checking needed to be modified

	return true;

	return false;

}

function updateMatch(grid)

{

	var i=0;

	while(i<8) {		

		// Call functions to check if the match[i] takes place		

		if (royalFlush())				

			return match[i];

		if (straightFlush())

			return match[i];

		if (straight())

			match[i];

		if(flush())

			match[i];

		if (pairs())

			match[i];

		if(threeOfAKind())

			match[i];

		i++;

	}

}








