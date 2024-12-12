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
    imageMode(CORNER);
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
    imageMode(CORNER);
    image(BoarderImg, 690, 10, 510, 40);
}

//Class fighther
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
      this.walkCooldown = 0;

      this.action = 0;
  
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
    plPosition2() {
        let x = this.x;
        return x;
      }
  
    walkSound() {
      if (this.walkCooldown == 0 && this.jump == false) {
        if (this.playerNum === 1) 
          walk1SE.play();
        else
          walk2SE.play();
      }
      this.walkCooldown++;
      if (this.walkCooldown >= 10)
        this.walkCooldown = 0;
    }
  
    // Movement Controls
    move() {
  
      // Player
      if(keyIsDown(this.control.block)) {
        if (!this.playerBlock)
          blockSE.play();
        this.playerBlock = true;
        this.action = 3;
      } else {
        this.playerBlock = false;
      }
  
  
      // Movements: left, rigth, and jump
      if (keyIsDown(this.control.left) && this.x > 50 && !this.playerBlock) {
        this.action = 1;
        this.x -= this.moveX;
        this.walkSound();
      } else if (keyIsDown(this.control.right) && this.x < width - 50 && !this.playerBlock) {
        this.action = 1;
        this.x += this.moveX;
        this.walkSound();
      } else if (keyIsDown(this.control.up) && !this.jump && !this.playerBlock) {
        this.action = 4;
        this.jump = true;
        this.jumpingSpeed = -300;
        jumpSE.play();
      }
  
      // Movement: down
      if (keyIsDown(this.control.down)) {
        if (this.y != 600)
          crouchSE.play();
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
          this.action = 0;
        }
      }
  
      strokeWeight(0);
      // Updates the visual drawing
      rect(this.x, this.y, 100, 200);
    }
  
    // Creates the players attack hitbox
    // Returns the hitbox
    attack(pos) {
      let connected = false;
    //   this.attack = 2;
      if (keyIsDown(this.control.punch) && this.atkCooldown && !this.playerBlock) {
        punchSE.play();
        rectMode(CORNER);
        fill(0);
        strokeWeight(0);
        if (pos[0] > this.x) {
          rect(this.x - 50, this.y - 100, 180, 25);
          connected = this.hitboxTest(pos, 1);
        } else if (pos[0] < this.x) {
          rect(this.x + 50, this.y - 100, -180, 25);
          connected = this.hitboxTest(pos, 2);
        } else {
          console.log("No position");
        }
  
        this.action = 2;
        this.atkCooldown = false; 
      }
      rectMode(CENTER);
      return connected;
    }

    playerPos(pos, char){ 
        // looking Right
        if (pos[0] >= this.x) {
            if(this.action === 0){
                //Idle
                switch(char) {
                    case 0: image(pxlCarlosIdleR, this.x - 75, this.y - 150, 150, 250); break;
                    case 1: image(toonCarlosIdleR, this.x - 65, this.y - 150, 150, 250); break;
                    case 2: image(cruzCarlosIdleR, this.x - 65, this.y - 150, 150, 250); break;
                    case 3: image(darkCarlosIdleR, this.x - 55, this.y - 150, 200, 250); break;
                    default: console.log("Char Error"); break;
                }
                // image(pxlCarlosIdleR, this.x, this.y - 100, 150, 250);
            } else if(this.action === 1){
                //Move
                switch(char) {
                    case 0: image(pxlCarlosWalkR, this.x - 75, this.y - 150, 150, 250); break;
                    case 1: image(toonCarlosWalkR, this.x - 65, this.y - 150, 140, 235); break;
                    case 2: image(cruzCarlosWalkR, this.x - 65, this.y - 150, 150, 250); break;
                    case 3: image(darkCarlosWalkR, this.x - 105, this.y - 150, 200, 250); break;
                    default: console.log("Char Error"); break;
                }
                // image(pxlCarlosWalkR, this.x, this.y - 100, 150, 250);
            } else if(this.action === 2){
                //attack
                switch(char) {
                    case 0: image(pxlCarlosPunchR, this.x - 75, this.y - 150, 225, 250); break;
                    case 1: image(toonCarlosPunchR, this.x - 65, this.y - 150, 200, 250); break;
                    case 2: image(cruzCarlosPunchR, this.x - 65, this.y - 150, 200, 250); break;
                    case 3: image(darkCarlosPunchR, this.x - 55, this.y - 150, 200, 250); break;
                    default: console.log("Char Error"); break;
                }
                // image(pxlCarlosPunchR, this.x, this.y - 100, 150, 250);
            } else if(this.action === 3){
                //Block
                switch(char) {
                    case 0: image(pxlCarlosBlockR, this.x - 75, this.y - 150, 150, 250); break;
                    case 1: image(toonCarlosBlockR, this.x - 65, this.y - 150, 150, 250); break;
                    case 2: image(cruzCarlosBlockR, this.x - 65, this.y - 150, 150, 250); break;
                    case 3: image(darkCarlosBlockR, this.x - 100, this.y - 150, 200, 250); break;
                    default: console.log("Char Error"); break;
                }
                // image(pxlCarlosPunchR, this.x, this.y - 100, 150, 250);
            } else if(this.action === 4){
                //Jump 
                switch(char) {
                    case 0: image(pxlCarlosJumpR, this.x - 75, this.y - 150, 150, 250); break;
                    case 1: image(toonCarlosJumpR, this.x - 105, this.y - 150, 200, 250); break;
                    case 2: image(cruzCarlosJumpR, this.x - 95, this.y - 150, 200, 250); break;
                    case 3: image(darkCarlosJumpR, this.x - 75, this.y - 150, 215, 250); break;
                    default: console.log("Char Error"); break;
                }
                // image(pxlCarlosPunchR, this.x, this.y - 100, 150, 250);
            } else if(this.action === 5){
                //Crouch
            }
        } else if (pos[0] < this.x) { //Looking left
            if(this.action === 0){
                //Idle
                switch(char) {
                    case 0: image(pxlCarlosIdle, this.x - 75, this.y - 150, 150, 250); break;
                    case 1: image(toonCarlosIdle, this.x - 85, this.y - 150, 150, 250); break;
                    case 2: image(cruzCarlosIdle, this.x - 85, this.y - 150, 150, 250); break;
                    case 3: image(darkCarlosIdle, this.x - 117, this.y - 150, 200, 250); break;
                    default: console.log("Char Error"); break;
                }
                // image(pxlCarlosIdleR, this.x, this.y - 100, 150, 250);
            } else if(this.action === 1){
                //Move
                switch(char) {
                    case 0: image(pxlCarlosWalk, this.x - 75, this.y - 150, 150, 250); break;
                    case 1: image(toonCarlosWalk, this.x - 85, this.y - 150, 140, 235); break;
                    case 2: image(cruzCarlosWalk, this.x - 85, this.y - 150, 150, 250); break;
                    case 3: image(darkCarlosWalk, this.x - 117, this.y - 150, 200, 250); break;
                    default: console.log("Char Error"); break;
                }
                // image(pxlCarlosWalkR, this.x, this.y - 100, 150, 250);
            } else if(this.action === 2){
                //attack
                switch(char) {
                    case 0: image(pxlCarlosPunch, this.x - 150, this.y - 150, 225, 250); break;
                    case 1: image(toonCarlosPunch, this.x - 135, this.y - 150, 200, 250); break;
                    case 2: image(cruzCarlosPunch, this.x - 135, this.y - 150, 200, 250); break;
                    case 3: image(darkCarlosPunch, this.x - 142, this.y - 150, 200, 250); break;
                    default: console.log("Char Error"); break;
                }
                // image(pxlCarlosPunchR, this.x, this.y - 100, 150, 250);
            } else if(this.action === 3){
                //Block
                switch(char) {
                    case 0: image(pxlCarlosBlock, this.x - 75, this.y - 150, 150, 250); break;
                    case 1: image(toonCarlosBlock, this.x - 85, this.y - 150, 150, 250); break;
                    case 2: image(cruzCarlosBlock, this.x - 85, this.y - 150, 150, 250); break;
                    case 3: image(darkCarlosBlock, this.x - 117, this.y - 150, 200, 250); break;
                    default: console.log("Char Error"); break;
                }
                // image(pxlCarlosPunchR, this.x, this.y - 100, 150, 250);
            } else if(this.action === 4){
                //Jump
                switch(char) {
                    case 0: image(pxlCarlosJump, this.x - 75, this.y - 150, 150, 250); break;
                    case 1: image(toonCarlosJump, this.x - 105, this.y - 150, 200, 250); break;
                    case 2: image(cruzCarlosJump, this.x - 105, this.y - 150, 200, 250); break;
                    case 3: image(darkCarlosJump, this.x - 115, this.y - 150, 200, 250); break;
                    default: console.log("Char Error"); break;
                }
                // image(pxlCarlosPunchR, this.x, this.y - 100, 150, 250);
            } else if(this.action === 5){
                //Crouch
            }
        }
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
        ellipse(this.x + 50, this.y - 100, 5,5);
  
        if (this.x + 50 >= pos[0] - 50 &&
          this.y <= pos[1] + 100 &&
          this.y >= pos[1] - 100
        )
        return true;
  
        ellipse(this.x + 50, this.y - 100 + 25, 5,5);
  
        if (this.x + 50 >= pos[0] - 50 &&
          this.y + 25 <= pos[1] + 100 &&
          this.y + 25 >= pos[1] - 100
        )
        return true;
  
        ellipse(this.x + 130, this.y - 100, 5,5);
  
        if (this.x + 150 >= pos[0] - 50 &&
          this.y <= pos[1] + 100 &&
          this.y >= pos[1] - 100
        )
        return true;
        
        ellipse(this.x + 130, this.y - 100 + 25, 5,5);
  
        if (this.x + 150 >= pos[0] - 50 &&
          this.y + 25 <= pos[1] + 100 &&
          this.y + 25 >= pos[1] - 100
        )
        return true;
      }
      else {
        ellipse(this.x - 50, this.y - 100, 5,5);
  
        if (this.x - 50 <= pos[0] + 50 &&
          this.y <= pos[1] + 100 &&
          this.y >= pos[1] - 100
        )
  
        return true;
  
        ellipse(this.x - 50, this.y - 100 + 25, 5,5);
  
        if (this.x - 50 <= pos[0] + 50 &&
          this.y + 25 <= pos[1] + 100 &&
          this.y + 25 >= pos[1] - 100
        )
  
        return true;
  
        ellipse(this.x - 130, this.y - 100, 5,5);
  
        if (this.x - 150 <= pos[0] + 50 &&
          this.y <= pos[1] + 100 &&
          this.y >= pos[1] - 100
        )
  
        return true;
  
        ellipse(this.x - 130, this.y - 100 + 25, 5,5);
  
        if (this.x - 150 <= pos[0] + 50 &&
          this.y + 25 <= pos[1] + 100 &&
          this.y + 25 >= pos[1] - 100
        )
  
        return true;
        
      }
  
    }
    
}