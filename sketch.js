//variable declaration
var PLAY = 1
var END = 0
var gameState = PLAY
var end,endImg
var sad,sadImg
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var hurdle,hurdleImage
var Chances = 5;

//Load Images
function preload()
{
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("runner1.png","runner2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadImage("gameOver.png");
  sadImg =loadImage("sad.png")
  hurdleImage = loadImage("hurdle.png")
}

//Setup the canvas
function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);
path.velocityY = 4;
path.scale = 0.8


//creating boy running
boy = createSprite(70,550,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
  
end = createSprite(200,200,50,50)
end.addImage("endImage",endImg) 
end.visible=false
  
sad =createSprite(200,300,33,30)
sad.addImage("saddness",sadImg)
sad.visible=false
sad.scale=0.15
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();
hurdleGroup=new Group();


}


function draw() {

  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 400 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();
    createHurdle();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection += 10
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection += 50
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection += 100
      
    }else if(hurdleGroup.isTouching(boy)){
      hurdleGroup.destroyEach()
      treasureCollection=treasureCollection-100;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        Chances=Chances-1
        
        if (Chances===0){
          gameState=END
        }
    }
  }

  
  
  if (gameState === END) {
    swordGroup.destroyEach()
    jwelleryG.destroyEach()
    diamondsG.destroyEach()
    cashG.destroyEach()
    hurdleGroup.destroyEach()
    
    var endImg = createSprite(200,200,10,10)
    
    path.velocityY=0
    
    end.visible=true
    boy.visible=false
    
    sad.visible=true
    
  }
  drawSprites();
  textSize(30);
  stroke("white")
  fill("red");
  text("Treasure: "+ treasureCollection,120,30);
  
  fill("yellow");
  textSize(18)
  text("Collect the treasure but watch out of the swords",10,50)
  text("Touching the cone will reduce 100 points",10,70)
  
  fill("white");
  text("Points:",10,90)
  fill("lightblue");
  text("> diamonds = 100",10,110)     
  fill("pink");
  text("> jwellery = 50",10,130) 
  fill("lightgreen");
  text("> cash = 10 ",10,150) 
  
  textSize(30);
  fill("red");
  text("chances = "+ Chances,10,190)
  
  
}

function createCash() {
  if (World.frameCount % 50 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 80 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 80 == 0) {
  var jwellery = createSprite(Math.round(random(50, 350),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 150 == 0) {
  var sword = createSprite(Math.round(random(50, 350),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}

function createHurdle(){
  if (World.frameCount % 150 == 0) {
  var hurdle = createSprite(Math.round(random(50, 350),40, 10, 10));
  hurdle.addImage(hurdleImage);
  hurdle.scale=0.1;
  hurdle.velocityY = 3;
  hurdle.lifetime = 150;
  hurdleGroup.add(hurdle);
  }
}
