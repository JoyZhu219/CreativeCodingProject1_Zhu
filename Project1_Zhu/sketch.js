//Joy Zhu
//Project 1

let c1;
let c2;
let c3;
let positions = [];
let boat;


function setup() {
  createCanvas(400, 400); 
  boat = new ship(0,250);
  for (let u=0; u<200; u++) {
    let snowU = {
      x : random(0, width),
      y : random(-400, 0)
    }  
    positions.push(snowU);
  }
}



function draw() {
  background(0);
  
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
  } 
  boat.move();
  boat.display();
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

class ship(){
  constructor(x,y){
    this.x = x;
    this.y = y;
  }
  display(){
    c3 = color(65);
    fill(this.c3);
    //ship body
    beginShape();
    vertex(this.x,this.y);
    vertex(this.x+50,this.y+50);
    vertex(this.x+100,this.y+50);
    vertex(this.x+200,this.y);
    endShape();
    //fisherman head
    circle(this.x+130,this.y-50,10);
    //fisherman body
    beginShape();
    vertex(this.x+120,this.y-30);
    vertex(this.x+100,this.y);
    vertex(this.x+170,this.y);
    vertex(this.x+15,this.y-30);
    endShape();
    //fishing rod
    strokeWeight(3);
    line(this.x+140,this.y-20,this.x+220,this.y-70);
    line(this.x+220,this.y-70,this.x+230,this.y+40);
  }
  move(){
    if (this.x<=width){
      this.x += 5;
    }
  }
}