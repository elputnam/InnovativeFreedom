//p5.scenemanager variable
let mgr;

//heartrate data list
let list1 = [];

//Lists of Months
let lightList = []; //lightly active minutes
let moderateList = []; //moderately active minutes
let veryList = []; //very active minutes
let sedentaryList = []; //sedentary minutes

//image arrays 
let sedImages = [];
let lowImages = [];
let midImages = [];
let highImages = []

function preload(){
  //Load list of json file names heartrate
  list1 = loadStrings('heartList.txt');
  // heartRate = loadJSON('data/heart_rate-2020-05-01.json')

  //Load list of json file names activity minutes
  lightList = loadStrings('lightlyActive-dataList.txt');
  moderateList = loadStrings('moderatelyActive-dataList.txt');
  veryList = loadStrings('veryActive-dataList.txt');
  sedentaryList = loadStrings('sedentary-dataList.txt');
  
  // images for Ferocious Patience
  for (let i = 1; i < 16; i++){
    sedImages[i] = loadImage("data/images/sedentary-" + i + ".png");
  } 
  for (let j = 1; j < 7; j++){
    lowImages[j] = loadImage("data/images/low-" + j + ".png");
  }  
  for (let k = 1; k < 8; k++){
    midImages[k] = loadImage("data/images/mid-" + k + ".png");
  }
  for (let l = 1; l < 19; l++){
    highImages[l] = loadImage("data/images/high-" + l + ".png");
  }    
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  reset();
  mgr = new SceneManager();

  //Preload scenes
  mgr.addScene ( ViralTime );
  mgr.addScene ( BrashPhone );
  mgr.addScene ( GlibDrive );
  mgr.addScene ( FerociousPatience );
  mgr.addScene ( Tether );

  mgr.showNextScene();
}

function draw() {
  console.log(frameCount);
  mgr.draw();
}

//resets framecount
function reset(){
  frameCount = 0;
  }

//change between scenes with keyboard
function keyPressed(){
    switch(key)
    {
        case '1':
          reset();
          mgr.showScene( ViralTime );
          break;
        case '2':
          reset();
          mgr.showScene( BrashPhone );
          break;
        case '3':
          reset();
          mgr.showScene( GlibDrive );
          break;
        case '4':
          reset();
          mgr.showScene( FerociousPatience );
          break;
        case '5':
          reset();
          mgr.showScene( Tether );
          break;
    }
  }

//resize canvas when window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  }

//changes between scenes automatically and randomly
function changeScene(){
  reset();
  let chance = floor(random(1,6));
  
  if (chance == 1){
  mgr.showScene(BrashPhone);
  } else if (chance == 2){
    mgr.showScene( GlibDrive );
  } else if (chance == 3) {
    mgr.showScene( FerociousPatience );
  } else if (chance == 4) {
    mgr.showScene( ViralTime );
  } else if (chance == 5){
    mgr.showScene( Tether );
  }
}

//========================================================================
//=========================Scenes=========================================
//========================================================================


//==================Viral Time============================================

function ViralTime(){
  let phrase = ['Time' ,'is' , 'glitchy'];
  let i;

this.setup = function() {
  reset();
  createCanvas(windowWidth, windowHeight);
  frameRate(20);
  frameCount = 0;
  //frameRate(10);
  i = 0;
  j = 0;
}

this.draw = function() {    
  background(random(30), 10);
  strokeWeight(1);
  if (frameCount < 250){
    this.viralTime();
    }
  if (frameCount > 250){
      this.timeisGlitchy();
    }
  
    if (frameCount == 500){
      changeScene();
    }

    if (frameCount == 501){
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
    reset();
    createCanvas(windowWidth, windowHeight);
    frameRate(25);
    num = height*0.3;
    for (let i = 0; i < num; i++) {
    swarm.push(new Screen());
  }

    //select day 
    day = floor(random(1,131));
    heartRate = loadJSON(list1[day]);
    
  }

  this.draw = function(){
    background(320, 50, 100, 10);
    if (frameCount < 200){
      this.noise();
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
     if (frameCount == 500){
      changeScene();
      // reset();
    }
    }

    this.noise = function(){
      // noStroke();
      noFill()
      strokeWeight(random(5));
      stroke(random(175,360), random(100), random(100));
      for (let l = 0; l < 500; l++){
        // for (let j = 0; j < 10; j++)
        circle(random(width), random(height), random(100));
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

function FerociousPatience(){
    let back;

    //uncerain foal variables
    var tileCount;
    var locx;
    var locy;
    let a = 0;

    // Daily Cycle - variables for selceting and cycling throguh days
    let lightActive = [];
    let  moderateActive = [];
    let veryActive = []; 
    let notActive = [];
    let light_data, very_data, moderate_data, sedentary_data;
    let num_days; // number of days of data
    let day_num = 0;

    let light, very, moderate, sedentary;

    this.setup = function(){
      // if (windowWidth > windowHeight){
      //   createCanvas(windowHeight, windowHeight);
      // } else {
      //   createCanvas(windowWidth, windowWidth);
      // }
      reset();
      background(0, 100, 10);
      frameRate(15);

      //Uncertain Foal Setup
      tileCount = height*0.07
      locx = width/2;
      locy = height/2;

      //select month
      let month = int(random(18));
      print(month);
      lightActive = loadJSON(lightList[month]);
      moderateActive = loadJSON(moderateList[month]);
      veryActive = loadJSON(veryList[month]);
      notActive = loadJSON(sedentaryList[month]);
    }

    this.draw = function(){
    if (frameCount < 100){
      // background(random(360), 100, 10, 10);
      background(0);
      this.uncertainFoal();
      }

    if (frameCount==100){
      num_days = Object.keys(lightActive).length;
      background(0);
      textSize(50);
      fill(255);
      text('lightly active', width*.05, height*0.2);
      text('very active', width*.55, height*0.3);
      text('moderately active', width*.05, height*0.6);
      text('sedentary', width*.55, height*0.8);
      // print(num_days);
      // num_steps = Object.keys(stepCount).length;
    }

    if (frameCount==150){
      background(0);
    } 

    if (frameCount > 150){
      light = lightActive[day_num]['value'];
      very = veryActive[day_num]['value'];
      moderate = moderateActive[day_num]['value'];
      sedentary = notActive[day_num]['value'];
      back = map(very, 0, 50, 175, 0);
      day_num += 1;
      this.activityMapping();

      if (day_num >= num_days){
        day_num = 0;
        }
      }
      if (frameCount == 500){
        changeScene();
        reset();
      }
    }

    this.uncertainFoal = function(){
        for (let gridY = 0; gridY < tileCount; gridY++) {
          for (let gridX = 0; gridX < tileCount; gridX++) {
            let posX = (width / tileCount) * gridX;
            let posY = (height / tileCount) * gridY;
            noStroke();
            //ellipse(posX, posY, width/tileCount, height/tileCount);
            ellipse(posX, posY, height/tileCount);

            var toggle = floor(random(1, 150));
            if (toggle == 10){
               fill(random(10), 100, 100, 100);
          } else {
            fill(random(10), 100, 100, random(30));
            }
          
            }
          }
        }

    this.activityMapping = function(){
        noStroke();
        //let s = random(100);
        //let l = random(100);
        let s = 100;
        let l = 100;
          // lightly active
          let a = map(light, 0, 1200, 175, 360);
          let alp1 = map(light, 0, 1500, 0, 100);
          let w1 = map(light, 0, 400, 0, width);
          let numA = int(random(1, 6));
          let lightImage = int(map(light, 0, 1500, 1, 6)); 
          // fill(a, s, l, w1);
          // rect(0 + w1, 0, width/2, height/2);
          tint(a, alp1, l, alp1);
          image(lowImages[lightImage], 0, 0, width/2, height/2)
      
          // very active
          let b = map(very, 0, 1200, 175, 360);
          let w2 = map(very, 0, 1500, 0, width);
          let numB = int(random(1, 18));
          let alp2 = map(very, 0, 1500, 0, 100);
          let veryImage = int(map(very, 0, 200, 1, 18)) 
          // fill(b, s, l, w2);
          tint(b, alp2, l, alp2)
          // rect(width/2-w2, 0, width/2, height/2);
          image(highImages[veryImage], width/2, 0, width/2, height/2)
          
          
          // sedentary
          let d = map(sedentary, 0, 1200, 175, 360);
          let w4 = map(sedentary, 0, 1500, 0, width);
          let alp4 = map(sedentary, 0, 1500, 0, 100);
          let numD = int(random(1, 15))
          let sedenImage = int(map(sedentary, 0, 1500, 1, 15)) 
          // fill(d, s, l, w4);
          tint(d, alp4, l, alp4);
          // rect(width/2-w4, height*.5, width/2, height/2);
          image(sedImages[sedenImage], width/2, height*.5, width/2, height/2);
      
            // moderately active
          let c = map(moderate, 0, 1200, 175, 360);
          let w3 = map(moderate, 0, 1500, 0, width);
          let alp3 = map(moderate, 0, 1500, 0, 100);
          let numC = int(random(1, 7));
          let modImage = int(map(moderate, 0, 200, 1, 7)) 
          // fill(c, s, l, w3);
          tint(c, alp3, l, alp3);
          // rect(0+w3, height*.5, width/2, height/2);
          image(midImages[modImage], 0, height*.5, width/2, height/2);    
    }
  }


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
  createCanvas(windowWidth, windowHeight);
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

  if (frameCount == 500){
    changeScene();
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

//==================Tether================================================

function Tether(){
  let dance = [];
  let num;

  this.setup = function() {
    reset();
    createCanvas(windowWidth, windowHeight);
    frameRate(15);
    background(random(30));
    num = height*0.05;
    j = 0;
    
    for (i = 0; i < num; i++){
      dance.push(new Element());
    }
  }
  
  this.draw = function() {
    background(random(30), 10);
    strokeWeight(1);
    print(frameCount);
    
    for (i = 0; i < dance.length; i++){
      dance[i].display();
      dance[i].update();
      dance[i].edges();
      }
    
    this.scribble();
    if (frameCount == 500){
      changeScene();
    }  
  }

  this.scribble = function(){
    noFill();
    for (i = 0; i < num; i++){
      stroke(random(300,360), random(0,100), 100);
      curveTightness(random(3,6));
      curve(random(width), random(height), mouseX, mouseY, mouseX, mouseY,random(width), random(height));
      }
  }

  class Element{
    constructor(){
      this.loc = createVector(random(width), random(height));
      this.vel = createVector(0,0);
      this.len = random(10,30);
      //this.len = random(width*0.03, width*0.07);
      this.ts = 3;
      this.a = 0;
    }
    
    display(){
      fill(random(200,300), random(360), random(360));
      //tethers
      stroke(random(0,100), random(0,100), 100, 50);
      line(this.loc.x, this.loc.y, mouseX, mouseY);
      //bodies
      stroke(0);
      rectMode(CENTER);
      circle(this.loc.x, this.loc.y, this.len);
    }
    
    update(){
      this.a = p5.Vector.random2D();
      //this.a.mult(random(4));
      this.a.mult(this.len*.3)
      //this.a = createVector(random(-.1, .1), random(-.1, .1));
      this.vel.add(this.a);
      this.vel.limit(this.ts);
      this.loc.add(this.vel);
    }
    
    edges(){
      if (this.loc.x > width) {
        this.loc.x = 0;
      }
      if (this.loc.x < 0) {
        this.loc.x = width;
      }
      if (this.loc.y > height) {
        this.loc.y = 0;
      }
      if (this.loc.y < 0) {
        this.loc.y = height;
      }
    }
    
  }
}