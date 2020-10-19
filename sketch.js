var monkey , monkey_running,ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score = 0;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

var reset;


function preload(){
 
    monkey_running =                     loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  

}

function setup() {

  createCanvas(windowWidth,windowHeight);
  
  monkey = createSprite(80,315,20,20); 
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1; 
  
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  
  
  console.log(ground.x);

  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  
}

function draw() {
  
  
  background("limegreen");
  
  
  if(gameState===PLAY){
  if(ground.x<0){
     ground.x = ground.width/2;
  }
  
    
  if(keyDown("space") && monkey.y>=310){
    monkey.velocityY = -12;
  }
  
  
  monkey.velocityY = monkey.velocityY+0.4;
  
  
  monkey.collide(ground);
  
  
  ban();
  obs();
  }
  
  
  stroke("white");
  textSize(20);
  fill("red");
  text("score:"+ score,300,20);
  
  
  stroke("black");
  textSize(20);
  fill("red");
  survivalTime=Math.ceil(frameCount/30);
  text("Survival Time: "+survivalTime,100,50);
  
  
  if(monkey.isTouching(obstacleGroup)){
    gameState=END;  
    FoodGroup.destroyEach();
    obstacleGroup.destroyEach();
  }
  
  
  if(monkey.isTouching(FoodGroup)){
     FoodGroup.destroyEach();    
     score = score+1;
    
  }
  
  
  else if(gameState===END){
    ground.velocityX = 0;
    monkey.visible = false;
    score = 0;
    survivalTime = 0;
    fill("red");
    text("Press R to reset",120,180);
    if(gameState===END&&keyDown("r")){
       restart();
       monkey.visible = true;
       monkey.x = 80;
       monkey.y = 315;
    }
  }
  
   
  
  drawSprites();
  
}


function ban(){
  if(frameCount%120===0){
    banana = createSprite(400,150,10,40); 
    banana.y = Math.round(random(100,250));  
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -(5+score/2);       
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth+1; 
    banana.lifetime = 150;
    FoodGroup.add(banana);
}
}


function obs(){
  if(frameCount%200===0){
     obstacle = createSprite(400,330,10,40);
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.1;
     obstacle.velocityX = -(3+score/2);
     obstacle.depth = monkey.depth;
     monkey.depth = monkey.depth+1;
     obstacle.lifetime = 200;
     obstacleGroup.add(obstacle);
  }
}


function restart(){
  gameState = PLAY;
  
}