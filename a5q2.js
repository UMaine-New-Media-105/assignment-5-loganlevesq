let bubbles = [];

function setup() {
  createCanvas(960, 540);
  for (let i = 0; i < 50; i++) {
    let x = random(width);
    let y = random(height);
    let r = random(20, 50);
    bubbles.push(new Bubble(x, y, r));
  }
}

function draw() {
  background(220);
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].move();
    bubbles[i].show();
  }
}

class Bubble {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-5, 5);
  }
  
  move() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    
    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }
    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }
  
  show() {
    push();
    translate(this.x, this.y);
    fill(255, 200);
    ellipse(0, 0, this.r * 2);
    pop();
  }
}
