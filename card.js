// JavaScript Document
map = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];

function getHandsScore(hands){
	var score = 0;
	for (var i = 0; i < 8; i++)
		if (hands[i] && hands[i].kind == ROYAL_FLUSH) score += 1000;
		else if (hands[i] && hands[i].kind == STRAIGHT_FLUSH) score += 700;
		else if (hands[i] && hands[i].kind == FLUSH) score += 500;
		else if (hands[i] && hands[i].kind == STRAIGHT) score += 300;
		else if (hands[i] && hands[i].kind == THREE_OF_A_KIND) score += 150;
		else if (hands[i] && hands[i].kind == PAIR) score += 50;
	return score;
}

function checkHand(grid){
	var hands = new Array();
	for (var i = 0; i < map.length; i++) {
		var cards = [grid[map[i][0]],grid[map[i][1]],grid[map[i][2]]];
		var pairs = getPair(cards);
		
		if (royalFlush(cards))
			hands[i] = new Hand(ROYAL_FLUSH,-1,map[i]);
		else if (straightFlush(cards))
			hands[i] = new Hand(STRAIGHT_FLUSH,isClown(grid[map[i][0]])?(isClown(grid[map[i][1]])?grid[map[i][2]].suit:grid[map[i][1]].suit):grid[map[i][0]].suit,map[i]);
		else if (flush(cards))
			hands[i] = new Hand(FLUSH,isClown(grid[map[i][0]])?(isClown(grid[map[i][1]])?grid[map[i][2]].suit:grid[map[i][1]].suit):grid[map[i][0]].suit,map[i]);
		else if (straight(cards))
			hands[i] = new Hand(STRAIGHT,-1,map[i]);
		else if (threeOfAKind(cards))
			hands[i] = new Hand(THREE_OF_A_KIND,-1,map[i]);
		else if (pairs)
			hands[i] = new Hand(PAIR,-1,[map[i][pairs[0]],map[i][pairs[1]]]);
		else hands[i] = null;
	}
	return hands;
}

function isClown(card){
	return (card && card.suit == SPECIAL_SUIT && card.rank == CLOWN_RANK);
}

function royalFlush(cards){
	return (cards[0] && cards[1] && cards[2] && (cards[0].rank > 9 || isClown(cards[0])) && (cards[1].rank > 9 || isClown(cards[1])) && (cards[2].rank > 9 || isClown(cards[2])) && straightFlush(cards));
}

function straightFlush(cards){
	return (straight(cards) && flush(cards));
}

function flush(cards){
	return (cards[0] && cards[1] && cards[2] && (cards[0].suit == cards[1].suit || isClown(cards[0]) || isClown(cards[1])) && (cards[0].suit == cards[2].suit || isClown(cards[0]) || isClown(cards[2])));
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
	return (cards[0].rank-cards[1].rank == 1 && cards[1].rank-cards[2].rank == 1 || (cards[0].rank-cards[1].rank == 1 || cards[0].rank-cards[1].rank == 2) && isClown(cards[2]));
}

function threeOfAKind(cards){
	return (cards[0] && cards[1] && cards[2] && (cards[0].rank == cards[1].rank || isClown(cards[0]) || isClown(cards[1])) && (cards[0].rank == cards[2].rank || isClown(cards[1]) || isClown(cards[2])));
}

function getPair(cards){
	if (cards[0] && cards[1] && (cards[0].rank == cards[1].rank || isClown(cards[0]) || isClown(cards[1]))) return [0,1];
	if (cards[0] && cards[2] && (cards[0].rank == cards[2].rank || isClown(cards[0]) || isClown(cards[2]))) return [0,2];
	if (cards[1] && cards[2] && (cards[1].rank == cards[2].rank || isClown(cards[1]) || isClown(cards[2]))) return [1,2];
	return null;
}