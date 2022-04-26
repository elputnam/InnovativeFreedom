let mgr;
let list1 = [];

function preload(){
  //Load list of json file names heartrate
  list1 = loadStrings('heartList.txt');
  // heartRate = loadJSON('data/heart_rate-2020-05-01.json')
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  mgr = new SceneManager();

  //Preload scenes
  mgr.addScene ( ViralTime );
  mgr.addScene ( BrashPhone );

  mgr.showNextScene();
}

function draw() {
  console.log(frameCount);
  mgr.draw();
}

function keyPressed(){
    // You can optionaly handle the key press at global level...
    switch(key)
    {
        case '1':
            mgr.showScene( ViralTime );
            break;
        case '2':
            mgr.showScene( BrashPhone );
            break;
        case '3':
            mgr.showScene( GlibDrive );
            break;
    }
  }
function reset(){
  frameCount = 0;
  }

//========================================================================
//=========================Scenes=========================================
//========================================================================


//==================Viral Time============================================

function ViralTime(){
  let phrase = ['Time' ,'is' , 'glitchy'];
  let i;
  let link;
  let start; 
  let link1;
  let link2;
  let link3;

this.setup = function() {
  //createCanvas(windowWidth, windowHeight);
  frameRate(20);
  frameCount = 0;
  //frameRate(10);
  i = 0;
  j = 0;
}

this.draw = function() {    
  background(random(30), 10);
  if (frameCount < 100){
    this.viralTime();
    }
  if (frameCount > 100){
      this.timeisGlitchy();
    }
  
    if (frameCount == 200){
      reset();
    }
  }

  this.viralTime = function() {
    if (frameCount%6==0){
      let num = 20;
      push();
      translate(width / 2, height / 2);
      let cir = (360 / num) * (frameCount % num);
      rotate(radians(random(cir)));
      noStroke();
      fill(random(150, 300), random(360), random(360), 50);
      circle(width*.1, 0, width*.07);
      pop();
  
    //wobbly lines
    stroke(random(0, 100), 100, 360);
    line(random(100), 0, random(100), height);
    line(width - random(200), 0, width - random(200), height);
    line(0, random(200), width, random(200));
    line(0, height - random(200), width, height - random(200));
      }
  }

  this.timeisGlitchy = function(){
    background(random(360), 100, 100, 5);
    textSize(random(10, 100))
    noStroke()
    fill(random(255))
    textFont('VT323');
    text(phrase[i], random(width), random(height));
    i += 1;
    if (i >= 3){
      i = 0;
    }
  }
}



//==================Brash Phone===========================================

function BrashPhone(){
  let swarm = [];
  let pix = [];
  let num;
  let heartRate = [];
  let B = 0;
  // let list1 = [];
  let bpm;
  let day;

 

  this.setup = function(){
    frameRate(25);
    num = height*0.3;
    for (let i = 0; i < num; i++) {
    swarm.push(new Screen());
    reset();
  }

    //select day 
    day = floor(random(1,131));
    heartRate = loadJSON(list1[day]);
    
  }

  this.draw = function(){
    background(320, 50, 100, 10);
    if (frameCount <= 200){
      this.throbber();
    }

    if (frameCount >= 200){
    //screens
    for (let i = 0; i < swarm.length; i++) {
      swarm[i].run();
    }

    //heartrate data mapping
    bpm = heartRate[B].value['bpm'];
    colA = map(bpm, 60, 170, 0, 360);
    colB = map(bpm, 60, 170, 0, 100);
    len = map(bpm, 60, 170, 100, 500);
    // sw = map(bpm, 60, 170, 10, 1);
    SB1 = map(bpm, 60, 170, 40, 100);
    SB2 = map(bpm, 60, 170, 100, 40);
    B += 1;

    //pixels
    pix.push(new Pixel(createVector(mouseX, mouseY)));
    for(let i = pix.length - 1; i >= 0; i--){
      let p = pix[i];
      p.run();
      if (p.ghost()){
        pix.splice(i, 1);
        }
      }
     }
    }

    this.throbber = function(){
      if (frameCount%6==0){
        let num = 20;
        push();
        translate(width / 2, height / 2);
        let cir = (360 / num) * (frameCount % num);
        rotate(radians(random(cir)));
        noStroke();
        fill(random(50,150), random(100), random(100));
        circle(width*.1, 0, width*.07);
        pop();
      }
    }

    class Screen {
      constructor() {
        this.loc = createVector(random(width), random(height));
        this.vel = createVector(0, 0);
        this.ts = 5;
        this.len = random(20);
        this.shade = random(100);
        //this.vel.mult((random(-1, 1)));
      }
    
      run() {
        this.edges();
        this.update();
        this.display();
      }
      edges(){
        if (this.loc.x < 0) {
          this.loc.x = mouseX;
          this.loc.y = mouseY;
          }
        if (this.loc.x > width) {
          this.loc.x = mouseX;
          this.loc.y = mouseY;
          }
        if (this.loc.y < 0) {
          this.loc.x = mouseX;
          this.loc.y = mouseY;
          }
        if (this.loc.y > height) {
          this.loc.x = mouseX;
          this.loc.y = mouseY;
          }
      }
      update() {
        this.spot = createVector(mouseX, mouseY)
       this.force = p5.Vector.sub(this.spot, this.loc);
        this.accel = createVector(random(-2, 2), random(-2, 2));
        this.accel.sub(this.force);
        //this.force = p5.Vector.add(this.loc, this.repel);
        this.vel.add(this.accel);
        this.vel.limit(this.ts);
        this.loc.add(this.vel);
        this.force.mult(0)
      }
    
      display() {
        noFill();
        strokeWeight(1);
        stroke(this.shade);
        for (let i = 0; i < this.len; i++) {
          circle(this.loc.x, this.loc.y, 5 * i);
        }
      }
    }
    
    class Pixel{
      constructor(loc){
        this.hue = random(70);
        this.lum = 50;
        this.loc = loc.copy();
        // this.len = random(10, len);
        this.len = len;
      }
      run(){
        this.update();
        this.display();
      }
      
      update(){
        this.lum -= 0.5;
        this.H1 += 1;
      }
      
      display(){
        rectMode(CENTER);
        // noStroke();
        // strokeWeight(sw);
        stroke(random(100), this.lum)
        // stroke(colB, this.lum);
        fill(colA, random(100), random(100), this.lum)
        //fill(this.hue, random(100), random(100), this.lum);
        square(this.loc.x, this.loc.y, this.len);
      }
      
      ghost(){
        if (this.lum < 0.0){
          return true;
        } else {
          return false;
        }
      }
    }    
  }

//==================Ferocious Patience====================================

//==================Glib Drive============================================

function GlibDrive(){
  let heartRate = [];
  let B = 0;
  //let list1 = [];
  let j = 0;
  let colA = 0;
  let colB = 300;
  let tau = 0;
  let swarm = [];
  var num;


this.setup = function() {
  reset();
  frameRate(15);
  num = height*.3;
  j = 0;
  //console.log(list1);
  //call random file name (not working)
  let day = int(random(1,131));
  heartRate = loadJSON(list1[day]);
  //heartRate = loadJSON(list1[10]);
  console.log(list1[day]);
  //console.log(list1[10]);
  //heartRate = loadJSON('data/heart_rate-2020-05-01.json')
  
  for (let i = 0; i < num; i++){
    swarm.push(new Element())
  }
}

this.draw = function() {
  background(random(30), 10);
  //heartFetch();
  // debugger
  print(frameCount);
 
  if (frameCount >= 150){
    bpm = heartRate[B].value['bpm'];
    colA = map(bpm, 60, 170, 0, 360);
    colB = map(bpm, 60, 170, 360, 0);
    B += 1;

    push();
    let inc = random(-2,2);
    translate(width*.5+inc, height*.5+inc);
    inc += inc;
    let num = 300;
    tau = (360/num) * (frameCount % num);
    this.screens();
    pop();
  }

  //circleSwarm
  for (let i = 0; i < swarm.length; i++){
    noStroke();
    //color blend based on mouse location
    let col1 = map(mouseX, 0, width, 0, 360);
    let col2 = map(mouseY, 0, height, 360, 0);
    let blender = map(mouseX, 0, width, 0, 1);
    let H3 = lerp(col1, col2, blender);
    fill(H3, random(100), random(100))
    swarm[i].oscillate();
    swarm[i].display();
    }
}

this.overlay = function(){
  let w = width - (200);
  let h = height - (200);
  for (let i = -w / 2; i < w/2; i+=5){
    line(i, -h /2 , i, h/2 );
  }
}

this.screens = function(){
  //shape 1
  strokeWeight(1);
  push();
  //let H1 = (map(mouseX, 0, width, 300, 200));
  rotate(radians(-tau));
  stroke(colA, 100, 100);
  this.overlay();
  pop();

  //shape 2
  push();
  //let H2 = (map(mouseX, 0, height, 250, 340));
  stroke(colB, random(100), random(100));
  scale(0.65);
  rotate(radians(tau));
  this.overlay();
  pop();
}



class Element{
  constructor(){
    this.angle = createVector();
    this.vel = createVector(random(-0.05, 0.05), random(-0.05, 0.05));
    this.amp = createVector(random(20, width), random(20, height));
  }

  oscillate() {
    this.angle.add(this.vel);
  }

  display() {
    let x = sin(this.angle.x) * this.amp.x;
    let y = sin(this.angle.y) * this.amp.y;
    ellipse(mouseX + x, mouseY + y, random(10));
    }
  }
}


