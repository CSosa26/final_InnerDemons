let p1, p2; 
let bl = true;

function setup() {
  createCanvas(1200, 600);
  rectMode(CENTER);
  frameRate(30); 

  // fighter(health, punch, moveX, playerNum)
  p1 = new fighter(100, 25, 10, 1); 
  p2 = new fighter(100, 25, 10, 2); 
}

function draw() {
  background(220);

  // Experiment (When player blocks, don't move)
  // if(!bl){
    //move
    //else don't move
  // }

  //Player Moves
  p1.move();
  p2.move();

  //Player attacks
  p1.attack(p2.plPosition());
  p2.attack(p1.plPosition());

}

//Creates character stats
class fighter  {
  constructor(health, punch, moveX, playerNum){
    this.health = health;
    this.punch = punch; 
    this.block = false;
    this.moveX = moveX;
    // this.moveY = 500;
    this.jump = false; 
    this.jumpingSpeed = 5;
    this.jmpUP = true;
    this.playerNum = playerNum; 


    //Defines the starting players position
    if(this.playerNum === 1){
      this.x = 200;
      this.y = 500;
    } else if(this.playerNum === 2){
      this.x = 800; 
      this.y = 500;
    } 

    // defines the controls based on the player
    if(this.playerNum === 1){
      this.control = {
        up: 87, // W
        down: 83, // S
        left: 65, // A
        right: 68,  // D
        punch: 84 //T
      }
      // this.ctrUp = 87;
      // this.ctrDown = 83;
      // this.ctrlLef = 65;
      // this.ctrRight = 68;

    } else if(this.playerNum === 2){
      this.control = {
        up: 38, // Arrow UP 
        down: 40, // Arrow Down
        left: 37, // Arrow Left
        right: 39, // Arrow Right
        punch: 13 // KEY \ 
      }
      // this.ctrUp = 38;
      // this.ctrDown = 40;
      // this.ctrlLef = 37;
      // this.ctrRight = 39;
    }
  }
  
  //Returns the players X position on the screen
  plPosition() {
    let x = this.x; 
    return x;
  }

  // Movement Controls
  move() {
    // Movements: left, rigth, and jump
    if(keyIsDown(this.control.left) && this.x > 50){
      this.x -= this.moveX;
    } else if(keyIsDown(this.control.right) && this.x < width - 50){
      this.x += this.moveX;
    } else if(keyIsDown(this.control.up) && !this.jump) {
      this.jump = true;
      this.jumpingSpeed = -300; 
    } 

    // Movement: down
    if(keyIsDown(this.control.down)) {
      this.y = 600;
    } else { 
      this.y = 500;
    }

    // Jump Mech.
    if (this.jump) {
      this.y += this.jumpingSpeed;
      this.jumpingSpeed += 9.1; // Gravity effect

      // Check if player landed
      if (this.y >= 500) {
        this.y = 500;
        this.jump = false;
        this.jumpingSpeed = 0;
      }
    }

    // Updates the visual drawing
    rect(this.x, this.y, 100, 200);
  }

  // Creates the players attack hitbox
  attack(pos) {
    if(keyIsDown(this.control.punch)) {
      fill(255);
      if(pos > this.x){
        rect(this.x + 100, this.y, 100, 25);  
      } else if(pos < this.x){
        rect(this.x - 100, this.y, 100, 25);  
      } else {
        console.log('No position'); 
      }
    }
  }

  // Experiment (attack for only a couple of frames)
  // stopPunch(){
    
  // }

  //Experiment (block function)
  block(){
    // if(keyIsDown(this.control.block)){
    //   fill('blue');
    // } else
  }
}
