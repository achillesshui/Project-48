const World = Matter.World;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Engine = Matter.Engine;
const Constraint = Matter.Constraint;

var engine, world;
var monkey, monkaS;
var fruits;
var veggies;
var rope, startRope;
var swing;
var ground;
var jungle, bg;
var tree1IMG, tree2IMG, tree3IMG, tree4IMG;
var tree, treeGroup;
var fruits, fruitGroup;
var attacher, attacherGroup;
var grapeIMG, bananaIMG, appleIMG, strberryIMG;
var score;
var mouse, mouseGroup;
var attacher1;
var sound;
var PLAY = 1; 
var END = 0;
var gameState = PLAY;


function preload() {
  jungle = loadImage("images/bg1.jpg");
  tree1IMG = loadImage("images/tree1.png");
  tree2IMG = loadImage("images/tree2.png");
  tree3IMG = loadImage("images/tree3.png");
  tree4IMG = loadImage("images/tree4.png");
  grapeIMG = loadImage("images/grape.png");
  bananaIMG = loadImage("images/banana.png");
  appleIMG = loadImage("images/apple.png");
  strberryIMG = loadImage("images/str. berry.png");
  sound = loadSound("sound/pop.mp3");
}

function setup() {
  createCanvas(displayWidth, displayHeight);

  engine = Engine.create();
  world = engine.world;

  bg = createSprite(1900, displayHeight/2, 10,10);
  bg.addImage(jungle);

  ground = createSprite(displayWidth/2, displayHeight, displayWidth, 100);
  ground.visible = false;

  monkey = new Monkey(230, 100);
  
  startRope = new StartRope(monkey.body, {x:230, y:100});

  monkaS = createSprite(monkey.body.position.x, monkey.body.position.y, 80, 80);
  monkaS.visible = false;

  mouse = createSprite(mouseX, mouseY, 30,30);
  mouse.visible = false;
  
  fruitGroup = createGroup();
  attacherGroup = createGroup();
  mouseGroup = createGroup();
  treeGroup = createGroup();

  score = 0;
}

function draw() {
  background(225);  
  Engine.update(engine);

  if(gameState == PLAY) {
    drawSprites();
    fill("red")
    textSize(60);
    text("SCORE: "+score, displayWidth-400, 100);
    
    
    
    mouseGroup.add(mouse);


    monkey.display();

    if(frameCount<150) {
      startRope.display();
      textSize(30);
      text("hover over the red dots to move", 500, 100);
      text("collect fruits to gain score", 550, 150);
      text("collect 20 fruits to make the monkey full", 430, 200);
    }

    if(frameCount>150) {
      attacher1.display();
      attacher1.body.position.x -= 21;
      startRope.detach();
    }

    mouse.x = mouseX;
    mouse.y = mouseY;

    
    bg.velocityX = -13;
    if(bg.x<-300){
      bg.x = 1900;
    }

    monkaS.x = monkey.body.position.x;
    monkaS.y = monkey.body.position.y;

    if(fruitGroup.isTouching(monkaS)) {
      fruitGroup.destroyEach();
      score+=10;
      sound.play();
    }

    spawnTrees();
    spawnFruits();
    spawnInvisAttacher();
    spawnAttacher();
  
    if(mouseGroup.isTouching(attacherGroup)) {
      
      createSwing();
      if(monkey.body.position.x <= displayWidth-300){
        monkey.body.position.y-= 1.5;
        monkey.body.position.x += 0.01;
      }
      else {
        monkey.body.position.y = displayWidth-300;
      }

      if(swing != undefined) {
        swing.fly();
      }
    }
    
    if(keyDown("r")) {
      score = 200;
    }

    if(monkey.body.position.y>=displayHeight+500) {
      gameState = END;
    }

    if(score == 200) {
      gameState = END;
    }

  }

  if(gameState == END ) {
    
    background(0);
    fill("white");
    textSize(100);
    text("GAME OVER", 500, displayHeight/2);
    textSize(50);
    text("Press Space To Restart", 550, displayHeight/2 + 100);

    bg.velocityX = 0;
    treeGroup.setVelocityEach(0);
    fruitGroup.setVelocityEach(0);
    treeGroup.setLifetimeEach(-1);
    fruitGroup.setLifetimeEach(-1);
    if(score == 200) {
      textSize(300);
      text("YOU WIN", 100, displayHeight/2 - 100)
    }
    if(keyDown("space")) {
      reset();
    }

  }

}

function spawnTrees() {
  if(frameCount%150 === 0) {
    tree = createSprite(displayWidth+100, displayHeight/2, 300,300);
    var rand = Math.round(random(1,4));
    switch(rand) {
      case 1: tree.addImage(tree1IMG);
      tree.scale = 1.2;
      break;
      case 2: tree.addImage(tree2IMG);
      tree.scale = 3.6;
      break;
      case 3: tree.addImage(tree3IMG);
      tree.scale = 3.6;
      break;
      case 4: tree.addImage(tree4IMG);
      tree.scale = 3.6;
      break;
      default:
      break;
    }
    tree.velocityX = -20;
    tree.lifetime = displayWidth + 100;
    treeGroup.add(tree);
  }
}

function spawnFruits() {
  if(frameCount%75 === 0) {
    fruits = createSprite(displayWidth, random(displayHeight/4, 3*displayHeight/4), 300,300);
    var rand1 = Math.round(random(1,4));
    switch(rand1) {
      case 1: fruits.addImage(grapeIMG);
      fruits.scale = 0.7;
      break;
      case 2: fruits.addImage(bananaIMG);
      fruits.scale = 0.4;
      break;
      case 3: fruits.addImage(appleIMG);
      fruits.scale = 0.5;
      break;
      case 4: fruits.addImage(strberryIMG);
      fruits.scale = 0.7;
      break;
      default:
      break;
    }
    fruits.velocityX = -20;
    fruits.lifetime = displayWidth + 100;
    fruitGroup.add(fruits);

  }
}

function spawnInvisAttacher() {
  if(frameCount%150 === 0) {
    attacher = createSprite(tree.x, tree.y-150, 50, 50);
    attacher.shapeColor = "grey";
    attacher.visible = false;
    attacherGroup.add(attacher);
    attacher.velocityX = tree.velocityX;
    tree.lifetime = displayWidth + 100;
  }
}

function spawnAttacher() {
  if(frameCount%150 === 0) {
    attacher1 = new Attacher(tree.x,tree.y - 150, 30);    
  }
}

function createSwing() {
  swing = new Swing(monkey.body, {x:mouse.x, y:mouse.y});
  swing.display();
}

function reset() {
  gameState = PLAY;
  treeGroup.destroyEach();
  fruitGroup.destroyEach();
  score = 0;
  Body.setPosition(monkey.body, {x:230, y:100});
  frameCount = 0;
  startRope.attach(monkey.body);
}