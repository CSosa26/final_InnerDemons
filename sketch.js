let p1, p2;
let bl = true;

let stages = [];
let chars = [];
let stageP1 = {};
let stageP2 = {};
let picks = [];
let randomI;
let chosen = {};
let menu = "pressme";
let pickedStage = false;
let pickedChar = false;
let instructDone= false;
let mainImg;
let stageImg;
let countdown = 4;
let font;
let tyler;
let tylerX = 1300;
let tylerY = 400;
let carlos;
let carlosX = 1300;
let carlosY = 400;

let pxlCarlosIdle, pxlCarlosPunch, pxlCarlosCrouch, pxlCarlosJump, pxlCarlosBlock, pxlCarlosWalk;
let pxlCarlosIdleR, pxlCarlosPunchR, pxlCarlosCrouchR, pxlCarlosJumpR, pxlCarlosBlockR, pxlCarlosWalkR;

let toonCarlosIdle, toonCarlosPunch, toonCarlosCrouch, toonCarlosJump, toonCarlosBlock, toonCarlosWalk;
let toonCarlosIdleR, toonCarlosPunchR, toonCarlosCrouchR, toonCarlosJumpR, toonCarlosBlockR, toonCarlosWalkR;

let cruzCarlosIdle, cruzCarlosPunch, cruzCarlosCrouch, cruzCarlosJump, cruzCarlosBlock, cruzCarlosWalk;
let cruzCarlosIdleR, cruzCarlosPunchR, cruzCarlosCrouchR, cruzCarlosJumpR, cruzCarlosBlockR, cruzCarlosWalkR;

let darkCarlosIdle, darkCarlosPunch, darkCarlosCrouch, darkCarlosJump, darkCarlosBlock, darkCarlosWalk;
let darkCarlosIdleR, darkCarlosPunchR, darkCarlosCrouchR, darkCarlosJumpR, darkCarlosBlockR, darkCarlosWalkR;

let p1Char, p2Char;

let MAXHEALTH = 100;
let PUNCHDAMAGE = 5;
let MOVESPEED = 10;

let screen = 0;
// 0 - Main screen
// 1 - character selection
// 2 - stage selection
// 3 - Fight
// 4 - KO
// 5 - Victory
// 6 - Reset

//Audio
let play = true;
let playSE = true;

function preload() {
  //Player Health
  P1HealthImg = loadImage("images/Health/P1Health.png");
  P2HealthImg = loadImage("images/Health/P2Health.png");
  BoarderImg = loadImage("images/Health/BoarderHealth.png");

  //Audio/SE/Music
  mainscreenMusic =  loadSound("music/MainScreenMusic.mp3");
  fightscreenMusic1 = loadSound("music/FightingMusic1.mp3");
  fightscreenMusic2 = loadSound("music/FightingMusic2.mp3");
  fightscreenMusic3 = loadSound("music/FightingMusic3.mp3");
  MainButtonSE = loadSound("music/MainScreenButton.mp3");
  fight321SE = loadSound("music/321FightSE.mp3");
  blockSE = loadSound("music/BlockSE.mp3");
  punchSE = loadSound("music/PunchSE1.mp3");
  crouchSE = loadSound("music/Crouch.mp3");
  jumpSE = loadSound("music/JumpSE.mp3");
  cButtonSE = loadSound("music/ButtonSE1.mp3");
  p1ButtonSE = loadSound("music/ButtonSE2.mp3");
  p2ButtonSE = loadSound("music/ButtonSE3.mp3");
  fatalitySE = loadSound("music/FatalitySE.mp3");
  walk1SE = loadSound("music/WalkingSE.mp3");
  walk2SE = loadSound("music/WalkingSE2.mp3");

  //Screens
  mainImg = loadImage("images/Menus/mainmenu.png");
  stageImg = loadImage("images/Menus/stageselect.png");
  font = loadFont("fonts/Iceberg-Regular.ttf");
  tyler = loadImage("images/Menus/tyler.png");
  carlos = loadImage("images/Menus/carlos.png");

  // //Player PXL
  pxlCarlosIdle = loadImage("images/CarlosPxl/idle.gif");
  pxlCarlosPunch = loadImage("images/CarlosPxl/Punch.gif");
  // pxlCarlosCrouch = loadImage("images/CarlosPxl/C");
  pxlCarlosJump = loadImage("images/CarlosPxl/Jump.gif");
  pxlCarlosBlock = loadImage("images/CarlosPxl/Block.gif");
  pxlCarlosWalk = loadImage("images/CarlosPxl/Walking.gif");


  pxlCarlosIdleR = loadImage("images/CarlosPxl/RIdle.gif");
  pxlCarlosPunchR = loadImage("images/CarlosPxl/RPunch.gif");
  // // pxlCarlosCrouchR = loadImage("images/CarlosPxl/C");
  pxlCarlosJumpR = loadImage("images/CarlosPxl/RJump.gif");
  pxlCarlosBlockR = loadImage("images/CarlosPxl/RBlock.gif");
  pxlCarlosWalkR = loadImage("images/CarlosPxl/RWalking.gif");

  // //Player Toon
  toonCarlosIdle = loadImage("images/CarlosDrawing/Idle/LIdle.gif");
  toonCarlosPunch = loadImage("images/CarlosDrawing/Punch/LPunch.png");
  // toonCarlosCrouch = loadImage("images/CarlosPxl/C");
  toonCarlosJump = loadImage("images/CarlosDrawing/Jump/LJump.png");
  toonCarlosBlock = loadImage("images/CarlosDrawing/Block/LBlock.png");
  toonCarlosWalk = loadImage("images/CarlosDrawing/Walk/LWalk.gif");


  toonCarlosIdleR = loadImage("images/CarlosDrawing/Idle/RIdle.gif");
  toonCarlosPunchR = loadImage("images/CarlosDrawing/Punch/RPunch.png");
  // // toonCarlosCrouchR = loadImage("images/CarlosPxl/C");
  toonCarlosJumpR = loadImage("images/CarlosDrawing/Jump/RJump.png");
  toonCarlosBlockR = loadImage("images/CarlosDrawing/Block/RBlock.png");
  toonCarlosWalkR = loadImage("images/CarlosDrawing/Walk/RWalk.gif");

  // //Player Cruz
  cruzCarlosIdle = loadImage("images/CarlosCruzDrawing/Idle/LIdle.gif");
  cruzCarlosPunch = loadImage("images/CarlosCruzDrawing/Punch/LPunch.png");
  // cruzCarlosCrouch = loadImage("images/CarlosPxl/C");
  cruzCarlosJump = loadImage("images/CarlosCruzDrawing/Jump/LJump.png");
  cruzCarlosBlock = loadImage("images/CarlosCruzDrawing/Block/LBlock.png");
  cruzCarlosWalk = loadImage("images/CarlosCruzDrawing/Walk/LWalk.gif");


  cruzCarlosIdleR = loadImage("images/CarlosCruzDrawing/Idle/RIdle.gif");
  cruzCarlosPunchR = loadImage("images/CarlosCruzDrawing/Punch/RPunch.png");
  // // cruzCarlosCrouchR = loadImage("images/CarlosPxl/C");
  cruzCarlosJumpR = loadImage("images/CarlosCruzDrawing/Jump/RJump.png");
  cruzCarlosBlockR = loadImage("images/CarlosCruzDrawing/Block/RBlock.png");
  cruzCarlosWalkR = loadImage("images/CarlosCruzDrawing/Walk/RWalk.gif");

  // //PLayer Dark
  darkCarlosIdle = loadImage("images/CarlosPxl/BlackCR/LblIdle.gif");
  darkCarlosPunch = loadImage("images/CarlosPxl/BlackCR/LblPunch.gif");
  // darkCarlosCrouch = loadImage("images/CarlosPxl/C");
  darkCarlosJump = loadImage("images/CarlosPxl/BlackCR/LblJump.gif");
  darkCarlosBlock = loadImage("images/CarlosPxl/BlackCR/LblBlock.gif");
  darkCarlosWalk = loadImage("images/CarlosPxl/BlackCR/LblWaking.gif");


  darkCarlosIdleR = loadImage("images/CarlosPxl/BlackCR/RblIdle.gif");
  darkCarlosPunchR = loadImage("images/CarlosPxl/BlackCR/RblPunch.gif");
  // // darkCarlosCrouchR = loadImage("images/CarlosPxl/C");
  darkCarlosJumpR = loadImage("images/CarlosPxl/BlackCR/RblJump.gif");
  darkCarlosBlockR = loadImage("images/CarlosPxl/BlackCR/RblBlock.gif");
  darkCarlosWalkR = loadImage("images/CarlosPxl/BlackCR/RblWalking.gif");
}

function unloadMusic() {
  if (menu != "main" || menu != "direct" || menu != "char" || menu != "stage") {
    mainscreenMusic.stop();
  }
  if (menu != "fight") {
    fightscreenMusic1.stop()
    fightscreenMusic2.stop();
    fightscreenMusic3.stop();
  }
}

let context ;
function setup() {
  createCanvas(1200, 600);
  // context = canvas.elt.getContext('2d', { willReadFrequently: true });
  rectMode(CENTER);
  frameRate(30);
  stages[0] = loadImage("images/Menus/ballpit.png");
  stages[1] = loadImage("images/Menus/plane.png");
  stages[2] = loadImage("images/Menus/wafflehouse.png");
  chars[0] = pxlCarlosIdle;
  chars[1] = loadImage("images/CarlosDrawing/Idle/RIdle.gif");
  chars[2] = loadImage("images/CarlosCruzDrawing/Idle/RIdle.gif");
  chars[3] = loadImage("images/CarlosPxl/BlackCR/RblIdle.gif");
  stageP1.stage = 0;
  stageP2.stage = 0;
  stageP1.char = 0;
  stageP2.char = 0;
  p1Char = 0;
  p2Char = 0;
  textFont(font);
  stroke(255);
  // fighter(health, punch, moveX, playerNum)
  p1 = new fighter(MAXHEALTH, PUNCHDAMAGE, MOVESPEED, 1);
  p2 = new fighter(MAXHEALTH, PUNCHDAMAGE, MOVESPEED, 2);
}

function draw() {
  if (menu == "pressme") {
    background(100);
    textAlign(CENTER);
    textSize(100);
    text("Press Space to Load.", 600, 300);
    if (keyIsDown(32)) {
      //Button Sound Effect
      MainButtonSE.play();
            
      noLoop();
      background(100);
      text("Loading...", 600, 300);

      setTimeout(
      () => {
        menu = "main";
        loop();
      }, 3000);
      
    }
    
  }
  if (menu == "main") {    // insert main screen code here, replace below
    if (play) { 
      mainscreenMusic.play();
      mainscreenMusic.loop();
      play = false;
    }
    background(100);
    imageMode(CORNER);
    image(mainImg, 0, 0);
    console.log(screen);
    console.log(menu);
    if (keyIsDown(32)) {
      //Button Sound Effect
      MainButtonSE.play();
      //space bar
       // Change number to 1 after input character and stage selection screen
      menu = "direct";
    }
    
  }
  if(menu == "direct"){
    imageMode(CORNER);
    image(stageImg, 0, 0);
    textAlign(CENTER);
    fill(255);
    textSize(75);
    text('CONTROLS', width/2, 75);
    textSize(50);
    text('Player 1', width/4, 125);
    text('Move: WASD', width/4, 200);
    text('Punch: T', width/4, 275);
    text('Block: Y', width/4, 350);
    text('Player 2', 3*width/4, 125);
    text('Arrow Keys', 3*width/4, 200);
    text(']', 3*width/4, 275);
    text('Backslash', 3*width/4, 350);
    text('C to Confirm. SPACE to Continue.', width/2, 575);
    if (keyIsDown(32) && instructDone == true) { 
      //Button Sound Effect
      MainButtonSE.play();
      
      // Change number to 1 after input character and stage selection screen
     menu = "char";
   }
  }
  if (menu == "char") { // insert character selection screen code here
    displayCharSelect();

    textAlign(LEFT);
    textSize(30);
    text('C to Confirm. \nSPACE to Continue.', 20, 500);
    console.log(screen);
    console.log(menu);
    if (keyIsDown(32) && pickedChar == true) { //space bar
      //Button Sound Effect
      MainButtonSE.play();
      menu = "stage"; // Change number to 1 after input character and stage selection screen
    }
  }

  if (menu == "stage") { // insert stage selection screen code here
    displayStageSelect();
    textAlign(LEFT);
    textSize(30);
    text('C to Confirm. \nSPACE to Continue.', 20, 500);
    console.log(screen);
    console.log(menu);
    if (keyIsDown(32) && pickedStage == true) {
            //Button Sound Effect
      MainButtonSE.play();
      //space bar
      picks[0] = stageP1.stage;
      picks[1] = stageP2.stage;
      randomI = int(random(0, picks.length));
      chosen.num = picks[randomI];
      chosen.name = setStageName(chosen.num);
      menu = "fight" // Change number to 1 after input character and stage selection screen
    }
  }

  // Fighting Arena screen
  if (menu == "fight") {

    //Music
    if (playSE) {
        fight321SE.play();
        playSE = false;
    }

    background(220);
    imageMode(CORNER);
    image(stages[chosen.num], 0, 0);
    //Player Moves
    textAlign(CENTER, CENTER);
    textSize(100);
    text("Stage: " + chosen.name, width/2, height/2 - 100);
    if(countdown == 1){
      text("FIGHT!", width/2, height/2);
    }
    else{
      text(countdown - 1, width/2, height/2);
    }
    

    if(frameCount % 30 == 0 && countdown > 0){
      countdown--;
      unloadMusic();
      play = true;
    }
    if(countdown == 0){

      if (play) {
        fightscreenMusic1.play();
        fightscreenMusic1.loop();
        play = false;
      }
      text("FIGHT!", width/2, height*0.7);
      background(220);
      imageMode(CORNER);
      image(stages[chosen.num], 0, 0);
      p1.move();
      p2.move();
      p1.playerPos(p2.plPosition(), p1Char); 
      p2.playerPos(p1.plPosition(), p2Char);
      console.log(screen);
      console.log(menu);
      //Player attacks
      if (p1.attack(p2.plPosition()) && !p2.playerBlock) {
        p2.takeDamage();
      }
      if (p2.attack(p1.plPosition()) && !p1.playerBlock)
        p1.takeDamage();

      if(chosen.num == 1){
        if(tylerX <= 0){
          tylerX = 1600;
          tylerY = int(random(150, 350));
        }
        imageMode(CENTER);
        image(tyler, tylerX, tylerY);
        tylerX-=2;
      }
      if(chosen.num == 0){
        if(carlosX <= 0){
          carlosX = 1200;
          carlosY = int(random(150, 350));
        }
        imageMode(CENTER);
        image(carlos, carlosX, carlosY);
        carlosX-=2;
      }
      imageMode(CORNER);  
      //Player Health
      P1Health();
      P2Health();

      if (p1.getHealth() == 0 || p2.getHealth() == 0)
        menu = "ko";
    }
    

  }

  // KO image popup 
  //freeze frame the Fighting Arena
  if (menu == "ko") { // remove code, insert K.O gif below
    unloadMusic();
    play = true;
    textSize(200);
    fill(255);
    textAlign(CENTER);
    text('FATALITY',600, 300);
    fatalitySE.play();

    noLoop();
    setTimeout(
      () => {
        menu = "win";
        loop();
      }, 3000);
  }

  // victory screen
  //display the winner text 
  //will be changed later for the character image + text
  if (menu == "win") { // remove some code
    let winner;

    background(100);
    imageMode(CORNER);
    image(stageImg, 0, 0);
    textSize(200);
    textAlign(CENTER);

    if (p1.getHealth() == 0) {
      winner = 'Player 2';
    }
    else
      winner = 'Player 1';

    text(winner + " wins!",600, 300);
    textSize(50);
    text("Press SPACE to restart",600, 500);
    if (keyIsDown(32)) {
      menu = "reset";
                  //Button Sound Effect            
      MainButtonSE.play();      
    }
  }

  //Resetting screen
  //resets back to main menu screen
  //Can be changed to character selection
  if (menu == "reset") {
    background(50);
    imageMode(CORNER);
    image(stageImg, 0, 0);
    textSize(200);
    textAlign(CENTER);

    text("Resetting...", 600, 300);

    noLoop();

    p1 = new fighter(MAXHEALTH, PUNCHDAMAGE, MOVESPEED, 1);
    p2 = new fighter(MAXHEALTH, PUNCHDAMAGE, MOVESPEED, 2);

    setTimeout(
      () => {
        menu = "main";
        pickedChar = false;
        pickedStage = false;
        instructDone = false;
        countdown = 4;
        playSE = true;
        play = true;
        loop();
      }, 3000);
  }
}

// This function is called once when the key is released
function keyReleased() {
  // Player 1 Attack (F)
  if(keyCode === p1.control.punch) {
    p1.atkCooldown = true; // Allow attack again after key release
    p1.action = 0;
  }

  // Player 2 Attack (Down Arrow)
  if(keyCode === p2.control.punch) {
    p2.atkCooldown = true; // Allow attack again after key release
    p2.action = 0;
  }

  if(keyCode === p1.control.left){
    p1.action = 0;
  }
  if(keyCode === p1.control.right){
    p1.action = 0;
  }
  if(keyCode === p1.control.block){
    p1.action = 0;
  }

  if(keyCode === p2.control.left){
    p2.action = 0;
  }
  if(keyCode === p2.control.right){
    p2.action = 0;
  }
  if(keyCode === p2.control.block){
    p2.action = 0;
  }
}
