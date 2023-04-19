// Define the canvas size
const canvasWidth = 800;
const canvasHeight = 600;

// Define the particles, breeders, and catchers arrays
let particles = [];
let breeders = [];
let catchers = [];

function setup() {
  // Create the canvas
  createCanvas(canvasWidth, canvasHeight);

  // Create the particles
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(random(width), random(height)));
  }

  // Create the breeders
  for (let i = 0; i < 5; i++) {
    breeders.push(new Breeder(random(0, width / 2), random(height)));
  }

  // Create the catchers
  for (let i = 0; i < 5; i++) {
    catchers.push(new Catcher(random(width / 2, width), random(height)));
  }
}

function draw() {
  // Set the background color
  background(0);

  // Update and display the particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }

  // Update and display the breeders
  for (let i = 0; i < breeders.length; i++) {
    breeders[i].update();
    breeders[i].display();

    // Check for collisions with catchers
    for (let j = 0; j < catchers.length; j++) {
      if (breeders[i].collidesWith(catchers[j])) {
        // Remove the breeder from the array
        breeders.splice(i, 1);
      }
    }
  }

  // Update and display the catchers
  for (let i = 0; i < catchers.length; i++) {
    catchers[i].update();
    catchers[i].display();
  }
}

// Define the Particle class
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(5, 20);
    this.color = color(random(255), random(255), random(255), 100);
  }

  update() {
    // Jitter the particle
    this.x += random(-1, 1);
    this.y += random(-1, 1);
  }

  display() {
    // Draw the particle
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}

// Define the Breeder class
class Breeder {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-5, 5);
    this.color = color(255, 0, 0, 100);
  }

  update() {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }

    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }

    // Check for collisions with other breeders
    for (let i = 0; i < breeders.length; i++) {
      if (breeders[i] !== this && this.collidesWith(breeders[i])) {
        // Create a new breeder
        // breeders.push(new Breeder(random(0, width/2), random(height)));
      }
    }
  }

  display() {
    // Draw the breeder
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }

  collidesWith(other) {
    // Check if this breeder collides with another object
    let d = dist(this.x, this.y, other.x, other.y);
    return d < this.size / 2 + other.size / 2;
  }
}

// Define the Catcher class
class Catcher {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.xSpeed = random(-5, 5);
    this.ySpeed = random(-5, 5);
    this.color = color(0, 0, 255, 100);
  }

  update() {
    // Move the catcher to the left
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    if (this.x < 0 || this.x > width) {
      this.xSpeed *= -1;
    }

    if (this.y < 0 || this.y > height) {
      this.ySpeed *= -1;
    }
  }

  display() {
    // Draw the catcher
    noStroke();
    fill(this.color);
    ellipse(this.x, this.y, this.size);
  }
}
