//JS Bubble Game by Tim and Matt

let bubbles = [];
let clockcounter = 20;
let scoreCounter = 5;
let gameState = "title"
var x = 0;
var bub = new Audio ("dustyroom_cartoon_bubble_pop.mp3");
let plat;
let gravity = 0.1;
let basket;

setInterval(clockTick, 1000);


function preload() {
	basket = loadImage("https://cdn.glitch.com/28c0b545-c5a4-4e7b-9428-9f54da2789af%2F7.png?1513621463375");
var bub = new Audio ("dustyroom_cartoon_bubble_pop.mp3");

setInterval(clockTick, 1000);

function preload() {
	basket = loadImage("https://cdn.glitch.com/28c0b545-c5a4-4e7b-9428-9f54da2789af%2F7.png?1513621463375");
}
function preLoad(){
	sound = loadSound('dustyroom_cartoon_bubble_pop.mp3');
}


function setup() { // built-in P5.JS function -=- this runs once
	createCanvas(1000, 750);
for(let i = 0; i < 5; i++) {
	let x = random(width);
	let y = 0;
	let r = 20;
	let b = new Bubble(x, y, r);
	bubbles.push(b);
	}	
	plat = new Plat();
}

function clockTick () {
	if(clockcounter > 0 && gameState == "ingame") {
		clockcounter--;
		let x = random(width);
		let y = 0;
		let r = 20;
		let b = new Bubble(x, y, r);
		bubbles.push(b);
	}
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
	plat.checkSide();
	
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
		
		if(gameState == "ingame")
		{
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
		this.x = width/2;
		this.y = 720;
		this.width = 120;
		this.height = 120;
		this.yspeed = 0.5;
	}
	show() {
		stroke(255);
		strokeWeight(2);
		fill(0,86,183);
		rect(this.x,this.y,this.width,this.height);
	}
	touchingBubble() {
		for(var i = bubbles.length-1; i >= 0; i--) {
			if(this.contains(bubbles[i].x, bubbles[i].y)) {
				console.log("Touching");
				scoreCounter += 2;
				bubbles.splice(i,1);
				bub.play();
				return true;
			}
		}
		return false;
	}
	move() {
		if(gameState == "ingame")
		{
			this.touchingBubble();
			if(keyIsDown(LEFT_ARROW)) {
				this.x-=8;
			}
			if(keyIsDown(RIGHT_ARROW)) {
				this.x+=8;
			}
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
	checkSide() {
		if(plat.x > width) {
			plat.x = 0;
		}
		if(plat.x < 0) {
			plat.x = 1000;
		}
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
	}
}

function winScreen() {
	stroke("white");
	strokeWeight(4);
	fill("black");
	textSize(64);
	text("You Win!", 325, 375);
}

function loseScreen() {
	stroke("white");
	strokeWeight(4);
	fill("black");
	textSize(64);
	text("You Lose. :(", 325, 375);

}