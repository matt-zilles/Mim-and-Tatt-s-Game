let bubbles = [];
let clockcounter = 20;
let gameState = "title"

setInterval(clockTick, 1000);


function setup() { // built-in P5.JS function -=- this runs once
	createCanvas(600, 400);
for(let i = 0; i < random(10,25); i++) {
	let x = random(width);
	let y = random(height);
	let r = 20;
	let b = new Bubble(x, y, r);
	bubbles.push(b);
	}	
}

function clockTick () {
	if(clockcounter > 0)
		clockcounter--;
}

function mousePressed() {
	for(let i = bubbles.length-1; i >= 0; i--){
		if(bubbles[i].contains(mouseX, mouseY)) {
			bubbles.splice(i,1);
		}
	}
}

function draw() { // built-in P5.JS function -=-  automatic loop that repeats forever
	background(0); 
	
	if(gameState=="title"){
		titleScreen();
	}else if(gameState=="lose"){
		showLossScreen();
	}else if(gameState=="win"){
		showLossScreen();
	}
	
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
}

function titleScreen() {
	stroke("white")
	strokeWeight(4);
	fill("black");
	textSize(64);
	text("Start Game", 150, 200)
}

class Bubble {
	constructor(_x, _y, _r){
		this.x = _x;
		this.y = _y;
		this.r = _r;
		this.brightness = 0;
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
		this.x = this.x + random(-5,5);
		this.y = this.y + random(-5,5);
		
		/* this.yVelocity+=.006;
		this.y = this.y + this.yVelocity;
		if(this.y > height - this.radius*.7) {
			this.yVelocity = this.yVelocity * -1;
		}  */
	}
	show(){
		stroke(255);
		strokeWeight(4);
		fill(this.brightness, 100);
		ellipse(this.x, this.y, this.r*2, this.r*2);
	}
}