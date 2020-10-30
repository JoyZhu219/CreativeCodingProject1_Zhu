///Joy Zhu
//Project 1

let c1;
let c2;
let c3;
let positions = [];
let boat;
let z;
let time = 0;
let isSea,isForest;
let state = 'sea';
let stars = [];
let trees = [];
let bool = ['y', 'n']
let morn, eve;
let cloud = [];

function setup() {
  createCanvas(windowWidth, windowHeight); 
  morn = color(177, 205, 230);
  eve = color(0, 52, 97);
  z = 0;
  background(0);
  boat = new Ship();
  for (let i=0; i<200; i++) {  //make snows for sketch1
      let snowU = {
       x : random(0, width),
       y : random(-400, 0)
      }  
      positions.push(snowU);
    }
  for(let i=0; i<150;i++) {   //create starts for night scene in sketch2
    let star = {
      x: random(30, width-30),
      y: random(35, height-35),
      size: random(1, 5),
      spark: random(bool)
    }
    stars.push(star);
  }
  for(let i=0; i<200; i++) {   //create trees for both night and day scene in sketch2
    let tree = {
      x: random(30, width-30),
      y: random(height - 45, height-27),
      shade: (random(1, 5))
    }
    trees.push(tree);
  }
  for(let i=0;i<=30;i++){   //create clouds for day scene in sketch2
    cloud[i]=new Clouds();
  }
}

function draw() {
 // print(state);
  if (state === "sea"){   //sketch1
    /*isSea = true;
    isGarden = false;*/
    fill(0,100);
    triangle(width/2,20,width/2-12,40,width/2+12,40);
  
    backG();
    snowSpeed();
    
    boat.move();
    boat.display();
    
    fill(255);                 //create "button" to change from sketch1 to sketch2
    noStroke();
    triangle(width/2, 20, width/2-12, 40, width/2+12, 40);

   isForest = mouseX<width/2+12 &&
    mouseX>width/2-12 &&
    mouseY<40 &&
    mouseY>20;
    
    if (isForest){
      fill(0,100);
      triangle(width/2,20,width/2-12,40,width/2+12,40);
    }
} else {   //sketch2
  drawWindow();
  drawOutside(hour());
  fill(255);
  noStroke();
  triangle(width/2, height-30, width/2-12, height-50, width/2+12, height-50);
  
  isSea = mouseX<width/2+12 &&
    mouseX>width/2-12&&
    mouseY<height-30&&
    mouseY>height-50;
  if(isSea){
      fill(0,100);
      triangle(width/2,height-30,width/2-12,height-50,width/2+12,height-50);
    }
  }
  
}

function snowSpeed(){ //change the speed of snow falling
  speedY = 0.8
  speedX = 0.5
  
  for (let i=0;i<200; i++) {  
    let snowU = positions[i];  
    
    yTotal = snowU.y
    
    if (yTotal < 120) {
      fill(255);   
      circle(snowU.x, yTotal, 5);
  
      snowU.y += speedY - 0.3;
      snowU.x -= speedX - 0.1; 
     } else if (yTotal >= 120 && yTotal < 250){
      
      fill(255);   
      circle(snowU.x, yTotal, 5);
      
      snowU.y += speedY;
  
      snowU.x -= speedX; 
      speedX += 0.01
      speedY += 0.01
      } else if (yTotal >= 250 && yTotal < height){
      
      fill(255);   
      circle(snowU.x, yTotal, 5);
        
      snowU.y += speedY;
      snowU.x -= speedX; 
      speedX += 0.02
      speedY += 0.02
      } else if (yTotal > height){
        snowU.y = 0
      }
    
     if (snowU.x < 0){
       snowU.x = width
     }         
}
}
  
function backG() {        //create the background of sketch1
  c1 = color(238, 99, 86);
  c2 = color(190);
  
    //sky;
  for (let sky=0; sky<60; sky++) {
    
    let skyY = 6 * sky; 
    
    noStroke();
    fill(lerpColor(c1, c2, 0.01*sky));
    rect(0, skyY, width, height);
  } 
  
  //ground;
  fill(240);
  beginShape();
  vertex(0,windowHeight-100);
  vertex(0,windowHeight-100);
  curveVertex(100,windowHeight-110);
  curveVertex(250,windowHeight-90);
  curveVertex(windowWidth-150,windowHeight-110);
  vertex(windowWidth,windowHeight);
  vertex(0,windowHeight);
  vertex(0,windowHeight);
  endShape();
}

class Ship{      //create ships and use vector to make it move
  constructor(){
    this.position = createVector(0,windowHeight-115);
    this.velocity=createVector(0.5,0.1);
  }
  display(){
    c3 = color(255, 211, 190);
    fill(c3);
    //ship body
    beginShape();
    vertex(this.position.x,this.position.y);
    vertex(this.position.x+10,this.position.y+20);
    vertex(this.position.x+115,this.position.y+20);
    vertex(this.position.x+120,this.position.y);
    vertex(this.position.x,this.position.y);
    endShape();
    //sail
    strokeWeight(2);
    beginShape();
    vertex(this.position.x+61,this.position.y);
    vertex(this.position.x+61,this.position.y-75);
    vertex(this.position.x+22,this.position.y-7);
    vertex(this.position.x+61,this.position.y-7);
    endShape();
  }
  move(){
    this.position.add(this.velocity);
    
    if ((this.position.x<=0)||(this.position.x>=width) ){
      this.velocity.x = -this.velocity.x;
    }
    if ((this.position.y>=windowHeight-105)||(this.position.y<=windowHeight-115)){
        this.velocity.y = -this.velocity.y;
    } 
  }
}

let sc, cha, sha;
let environment;
let ss; //starshade
let ts; //treeshade
let bs, ballx, bally, ball;
let mincha, minnow;

function drawOutside(a){   //backrgound for sketch2
  if ((a>=0)&&(a<5)){    //hour 0-5; 12:00 am - 5:00 am
    shadow=140;
    fill(eve);
    ss=255;
    ts=25;
    ball='moon'
    if(a>0){
      let min=(a-0)*60;
      minnow=minute()+min;
    } else {
      minnow=minute();
    }
    mincha=map(minnow,0,300,0,1);
    ballx=lerp(400,200,mincha);
    bally=lerp(300,430,mincha);
    bs=lerp(255,10,mincha);
  } else if ((a>=5)&&(a<10)){  //5:00 am - 10:00 am
    cha=map(a,5,9,0,1);
    sha=lerp(140,0,cha);
    sc=lerpColor(eve,morn,cha);
    ss=lerp(255,0,cha*1.5);
    fill(sc);
    ts=lerp(35,60,cha);
    ball='sun'
    if(a>5){
      let min = (a-5)*60;
      minnow=minute()+min;
    } else {
      minnow=minute();
    }
    mincha=map(minnow,0,300,0,1);
    ballx=lerp(500,400,mincha);
    bally=lerp(0,300,mincha);
    bs=lerp(100,255,mincha);
  } else if((a>=10)&&(a<16)){  //10:00 am - 4:00 pm
    sha=0;
    fill(morn);
    ss=0;
    ts=60;
    ball='sun'
    ballx=400;
    bally=300;
    bs=255;
  } else if((a>=16)&&(a<20)){  //4:00 pm - 8:00 pm
    cha=map(a,16,19,0,1);
    if(a>16){
      let min=(a-16)*60;
      minnow=minute()+min;
    } else{
      minnow=minute();
    }
    mincha=map(minnow,0,240,0,1);
    sha=lerp(0,140,cha);
    sc=lerpColor(morn,eve,cha);
    fill(sc);
    ballx=lerp(500,400,mincha);
    bally=lerp(0,300,mincha);
    ba=lerp(100,255,mincha);
    ss=lerp(0,255,cha);
    ts=lerp(60,35,cha);
    ball='moon'
  }else{   // 8:00 pm - 12:00 am (second day)
    sha=140;
    fill(eve);
    ballx=400;
    bally=300;
    ba=255;
    ss=255;
    ts=25;
    ball='moon'
  }
  noStroke();
  rect(30,30,width-60,height-60);
  push();
  colorMode(RGB);
  if(ball=='sun'){   //sun for day scene
     let ssize=50;
    for (let i=0;i<3;i++){
      fill(255,234,79,bs);
      ellipse(ballx,height-bally,ssize);
      ssize+=13;
      bs-=100;
    }
    for (let i=0; i<24; i++){   //clouds
      cloud[i].display();
      cloud[i].float();
      cloud[i].reset(); 
    }
     } else{
       fill(255,bs);
       ellipse(ballx,height-bally,50);
     }
  pop();
  makeStars(ss);
  makeTrees(ts);
  drawWindow(sha);
}

/*function makeEnvi(event){
  if(event=='night'){
    makeTrees(60,60);
  }
  if(event=='dawn'){
    makeTrees(60,60);
  }
  if(event=='morn'){
    fill(255);
    ellipse(200,200,5);
  }
  if(even=='dusk'){
    fill(255);
    ellipse(200,200,5);
  }
}*/

let olds;
let sec;
function makeTrees(s){   //trees in both scenes
  push();
  colorMode(HSB);
  fill(120,60,s-10);
  rect(0,height-60,width,30);
  for(let i=0;i<trees.length;i++){
    noStroke();
    fill(255);
    let tree = trees[i];
    push()
    translate(tree.x,tree.y-30);
    fill(120,60,s/tree.shade);
    triangle(0, -20, 0-10, 0, 0+10, 0);
    triangle(0, -10, 0-11, 10, 0+11, 10);
    triangle(0, 0, 0-12, 20, 12, 20);
    fill(20,60,s/tree.shade);
    rect(-4,20,8,10);
    pop();
  }
}

class Clouds{ //credit to Jacob. https://www.openprocessing.org/sketch/997319  I used vectors instead
  constructor(){
    this.positionC = createVector((random(width)),(random(height)))
    this.velocityC=createVector(0.3,0);
    this.change=random(0,0.5);
  }
  display(){
    noStroke();
    fill(230);
    ellipse(this.positionC.x,this.positionC.y,50,50);
    ellipse (this.positionC.x + 30, this.positionC.y, 50, 40);
  }
  float(){
    this.positionC.add(this.velocityC);
    if ((this.positionC.x<=0)||(this.positionC.x>=width) ){
      this.velocityC.x = -this.velocityC.x;
    }
  }
  reset(){
    if(this.positionC.x>width+75){
      this.positionC.x=random(-100,0);
      this.positionC.y=random(50,350);
      this.change=random(0.1,0.3);
    }
  }
  
}

/*I tried to make changes to the colors, 
but as stars were sparkling and like changing their sizes, 
color changes seem to deviate from my concept*/
function makeStars(){   
  //let startTime=millis()
  for (let i=0;i<stars.length;i++){
    noStroke();
    fill(255,ss);
    let star=stars[i];
    if(star.spark=="y"){
      if (millis() - startTime >= 10){
        fill(random(255),random(255),random(255))
      }
      ellipse(star.x,star.y,star.size+random(0,1))
    }else{
      /*if (millis() - startTime >= 10){
        fill(random(255),random(255),random(255))
      }*/
      ellipse(star.x,star.y,star.size)
    }
      olds=sec;
    sec=second();
    if((sec==59) && (sec!=olds)) {
      shootstar();
    }
  }
}

function shootstar(){  //small shooting stars 
  let d;
  let star;
  for(let i=0;i<stars.length;i++){
    star=stars[i];
    if((star.y<height/2)&& (star.size>3)){
      d=i;
    }
  }
  star =stars[d];
  let newstar ={
    x: star.x,
    y: star.y,
    size: star.size,
    spark: star.spark
  }
  stars[d]=newstar;
  let y=star.y;
  for (let x=star.x;x>star.x-100;x--){
    let size=star.size;
    ellipse(x,y,size);
    size-=lerp(size,0,0.8);
    y++
  }
  
}

function drawWindow(sha){  //frame for sketch2
  push();
  colorMode(RGB);
  noStroke();
  fill(186,139,68);
  rect(0,height,width,-30);
  rect(0,0,width,30);
  rect(0,0,30,height);
  rect(width,0,-30,height);
  fill(255,40);
  quad(0,0,width-30,0,width-30,30,30,30);
  quad(width-30,0,width,0,width,height,width-30,height-30);
  fill(219,166,80);
  rect(0,0,width,20);
  rect(0,height,width,-20);
  rect(0,0,20,height);
  rect(width,0,-20,height);
  push();
  fill(0,sha)
  rect(30,height,width,-30);
  rect(30,0,width,30);
  rect(0,0,30,height);
  rect(width,30,-30,height-60);
  pop();
  
  pop();
}

function mouseClicked(){
  if (isSea){
    state = "sea";
    isSea = false;
  } 
  if (isForest){
    state = "forest";
    isForest = false;
  }
}