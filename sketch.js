let p1, p2;
let bl = true;

let MAXHEALTH = 100;
let PUNCHDAMAGE = 5;
let MOVESPEED = 10;

function preload() {
P1HealthImg = loadImage("images/Health/P1Health.png");
P2HealthImg = loadImage("images/Health/P2Health.png");
BoarderImg = loadImage("images/Health/BoarderHealth.png");
}

function setup() {
  createCanvas(1200, 600);
  rectMode(CENTER);
  frameRate(30);

  // fighter(health, punch, moveX, playerNum)
  p1 = new fighter(MAXHEALTH, PUNCHDAMAGE, MOVESPEED, 1);
  p2 = new fighter(MAXHEALTH, PUNCHDAMAGE, MOVESPEED, 2);
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
  if (p1.attack(p2.plPosition()) && !p2.playerBlock) {
    p2.takeDamage();
  }
  if (p2.attack(p1.plPosition()))
    p1.takeDamage();



  //Player Health
  P1Health();
  P2Health();
}


//Player 1 Health Bar
function P1Health() {
  //P1
  image(P1HealthImg, -10, 8, 515, 75);
  rectMode(CORNER);
  strokeWeight(0);
  fill(255, 0, 0);
  let healthWidth = map(p1.getHealth(), 0, MAXHEALTH, 0, 470);
  rect(15, 15, healthWidth, 32);

  strokeWeight(4);
  noFill();
  rectMode(CENTER);
  image(BoarderImg, -5, 10, 510, 40);
}

//Player 2 Health Bar
function P2Health() {
  //P2
  image(P2HealthImg, 690, 8, 515, 75);
  rectMode(CORNER);
  strokeWeight(0);
  fill(3, 44, 252);
  let healthWidth = map(p2.getHealth(), 0, MAXHEALTH, 0, -470);
  rect(1180, 15, healthWidth, 32);

  stroke(0);
  strokeWeight(4);
  noFill();
  rectMode(CENTER);
image(BoarderImg, 690, 10, 510, 40);
}


//Creates character stats
class fighter {
  constructor(health, punch, moveX, playerNum) {
    this.health = health;
    this.punch = punch;
    this.block = false;
    this.moveX = moveX;
    // this.moveY = 500;
    this.jump = false;
    this.jumpingSpeed = 5;
    this.jmpUP = true;
    this.playerNum = playerNum;
    this.atkCooldown = true;
    this.playerBlock = false;

    //Defines the starting players position
    if (this.playerNum === 1) {
      this.x = 200;
      this.y = 500;
    } else if (this.playerNum === 2) {
      this.x = 800;
      this.y = 500;
    }

    // defines the controls based on the player
    if (this.playerNum === 1) {
      this.control = {
        up: 87, // W
        down: 83, // S
        left: 65, // A
        right: 68, // D
        punch: 84, //T
        block: 89 // Y
      };
      // this.ctrUp = 87;
      // this.ctrDown = 83;
      // this.ctrlLef = 65;
      // this.ctrRight = 68;
    } else if (this.playerNum === 2) {
      this.control = {
        up: 38, // Arrow UP
        down: 40, // Arrow Down
        left: 37, // Arrow Left
        right: 39, // Arrow Right
        punch: 221, // KEY ]
        block: 220 // KEY \
      };
      // this.ctrUp = 38;
      // this.ctrDown = 40;
      // this.ctrlLef = 37;
      // this.ctrRight = 39;
    }
  }

  //Returns the players X position on the screen
  plPosition() {
    let x = this.x;
    let y = this.y;
    return [x,y];
  }

  // Movement Controls
  move() {

    // Player
    if(keyIsDown(this.control.block)) {
      this.playerBlock = true;
    } else {
      this.playerBlock = false;
    }


    // Movements: left, rigth, and jump
    if (keyIsDown(this.control.left) && this.x > 50 && !this.playerBlock) {
      this.x -= this.moveX;
    } else if (keyIsDown(this.control.right) && this.x < width - 50 && !this.playerBlock) {
      this.x += this.moveX;
    } else if (keyIsDown(this.control.up) && !this.jump && !this.playerBlock) {
      this.jump = true;
      this.jumpingSpeed = -300;
    }

    // Movement: down
    if (keyIsDown(this.control.down)) {
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
  // Returns the hitbox
  attack(pos) {
    let connected = false;
    if (keyIsDown(this.control.punch) && this.atkCooldown) {
      rectMode(CORNER);
      fill(0);
      if (pos[0] > this.x) {
        rect(this.x - 50, this.y, 200, 25);
        connected = this.hitboxTest(pos, 1);
      } else if (pos[0] < this.x) {
        rect(this.x + 50, this.y, -200, 25);
        connected = this.hitboxTest(pos, 2);
      } else {
        console.log("No position");
      }

      this.atkCooldown = false; 
    }
    rectMode(CENTER);
    return connected;
  }
//Grabs player health
  getHealth() {
    return this.health;
  }
//Takes damage
  takeDamage() {
    this.health -= this.punch;
    if (this.health <= 0)
      this.health = 0;
  }

//checks player pos hitbox and player pos attack hitbox
//when overlaped, it because true.
//ellipse shows where the overlap happends
  hitboxTest(pos, number) {
    if (number == 1) {
      ellipse(this.x + 50, this.y, 5,5);

      if (this.x + 50 >= pos[0] - 50 &&
        this.y <= pos[1] + 100 &&
        this.y >= pos[1] - 100
      )
      return true;

      ellipse(this.x + 50, this.y + 25, 5,5);

      if (this.x + 50 >= pos[0] - 50 &&
        this.y + 25 <= pos[1] + 100 &&
        this.y + 25 >= pos[1] - 100
      )
      return true;

      ellipse(this.x + 150, this.y, 5,5);

      if (this.x + 150 >= pos[0] - 50 &&
        this.y <= pos[1] + 100 &&
        this.y >= pos[1] - 100
      )
      return true;
      
      ellipse(this.x + 150, this.y + 25, 5,5);

      if (this.x + 150 >= pos[0] - 50 &&
        this.y + 25 <= pos[1] + 100 &&
        this.y + 25 >= pos[1] - 100
      )
      return true;
    }
    else {
      ellipse(this.x - 50, this.y, 5,5);

      if (this.x - 50 <= pos[0] + 50 &&
        this.y <= pos[1] + 100 &&
        this.y >= pos[1] - 100
      )

      return true;

      ellipse(this.x - 50, this.y + 25, 5,5);

      if (this.x - 50 <= pos[0] + 50 &&
        this.y + 25 <= pos[1] + 100 &&
        this.y + 25 >= pos[1] - 100
      )

      return true;

      ellipse(this.x - 150, this.y, 5,5);

      if (this.x - 150 <= pos[0] + 50 &&
        this.y <= pos[1] + 100 &&
        this.y >= pos[1] - 100
      )

      return true;

      ellipse(this.x - 150, this.y + 25, 5,5);

      if (this.x - 150 <= pos[0] + 50 &&
        this.y + 25 <= pos[1] + 100 &&
        this.y + 25 >= pos[1] - 100
      )

      return true;
      
    }

  }

  //Experiment (block function)
  block() {
    // if(keyIsDown(this.control.block)){
    //   fill('blue');
    // } else
  }
}

// This function is called once when the key is released
function keyReleased() {
  // Player 1 Attack (F)
  if(keyCode === p1.control.punch) {
    p1.atkCooldown = true; // Allow attack again after key release
  }

  // Player 2 Attack (Down Arrow)
  if(keyCode === p2.control.punch) {
    p2.atkCooldown = true; // Allow attack again after key release
  }
}

// function keyPressed(){ 
//   // Player 1 Block (Y)
//   if(keyCode === p1.control.block){

//   }
// }
