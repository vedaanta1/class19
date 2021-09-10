var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var inviskill, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlock = new Group();
  
  ghost = createSprite(300, 400);
  ghost.addImage("ghost", ghostImg);
  ghost.scale = 0.5;
  //
  
}

function draw() {
  background(200);
if(gameState == "play"){
  if(tower.y > 400){
    tower.y = 300
  }

  //spookySound.loop();

  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 2

  }

  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 2

  }


  if(keyDown("space")){
    ghost.velocityY = -5
    

  }

  ghost.velocityY = ghost.velocityY + 0.8

  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;

  }

  spawndoor();

  if(invisibleBlock.isTouching(ghost) || ghost.y >= 600 ){
    gameState = "end"
    ghost.destroy();
    tower.velocityY = 0;

  }
}
  

if(gameState == "end"){
  textSize = 100;
  text("Game Over", 300, 300)
  console.log("gameover");


}




    

    drawSprites();
}


function spawndoor(){
  if(frameCount % 300 == 0 && frameCount > 0){
    door = createSprite(300, - 50);
    door.addImage("door", doorImg);

    climber = createSprite(300, 10);
    climber.addImage("climb", climberImg);

    inviskill = createSprite(300, 15);
    

    door.x = Math.round(random(120, 480));
    climber.x = door.x;
    inviskill.x = door.x;
    inviskill.width = climber.width;
    inviskill.height = 2;
    inviskill.visible = false;


    door.velocityY = 1;
    climber.velocityY = 1;
    inviskill.velocityY = 1;
    door.lifetime = 700;
    climber.lifetime = 600;
    inviskill.lifetime = 600;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlock.add(inviskill);


    door.depth = ghost.depth - 1;
    
  }

  


}