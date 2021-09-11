var fondo,fondoimg;
var arrow,arrowimg,arrowgroup;
var greenb,greenbgroup,blueb,bluebgroup,
    yellowb,yellowbgroup,redb,redbgroup;
var bow,bowimg;
var score;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var star,starimg,star2,star2img,star3,star3img;
var mounstruo,mounstruoimg,mounstruogroup;
var mounstruo2,mounstruo2img,mounstruo2group;
var score2;

function preload(){ 
   
  fondoimg=loadImage("fondo-1.jpg");
  arrowimg=loadImage("flech.png");
  greenb=loadImage("verde.png");
  blueb=loadImage("azul.png");
  yellowb=loadImage("amarillo.png");
  redb=loadImage("rojo.png");
  bowimg=loadImage("arco1.png");
  starimg=loadImage("premio.png");
  star2img=loadImage("premio2.png");
  star3img=loadImage("premio3.png");
  mounstruoimg=loadImage("mounstro1.png");
  mounstruo2img=loadImage("mounstro2.png");
  
}

function setup() {
  createCanvas(400, 400);
  
  fondo =createSprite(0,200,400,400);
  fondo.addImage("imagen del fondo",fondoimg);
  fondo.scale=0.517;
  
  bow=createSprite(340,220,50,50);
  bow.addImage("imagen del arco",bowimg);
  bow.scale=0.6;
  bow.setCollider("rectangle",0,0,150,300);
  bow.debug=false;
  
  star=createSprite(210,30,20,20);
  star.addImage("imagen del premio",starimg);
  star.scale=0.25;
  
  star2=createSprite(280,40,20,20);
  star2.addImage("imagen del premio2",star2img);
  star2.scale=0.23;
  
  star3=createSprite(350,40,20,20);
  star3.addImage("imagen del premio3",star3img);
  star3.scale=0.23;
      
  greenbgroup= new Group();
  bluebgroup= new Group();
  yellowbgroup= new Group();
  redbgroup= new Group();
  arrowgroup= new Group();
  mounstruogroup=new Group();
  mounstruo2group=new Group();
  
  score=0;
  
  score2=3;
   
}

function draw() {
  background(0);
  drawSprites();
  
  fill("white");
  textFont("Jokerman");
  textSize(20);
  text("Puntuación: "+score,10,30);
  
  fill("white");
  textFont("Jokerman");
  textSize(20);
  text("Vidas: "+score2,10,390); 
       
  if(gamestate==PLAY){
    
  bow.y=World.mouseY;
    
  fondo.velocityX=-3;
    
  if(fondo.x<0){
    fondo.x=fondo.width/3.5;
  }
     
  if(keyDown("space")){
    createArrow();
  }
    
 var select_balloon = Math.round(random(1,4));
  
 if (World.frameCount % 100 == 0) {
    if (select_balloon == 1) {
       redBalloon();
    } else if(select_balloon==2){
       greenBalloon();
    } else if (select_balloon==3){
       blueBalloon();
    } else if (select_balloon==4){
       yellowBalloon();
    } 
 }
    
    if(arrowgroup.isTouching(redbgroup)){
      
      arrowgroup.destroyEach();
      redbgroup.destroyEach();
    
      score=score+10;
      score2=score2+5;   
   
    }
    
    if(arrowgroup.isTouching(bluebgroup)){
      
      arrowgroup.destroyEach();
      bluebgroup.destroyEach();
    
      score=score+20;
    }
    
    if(arrowgroup.isTouching(greenbgroup)){
      
      arrowgroup.destroyEach();
      greenbgroup.destroyEach();
    
      score=score+30;
      score2=score2-2;       
    }
    
    if(arrowgroup.isTouching(yellowbgroup)){
      
      arrowgroup.destroyEach();
      yellowbgroup.destroyEach();
    
      score=score+50;
      score2=score2+10;         
   }
    
    if(score>500){
       star.velocityY=2;
       if(arrowgroup.isTouching(star)){
          arrowgroup.destroyEach();
          star.destroy();
          score=score+500;
       }
     }
    
    if(score2>50){
        star2.velocityY=2;
        if(arrowgroup.isTouching(star2)){
           arrowgroup.destroyEach();
           star2.destroy();
           score=score+1000;
         }
     }
    
    if(score>1000){
        star3.velocityY=4;
        if(arrowgroup.isTouching(star3)){
           arrowgroup.destroyEach();
           star3.destroy();
           score=score+3000;
         }     
     } 
    
    if(mounstruogroup.isTouching(bow)){
        score=score-200;
        mounstruogroup.destroyEach();
    }
    
    if(mounstruo2group.isTouching(bow)){
        score2=score2-30;
        mounstruo2group.destroyEach();
    }
    
    if(arrowgroup.isTouching(mounstruogroup)){
        arrowgroup.destroyEach();
        mounstruogroup.destroyEach();
    }
    
    if(score2<=0){
      gamestate=END;
      score2=0;
    }
    
    createM();
  }
  else if(gamestate==END){
    fill("white");
    textFont("Jokerman");
    textSize(40);
    text("Fin del juego",80,180);
    
    fondo.velocityX=0;
    bow.velocityY=0;
    
    greenbgroup.setVelocityXEach(0);
    bluebgroup.setVelocityXEach(0);
    yellowbgroup.setVelocityXEach(0);
    redbgroup.setVelocityXEach(0);
    arrowgroup.setVelocityXEach(0);
    mounstruo2group.setVelocityXEach(0);
    mounstruogroup.setVelocityXEach(0);      
        
  }      
    
}

function createArrow() {
  
  var arrow= createSprite(100, 100, 60, 50);
  arrow.addImage(arrowimg);
  arrow.x = 360;
  arrow.y=bow.y;
  arrow.velocityX = -6;
  arrow.lifetime = 100;
  arrow.scale = 0.27;
  arrow.setCollider("rectangle",50,-150,350,100);
  arrow.debug=false;
  arrowgroup.add(arrow);
}

function redBalloon() {
  
  var red = createSprite(0,60, 40, 40);
  red.y=Math.round(random(20,360));
  red.addImage("imagen del pajaro rojo",redb);
  red.velocityX = 3;
  red.lifetime = 150;
  red.scale = 0.7;
  redbgroup.add(red);  
}

function blueBalloon() {
  
  var blue=createSprite(0,60,40,40);
  blue.y=Math.round(random(20,360))
  blue.addImage("imagen del pajaro azul",blueb);
  blue.velocityX=4;
  blue.lifetime=150;
  blue.scale=0.2;
  bluebgroup.add(blue); 
}

function greenBalloon() {
  
  var green=createSprite(0,60,40,40);
  green.y= Math.round(random(20,360));
  green.addImage("imagen del pajaro verde",greenb);
  green.velocityX=5;
  green.lifetime=150;
  green.scale=0.2;
  greenbgroup.add(green);
  
}

function yellowBalloon() {
  
  var yellow=createSprite(0,60,40,40);
  yellow.y=Math.round(random(20,360))
  yellow.addImage("imagen del pajaro amarillo",yellowb);
  yellow.velocityX=6;
  yellow.lifetime=150;
  yellow.scale=0.2;
  yellowbgroup.add(yellow);
  
}

function createM(){
  
  var Mounstros=Math.round(random(1,2));
  
    if(frameCount%100 === 0){
      if(Mounstros==1){
        mounstruo=createSprite(20,60,10,10);
        mounstruo.addImage("imagen del mounstro",mounstruoimg);
        mounstruo.scale=0.15;
        mounstruo.y=Math.round(random(40,350));
        mounstruo.lifetime=150;
        mounstruo.velocityX=3;
        mounstruogroup.add(mounstruo);
       }
        else
       {
         createM2();
       }

     }
}
function createM2(){
  
  if(frameCount%200==0){
     
    mounstruo2=createSprite(20,60,10,10);
    mounstruo2.addImage("imagen del mousntro2",mounstruo2img);
    mounstruo2.scale=0.2;
    mounstruo2.y=Math.round(random(40,350));
    mounstruo2.lifetime=150;
    mounstruo2.velocityX=3;
    mounstruo2group.add(mounstruo2); 
  }
}
