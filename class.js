// JavaScript Document
function Card(suit,rank){
	this.suit = suit;
	this.rank = rank;
	
	this.drawCard = function(ctx,x,y,factor){ //Draw the card on canvas
		ctx.drawImage(image,90*this.rank,90*this.suit,90,90,Math.floor(x+90*(1-factor)/2),Math.floor(y+90*(1-factor)/2),90*factor,90*factor);
	}
}

function Deck(){
	this.cards = new Array();
	for (i = 0; i < 4; i++)
		for (j = 0; j < 13; j++) this.cards[i*13+j] = new Card(i,j);
	this.length = this.cards.length;
	
	//Shuffle the cards
	for (i = 0; i < 500; i++) {
		var a = Math.floor(Math.random()*this.length);
		var b = Math.floor(Math.random()*this.length);
		var temp = this.cards[a];
		this.cards[a] = this.cards[b];
		this.cards[b] = temp;
	}
	
	this.dealCard = function(){
		if (this.length == 0) return null;
		this.length--;
		return this.cards[this.length];	
	}
}

function PlayingDeck(){
	this.deck = new Deck();
	this.cards = new Array();
	//Add special cards
	for (i = 0; i < 8; i++) this.cards[i] = new Card(4,((Math.floor(i/2) < 3)?Math.floor(i/2):2));
	//Take cards from deck
	for (i = 0; i < 22; i++) this.cards[i+8] = this.deck.dealCard();
	this.length = this.cards.length;
	
	//Shuffle the cards
	for (i = 0; i < 500; i++) {
		var a = Math.floor(Math.random()*(this.length-6));
		var b = Math.floor(Math.random()*(this.length-6));
		var temp = this.cards[a];
		this.cards[a] = this.cards[b];
		this.cards[b] = temp;
	}
	
	this.dealCard = function(){
		if (this.length == 0) return null;
		this.length--;
		return this.cards[this.length];	
	}
}

function Player(name,gridX){
	this.name = name;
	this.gridX = gridX;
	this.grid = new Array();
	this.score = 0;
	
	this.drawContent = function(){ //Draw the player's card
		for (i = 0; i < 9; i++)
			if (this.grid[i]) this.grid[i].drawCard(board,this.gridX+105*(i%3),170+105*Math.floor(i/3),1);
	}
}