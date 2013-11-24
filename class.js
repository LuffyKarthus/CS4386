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

function Hand(kind,flushSuit,pairs){
	this.kind = kind
	this.flushSuit = flushSuit;
	this.pairs = pairs;
	
	this.scale = 0;
	
	this.drawHand = function(posX){
		if (this.flushSuit >= 0) board.drawImage(image,30+30*this.flushSuit,470,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
		if (this.kind == 6) board.drawImage(image,0,470,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
		if (this.kind == 5) board.drawImage(image,210,460,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
		if (this.kind == 3) board.drawImage(image,210,470,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
		if (this.kind == 2) board.drawImage(image,150,470,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
		if (this.kind == 1) board.drawImage(image,180,470,30,30,Math.floor(posX+30*(1-this.scale)*0.5),Math.floor(135+30*(1-this.scale)*0.5),30*this.scale,30*this.scale);
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
	for (var i = 0; i < 12; i++) {
		do {
			var pos = Math.floor(Math.random()*(this.length-6));
		} while (this.cards[pos].suit == 4);
		
		var rank = 0; //Clown
		if (i > 2) rank = 1; //Thief
		if (i > 5) rank = 2; //Torch
		this.cards[pos] = new Card(4,rank);
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
		playerTurn = !playerTurn;
		this.move = false;
		//Poker
		if (card.suit <= 3) {
			if (this.grid[pos]) return false;
			card.scale = 1;
			this.grid[pos] = card;
			this.noOfCard++;
			this.updateHand();
			return true;
		}
		
		//Torch
		if (card.suit == 4 && card.rank == 2) {
			if (!this.grid[pos]) return false;
			this.grid[pos] = null;
			this.noOfCard--;
			this.updateHand();
			return true;
		}
		
		return false;
	}
	
	this.updateHand = function(){
		var newHands = checkHand(this.grid);
		for (var i = 0; i < 8; i++)
			if (!this.hands[i] || !newHands[i] || this.hands[i].kind != newHands[i].kind) this.hands[i] = newHands[i];
		
		this.score = getHandsScore(this.hands);
	}
	
	this.drawContent = function(){
		//Draw the play's name and score
		board.fillStyle = "#0077FF";
		board.font = "bold 25px Verdana";
		board.textAlign = "left";
		board.fillText(this.name,this.gridPosX+2,120);
		board.textAlign = "right";
		board.fillText(this.score,this.gridPosX+298,120);
		//Draw the player's hands
		for (var i = 0; i < 8; i++)
			if (this.hands[i]) {
				this.hands[i].drawHand(this.gridPosX+2+i*38);
				if (this.hands[i].scale < 1) this.hands[i].scale += 0.1;
			}
		//Draw the player's cards
		for (var i = 0; i < 9; i++)
			if (this.grid[i]) this.grid[i].drawCard(board,this.gridPosX+105*(i%3),170+105*Math.floor(i/3));
	}
}