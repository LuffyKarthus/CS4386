// JavaScript Document
function Card(suit,rank){
	this.suit = suit;
	this.rank = rank;
	
	this.posX = 0;
	this.posY = 0;
	this.scale = 0;
	
	this.drawCard = function(ctx,x,y){
		ctx.drawImage(image,90*this.rank,90*this.suit,90,90,Math.floor(x+90*(1-this.scale)*0.5),Math.floor(y+90*(1-this.scale)*0.5),90*this.scale,90*this.scale);
	}
}

function Hand(kind,flushSuit,matchPos){
	this.kind = kind
	this.flushSuit = flushSuit;
	this.matchPos = matchPos;
	
	this.scale = 3;
	
	this.drawHand = function(posX){
		if (this.flushSuit >= 0)
			board.drawImage(image,30+30*this.flushSuit,470,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
		if (this.kind == ROYAL_FLUSH)
			board.drawImage(image,0,470,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
		if (this.kind == STRAIGHT_FLUSH)
			board.drawImage(image,210,460,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
		if (this.kind == STRAIGHT)
			board.drawImage(image,210,470,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
		if (this.kind == THREE_OF_A_KIND)
			board.drawImage(image,150,470,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
		if (this.kind == PAIR)
			board.drawImage(image,180,470,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
		
		if (this.scale > 1) this.scale -= 0.1;
	}
}

function Deck(){
	this.cards = new Array();
	for (var i = 0; i < 4; i++)
		for (var j = 0; j < 13; j++) this.cards[i*13+j] = new Card(i,j);
	this.length = this.cards.length;
	
	//Shuffle the cards
	for (var i = 0; i < 1000; i++) {
		var a = Math.floor(Math.random()*this.length);
		var b = Math.floor(Math.random()*this.length);
		var temp = this.cards[a];
		this.cards[a] = this.cards[b];
		this.cards[b] = temp;
	}
	
	//Add special cards
	for (var i = 0; i < 11; i++) {
		do {
			var pos = Math.floor(Math.random()*(this.length-6));
		} while (this.cards[pos].suit == SPECIAL_SUIT);
		
		var rank = CLOWN_RANK;
		if (i > 0) rank = THIEF_RANK;
		if (i > 5) rank = TORCH_RANK;
		this.cards[pos] = new Card(SPECIAL_SUIT,rank);
	}
	
	this.dealCard = function(){
		if (this.length == 0) return null;
		this.length--;
		return this.cards[this.length];	
	}
}

function Player(name,gridPosX){
	this.name = name;
	this.gridPosX = gridPosX;
	this.grid = new Array();
	this.hands = new Array();
	this.noOfCard = 0;
	this.score = 0;
	this.showScore = 0;
	
	this.move = true;
	this.decision = null;
	
	this.getGridStatus = function(flag){
		var status = new Array();
		for (var i = 0; i < 9; i++) {
			if (this.grid[i]) status[i] = flag;
			else status[i] = !flag;
		}
		return status;
	}
	
	this.updateGrid = function(pos,card){
		//Poker or clown
		if (card.suit != SPECIAL_SUIT || card.suit == SPECIAL_SUIT && card.rank == CLOWN_RANK) {
			if (this.grid[pos]) return false;
			card.scale = 1;
			this.grid[pos] = card;
			this.noOfCard++;
			return true;
		}
		//Thief
		if (card.suit == SPECIAL_SUIT && card.rank == THIEF_RANK) {
			if (!this.grid[pos]) return null;
			var returnCard = this.grid[pos];
			returnCard.scale = 1.1;
			this.grid[pos] = null;
			this.noOfCard--;
			return returnCard;
		}
		//Torch
		if (card.suit == SPECIAL_SUIT && card.rank == TORCH_RANK) {
			if (!this.grid[pos]) return false;
			this.grid[pos] = null;
			this.noOfCard--;
			return true;
		}
		
		return false;
	}
	
	this.updateHand = function(){
		var newHands = checkHand(this.grid);
		for (var i = 0; i < 8; i++)
			if (!this.hands[i] || !newHands[i] || this.hands[i].kind != newHands[i].kind) {
				this.hands[i] = newHands[i];
				this.score = getHandsScore(this.hands);
				
				//Show the animation
				if (this.hands[i]) {
					aniFrame = 0;
					aniHighlightHandPos = this.hands[i].matchPos;
					aniShow = setInterval("aniHighlightHand("+this.gridPosX+",aniHighlightHandPos)",60);
					return;
				}
			}
		if (!this.move) this.decision = "end";
	}
	
	this.drawContent = function(){
		if (!aniShow) this.updateHand();
		
		//Draw the play's name and score
		board.fillStyle = "#0077FF";
		board.font = "bold 25px Verdana";
		board.textAlign = "left";
		board.fillText(this.name,this.gridPosX+2,120);
		board.textAlign = "right";
		board.fillText(this.showScore,this.gridPosX+298,120);
		if (this.showScore < this.score) this.showScore += 10;
		if (this.showScore > this.score) this.showScore -= 10;
		//Draw the player's cards
		for (var i = 0; i < 9; i++)
			if (this.grid[i]) this.grid[i].drawCard(board,this.gridPosX+105*(i%3),170+105*Math.floor(i/3));
		//Draw the player's hands
		for (var i = 0; i < 8; i++)
			if (this.hands[i]) this.hands[i].drawHand(this.gridPosX+2+i*38);
	}
}