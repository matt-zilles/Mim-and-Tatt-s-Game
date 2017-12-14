//JS Bubble Game by Tim and Matt

let bubbles = [];
let clockcounter = 20;
let scoreCounter = 0;
let gameState = "title"
var x = 0;
let plat;
let gravity = 0.1;

setInterval(clockTick, 1000);


function setup() { // built-in P5.JS function -=- this runs once
	createCanvas(1000, 750);
for(let i = 0; i < 2; i++) {
	let x = random(width);
	let y = random(height);
	let r = 20;
	let b = new Bubble(x, y, r);
	bubbles.push(b);
	}	
	plat = new Plat();
}

function clockTick () {
	if(clockcounter > 0 && gameState == "ingame")
		clockcounter--;
}

function draw() { // built-in P5.JS function -=-  automatic loop that repeats forever
	background(0); 
	if(gameState=="title"){
		titleScreen();
	}else if(gameState=="lose"){
		loseScreen();
	}else if(gameState=="win"){
		winScreen();
	}
	winOrLose();

	plat.show();
	plat.move();
	
	textSize(32);
	text("Timer: " + clockcounter, 10, 30);
	for(let i = 0; i < bubbles.length; i++){
		if(bubbles[i].contains(mouseX, mouseY)){
			bubbles[i].changeColor(255);
		} else {
			bubbles[i].changeColor(0);
		}
		bubbles[i].move();
		bubbles[i].show();
	}
	textSize(32);
	text("Score: " + scoreCounter, 10, 60)
}

function titleScreen() {
	stroke("white")
	strokeWeight(4);
	fill("black");
	textSize(64);
	text("Start Game", 325, 375)
	text("Click anywhere to play.", 185, 435)
}

class Bubble {
	constructor(_x, _y, _r){
		this.x = _x;
		this.y = _y;
		this.r = _r;
		this.brightness = 0;
		this.yspeed = 0.5;
	}
	
	changeColor(bright){
		this.brightness = bright;
	}
	
	contains(px, py) {
		let d = dist(px, py, this.x, this.y);
		if(d < this.r) {
			return true;
		} else {
			return false;
		}
	}
	
	move(){

		/* this.x = this.x + (0); */
		/* this.y = this.y + (10); */
		if(this.x > width) {
			this.x = 0;
		}
		else if(this.x < 0) {
			this.x = width;
		}
		if(this.y > height) {
			this.y = 0;
			this.yspeed = 0;
			this.x = random(0,750);
			scoreCounter--;
		}
		else if(this.y < 0) {
			this.y = height;
		}

		this.x = this.x + random(-5,5);
		this.yspeed += gravity;
		this.y += this.yspeed;
		
	}
	show(){
		stroke(255);
		strokeWeight(4);
		fill(this.brightness, 100);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}
}

class Plat {
	constructor() {
		this.x = 50;
		this.y = 50;
		this.width = 120;
		this.height = 120;
		this.yspeed = 0.5;
	}
	show() {
		stroke(255);
		strokeWeight(2);
		fill(0,86,183);
		rect(this.x,600,this.width,this.height);
	}
	touchingBubble() {
		for(var i = 0; i < bubbles.length; i++) {
			if(this.contains(bubbles[i].x, bubbles[i].y)) {
				console.log("Touching");
				scoreCounter += 2;
				bubbles[i].yspeed = -10;
				return true;
			}
		}
		return false;
	}
	move() {
		this.touchingBubble();
		if(keyIsDown(LEFT_ARROW)) {
			this.x-=8;
		}
		if(keyIsDown(RIGHT_ARROW)) {
			this.x+=8;
		}
		
	}
	contains(givenX, givenY) {
		if(givenX >= this.x && givenX <= this.x + this.width) {
			if(givenY >= this.y && givenY <= this.y + this.height) {
				return true;
			}
		}
		return false;
	}
}

function mousePressed(){
	gameState="ingame";
}

function winOrLose(){
	if(clockcounter == 0 && scoreCounter > 0){
		gameState ="win";
	}
	else if(scoreCounter <= 0){
		gameState="lose";
	checkSide() {
		if(plat.x > width) {
			plat.x = 0;
		}
	}
}

function winScreen() {
	stroke("white")
	strokeWeight(4);
	fill("black");
	textSize(64);
	text("You Win!", 325, 375)
}

function loseScreen() {
	stroke("white")
	strokeWeight(4);
	fill("black");
	textSize(64);
	text("You Lose. :(", 325, 375)
}
