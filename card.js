// JavaScript Document
map = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function checkHand(grid){
	var hands = new Array();
	for (var i = 0; i < map.length; i++) {
		if (royalFlush([grid[map[i][0]],grid[map[i][1]],grid[map[i][2]]])) hands[i] = new Hand(6,-1);
		else if (straightFlush([grid[map[i][0]],grid[map[i][1]],grid[map[i][2]]])) hands[i] = new Hand(5,grid[map[i][0]].suit);
		else if (flush([grid[map[i][0]],grid[map[i][1]],grid[map[i][2]]])) hands[i] = new Hand(4,grid[map[i][0]].suit);
		else if (straight([grid[map[i][0]],grid[map[i][1]],grid[map[i][2]]])) hands[i] = new Hand(3,-1);
		else if (threeOfAKind([grid[map[i][0]],grid[map[i][1]],grid[map[i][2]]])) hands[i] = new Hand(2,-1);
		else if (pair([grid[map[i][0]],grid[map[i][1]],grid[map[i][2]]])) hands[i] = new Hand(1,-1);
		else hands[i] = null;
	}
	return hands;
}

function royalFlush(cards){
	return ((cards[0].rank > 9) && (cards[1].rank > 9) && (cards[2].rank > 9) && straight(cards) && flush(cards));
}

function straightFlush(cards){
	return (straight(cards) && flush(cards));
}

function flush(cards){
	return (cards[0].suit == cards[1].suit && cards[0].suit == cards[2].suit);
}

function straight(cards){
	for (var i = 0; i < 2; i++)
		for (var j = 0; j < 2-i; j++)
			if (cards[i].rank > cards[i+1]) {
				var temp = this.cards[a];
				this.cards[a] = this.cards[b];
				this.cards[b] = temp;
			}
	return (cards[2].rank-cards[1].rank == 1 && cards[1].rank-cards[0].rank == 1);
}

function threeOfAKind(cards){
	return (cards[0].rank == cards[1].rank && cards[0].rank == cards[2].rank);
}

function pair(cards){
	return (cards[0].rank == cards[1].rank || cards[0].rank == cards[2].rank || cards[1].rank == cards[2].rank);
}