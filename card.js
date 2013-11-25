// JavaScript Document
map = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function getHandsScore(hands){
	return 0;
}

function checkHand(grid){
	var hands = new Array();
	for (var i = 0; i < map.length; i++) {
		var cards = [grid[map[i][0]],grid[map[i][1]],grid[map[i][2]]];
		
		if (royalFlush(cards)) hands[i] = new Hand(ROYAL_FLUSH,-1);
		else if (straightFlush(cards)) hands[i] = new Hand(STRAIGHT_FLUSH,grid[map[i][0]].suit);
		else if (flush(cards)) hands[i] = new Hand(FLUSH,grid[map[i][0]].suit);
		else if (straight(cards)) hands[i] = new Hand(STRAIGHT,-1);
		else if (threeOfAKind(cards)) hands[i] = new Hand(THREE_OF_A_KIND,-1);
		else if (pair(cards)) hands[i] = new Hand(PAIR,-1);
		else hands[i] = null;
	}
	return hands;
}

function royalFlush(cards){
	return (cards[0] && cards[1] && cards[2] && cards[0].rank > 9 && cards[1].rank > 9 && cards[2].rank > 9 && straightFlush(cards));
}

function straightFlush(cards){
	return (straight(cards) && flush(cards));
}

function flush(cards){
	return (cards[0] && cards[1] && cards[2] && cards[0].suit == cards[1].suit && cards[0].suit == cards[2].suit);
}

function straight(cards){
	if (!cards[0] || !cards[1] || !cards[2]) return false;
	for (var i = 0; i < 2; i++)
		for (var j = 0; j < 2-i; j++)
			if (cards[j].rank < cards[j+1].rank) {
				var temp = cards[j];
				cards[j] = cards[j+1];
				cards[j+1] = temp;
			}
	return (cards[0].rank-cards[1].rank == 1 && cards[1].rank-cards[2].rank == 1);
}

function threeOfAKind(cards){
	return (cards[0] && cards[1] && cards[2] && cards[0].rank == cards[1].rank && cards[0].rank == cards[2].rank);
}

function pair(cards){
	if (cards[0] && cards[1] && cards[0].rank == cards[1].rank) return true;
	if (cards[0] && cards[2] && cards[0].rank == cards[2].rank) return true;
	if (cards[1] && cards[2] && cards[1].rank == cards[2].rank) return true;
	return false;
}