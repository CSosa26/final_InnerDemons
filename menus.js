
function displayStageSelect(){
    imageMode(CORNER);
    image(stageImg, 0, 0);
    fill(0);
    textAlign(CENTER);
    fill(255);
    textSize(50);
    text('Choose a stage!', width/2, 50);
    
    imageMode(CENTER);
    image(stages[stageP1.stage], width/4, height/2, 600, 300);
    image(stages[stageP2.stage], 3*width/4, height/2, 600, 300);
    textSize(40);
    text('Player 1: A and D Buttons', width/4, 125);
    text('Player 2: Left and Right Arrows', 3*width/4, 125);
    for(let i = 0; i < stages.length; i++){
      image(stages[i], width/3 + 200*i, 525, 200, 100);
    }
    textAlign(RIGHT);
    fill(0, 0, 255);
    ellipse(width/3 + 200*stageP1.stage - 70, 460, 75, 75, 50);
    fill(255);
    text('P1', width/3 + 200*stageP1.stage - 150, 525, 200, 100, 50);
    fill(255, 0, 0);
    ellipse(width/3 + 200*stageP2.stage + 30, 460, 75, 75, 50);
    fill(255);
    text('P2', width/3 + 200*stageP2.stage - 50, 525, 200, 100, 50);
    text("Press C to confirm", )
}

function displayCharSelect(){
    imageMode(CORNER);
    image(stageImg, 0, 0);
    fill(0);
    textAlign(CENTER);
    fill(255);
    textSize(50);
    text('Choose a character!', width/2, 50);
    textSize(40);
  
    imageMode(CENTER);
    image(chars[stageP1.char], width/4, height/2, 320, 320);
    image(chars[stageP2.char], 3*width/4, height/2, 320, 320);
    text('Player 1: A and D Buttons', width/4, 125);
    text('Player 2: Left and Right Arrows', 3*width/4, 125);
    for(let i = 0; i < chars.length; i++){
      image(chars[i], width/3 + 160*i, 525, 160, 160);
    }
    textAlign(RIGHT);
    fill(0, 0, 255);
    ellipse(width/3 + 160*stageP1.char - 70, 460, 75, 75, 50);
    fill(255);
    text('P1', width/3 + 160*stageP1.char - 150, 525, 200, 100, 50);
    fill(255, 0, 0);
    ellipse(width/3 + 160*stageP2.char + 30, 460, 75, 75, 50);
    fill(255);
    text('P2', width/3 + 160*stageP2.char - 50, 525, 200, 100, 50);
}


function keyPressed(){
    if(key == 'b'){
      if(menu == "next"){
        menu = "stage";
        pickedStage = false;
      }
      if(menu == "stage"){
        menu = "char";
      }
    }
    if(key == 'e'){
      if(menu == "char"){
        menu = "stage";
      }
      if(menu == "stage" && pickedStage == true){
        
      }
        
    }
    if(key == 'd'){
      p1ButtonSE.play();
      if(menu == "stage"){
        if(stageP1.stage == 2){
          stageP1.stage = 0;
        }
        else{
          stageP1.stage++;
        }
      }
      if(menu == "char"){
        if(stageP1.char == 3){
          stageP1.char = 0;
          p1Char = 0;
        }
        else{
          stageP1.char++;
          p1Char++;
        }
      }
    }
    if(key == 'a'){
      p1ButtonSE.play();
      if(menu == "stage"){
        if(stageP1.stage == 0){
          stageP1.stage = 2;
        }
        else{
          stageP1.stage--;
        }
      }
      if(menu == "char"){
        if(stageP1.char == 0){
          stageP1.char = 3;
          p1Char = 3;
        }
        else{
          stageP1.char--;
          p1Char--;
        }
      }
    }
  
    if(keyCode == RIGHT_ARROW){
      p2ButtonSE.play();
      if(menu == "stage"){
        p2ButtonSE.play();
        if(stageP2.stage == 2){
          stageP2.stage = 0;
        }
        else{
          stageP2.stage++;
        }
      }
      if(menu == "char"){
        if(stageP2.char == 3){
          stageP2.char = 0;
          p2Char = 0;
        }
        else{
          stageP2.char++;
          p2Char++;
        }
      }
    }
    if(keyCode == LEFT_ARROW){
      p2ButtonSE.play();
      if(menu == "stage"){
        if(stageP2.stage == 0){
          stageP2.stage = 2;
        }
        else{
          stageP2.stage--;
        }
      }
      if(menu == "char"){
        if(stageP2.char == 0){
          stageP2.char = 3;
          p2Char = 3;
        }
        else{
          stageP2.char--;
          p2Char--;
        }
      }
    }
    if(key == 'c'){
      if(menu == "char"){
        if (!pickedChar) 
          cButtonSE.play();
        pickedChar = true;
      }
      if(menu == "stage"){
        if (!pickedStage)
          cButtonSE.play();
        pickedStage = true;
      }
      if(menu == "direct"){
        if (instructDone)
          cButtonSE.play();
        instructDone = true;
      }
    }
}

function setStageName(number){
    if(number == 0){
      return "Pit of Balls";
    }
    if(number == 1){
      return "Air Tyler";
    }
    if(number == 2){
      return "The Dark Waffle";
    }
}
