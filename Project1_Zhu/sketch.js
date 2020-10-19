//Joy Zhu
//Project 1

let c1;
let c2;
let c3;
let positions = [];
let boat;
let z;
let time = 0;
let isSea,isGarden;
let state = 'sea';

function setup() {
  createCanvas(400, 400); 
  z = 0;
  background(0);
  boat = new Ship(0,250);
  /* I set it 200 times because I want to have a large amount of snow on the screen.
  This time, I checked codes before I used class and after I used class */
  for (let u=0; u<200; u++) {  
      let snowU = {
       x : random(0, width),
       y : random(-400, 0)
      }  
      positions.push(snowU);
    }
}

function draw() {
 // print(state);
  if (state === 'sea'){
    isSea = true;
    isGarden = false;
    fill(0,100);
    triangle(width/2,20,width/2-12,40,width/2+12,40);
  
    backG();
  
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

     }
     else if (yTotal >= 120 && yTotal < 250){
      
        fill(255);   
        circle(snowU.x, yTotal, 5);
      
        snowU.y += speedY;
  
        snowU.x -= speedX; 
        speedX += 0.01
        speedY += 0.01
      }
      else if (yTotal >= 250 && yTotal < height){
      
        fill(255);   
        circle(snowU.x, yTotal, 5);
        
       snowU.y += speedY;
  
       snowU.x -= speedX; 
        speedX += 0.02
        speedY += 0.02
      }
      else if (yTotal > height){
        snowU.y = 0
      }
    
     if (snowU.x < 0){
       snowU.x = width
     }    
     
  

    boat.move();
    boat.display();
    }
  }
/*I want to create a triangle buttor so that when the mouse is clicked around a certain area, the screen can change.
It is not working for now and I am useing print() to see how I can improve it. I am a bit confused about how I should
use isGarden and isSea. */

   /* isGarden = mouseX<width/2+12 &&
    mouseX>width/2-12 &&
    mouseY<40 &&
    mouseY>20;*/
    
    if (state ==='garden'){
    //isGarden = true;
    //isSea = false;
    
    fill(0,100);
    triangle(width/2,20,width/2-12,40,width/2+12,40);
  
    background(214,238,255);
    flowers();
    bee();

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

function backG() {
  c1 = color(0);
  c2 = color(190);
  
    //sky;
  for (let sky=0; sky<60; sky++) {
    
    let skyY = 6 * sky; 
    
    noStroke();
    fill(lerpColor(c1, c2, 0.01*sky));
    rect(0, skyY, width, 7);
  } 
  
  //ground;
  fill(240);
  beginShape();
  vertex(0,300);
  vertex(0,300);
  curveVertex(100,290);
  curveVertex(250,310);
  curveVertex(400,300);
  vertex(400,400);
  vertex(0,400);
  vertex(0,400);
  endShape();
}

class Ship{
  constructor(shipx,shipy){
    this.shipx = shipx;
    this.shipy = shipy;
  }
  display(){
    c3 = color(65);
    fill(c3);
    //ship body
    beginShape();
    vertex(this.shipx,this.shipy);
    vertex(this.shipx+10,this.shipy+20);
    vertex(this.shipx+115,this.shipy+20);
    vertex(this.shipx+120,this.shipy);
    vertex(this.shipx,this.shipy);
    endShape();
    //sail
    beginShape();
    vertex(this.shipx+66,this.shipy);
    vertex(this.shipx+66,this.shipy-75);
    vertex(this.shipx+22,this.shipy-7);
    vertex(this.shipx+66,this.shipy-7);
    endShape();
  }
  move(){
    if (this.shipx<=width){
      this.shipx += 0.0005;
      if ((this.shipy>=250)&&(this.shipy<=300)){
        this.shipy+=0.0005;
      } else if(this.shipy==300){ //I want to change the move() to make the ship seem tossing on the sea
        this.shipy-=0.0005;
      }
    }
  }
}

/*I will add other objects in this sketch and I want to solve problems for now */

function flowers() {
  for (i = 0; i <= 400; i += 100) {
    rectMode(CORNER);
    fill(63, 130, 109);
    noStroke();
    rect(i-10, 300, 20, 100);
    noStroke();
    fill(214, 107, 160);
    ellipse(i, 300, 100, 50);
    ellipse(i, 300, 50, 100);
    fill(235,197,92);
    circle(i, 300, 50);
  }
}

function bee() {
  time += .01; 
  let beeX = map(cos(time), -1, 1, 25, width - 25); 
  let chaos = map(beeX, 150, width-25, 0, 40); 
  chaos = max(0, chaos);
  let beeY = 150 + random(-chaos, +chaos);
  //stinger
  fill(0);
  triangle(beeX + random(-chaos, +chaos)-50, beeY-5, beeX + random(-chaos, +chaos)-50, beeY+5,beeX + random(-chaos, +chaos)-60, beeY);
  //bee body and stripes and eye
  noStroke();
  fill(235,197,92);
  ellipse(beeX + random(-chaos, +chaos), beeY, 100, 60);
  fill(0);
  rectMode(CENTER);
  rect(beeX + random(-chaos, +chaos), beeY, 15, 60);
  rect(beeX + random(-chaos, +chaos) + 30, beeY, 10, 45);
  rect(beeX + random(-chaos, +chaos) - 30, beeY, 10, 45);
  circle(beeX + random(-chaos, +chaos) +45, beeY-5,5);
  //wings
  push();
  translate(beeX + random(-chaos, +chaos), beeY);
  rotate(radians(-45));
  wingColor=color(255);
  wingColor.setAlpha(200);
  fill(wingColor);
  ellipse(30,-20,30,50);
  rotate(radians(45));
  ellipse(30,-40,30,50);
  pop();
  //beeline
  rect(beeX + random(-chaos, +chaos) - 100, beeY, 10,10);
  rect(beeX + random(-chaos, +chaos) - 80, beeY, 10,10);
  rect(beeX + random(-chaos, +chaos) - 120, beeY, 10,10);
  rect(beeX + random(-chaos, +chaos) - 140, beeY, 10,10);
  //antennas
  stroke(0);
  line(beeX + random(-chaos, +chaos) +45, beeY-15, beeX + random(-chaos, +chaos) +50, beeY-30);
  circle(beeX + random(-chaos, +chaos) +50, beeY-30,5);
  line(beeX + random(-chaos, +chaos) +45, beeY-15, beeX + random(-chaos, +chaos) +40, beeY-30);
  circle(beeX + random(-chaos, +chaos) +40, beeY-30,5);
}

function mouseClicked(){
  if (isSea){
    state = "garden";
    isSea = false;
    //isGarden = true;
  } 
  if (isGarden){
    state = "sea";
    isGarden = false;
    //isSea = true;
  }
}
/* I can only change the first sketch to the second one once and cannot change back */
