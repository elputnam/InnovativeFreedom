//Innovative Freedom, part of Emergent
//Randomly cycles through Viral Time, Brashphone, Glib Drive, and Ferocious Patience
//uses webcam

//p5.scenemanager variable
let mgr;

//heartrate data list
let list1 = [];

//Andorid Dream variables
let list2 = []; //list of months
let dreamText = []; //poem
var awakeFace;
var lightFace;
var deepFace;
var remFace;

//Indeterminate System Variables
var photos = [];

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
  //Load list of json file names sleep
  list2 = loadStrings('dataList.txt');
  //Load poem text
  dreamText = loadStrings('disruptedDreams.txt');
  //load images
  awakeFace = loadImage("images/AndroidDream-4.jpg");
  lightFace = loadImage("images/AndroidDream-3.jpg");
  deepFace = loadImage("images/AndroidDream-1.jpg");
  remFace = loadImage("images/AndroidDream-2.jpg");
  for (let i = 1; i < 91; i++){
    photos[i] = loadImage("images/maternalDance-" + i + ".png");
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
  mgr.addScene ( HeartGrid );
  mgr.addScene ( AndroidDream );
  mgr.addScene ( IndeterminateSystem );

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
        case '6':
          reset();
          mgr.showScene( HeartGrid );
          break;
        case '7':
          reset();
          mgr.showScene( AndroidDream );
          break;
        case '8':
          reset();
          mgr.showScene( IndeterminateSystem );
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
  let chance = floor(random(1,9));
  
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
  } else if (chance == 6){
    mgr.showScene(HeartGrid);
  } else if (chance == 7){
    mgr.showScene(AndroidDream);
  } else if (chance == 8){
    mgr.showScene(IndeterminateSystem);
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
  // frameRate(20);
  frameCount = 0;
  //frameRate(10);
  i = 0;
  j = 0;
}

this.draw = function() {    
  if (frameCount == 1){
    frameRate(20);
  }
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
    textFont('Titillium Web')
    text(phrase[i], random(width), random(height));
    i += 1;
    if (i >= 3){
      i = 0;
    }
  }
}



//==================Brash Phone===========================================

function BrashPhone(){
  let dance = [];
  let swarm = [];
  let pix = [];
  let num;
  let heartRate = [];
  let B = 0;
  // let list1 = [];
  let bpm;
  let day;
  // Oscillate variables
  let spot;
  let vel;
  let colA;
  let colB;

  this.setup = function(){
    reset();
    createCanvas(windowWidth, windowHeight);
    frameRate(25);
    num = height*0.2;
    for (let i = 0; i < num; i++) {
        swarm.push(new Screen());
      }
    for (let i = 0; i < num; i++){
        dance.push(new Lattice());
    }
    spot = createVector(width/2, height/2);
    vel = createVector(0,0);
  

    //select day 
    day = floor(random(1,131));
    heartRate = loadJSON(list1[day]);
    
  }

  this.draw = function(){
    if (frameCount == 1){
      frameRate(20);
    }
    if (frameCount < 200){
      background(random(150,250), 50, 100, 10);
      this.noise();
    }

    if (frameCount >= 200){
    background(colA+100, 50, 100, 10);
    //screens
    for (let i = 0; i < swarm.length; i++) {
      swarm[i].run();
    }

    //heartrate data mapping
    bpm = heartRate[B].value['bpm'];
    colA = map(bpm, 60, 170, 0, 180);
    colB = map(bpm, 60, 170, 180, 360);
    len = map(bpm, 60, 170, 100, 500);
    // sw = map(bpm, 60, 170, 10, 1);
    SB1 = map(bpm, 60, 170, 40, 100);
    SB2 = map(bpm, 60, 170, 100, 40);
    B += 1;

    //move
    let accel = p5.Vector.random2D();
    accel.mult(random(2));
    vel.add(accel);
    vel.limit(3);
    spot.add(vel);

    if (spot.x > width){
      spot.x = 0;
    } else if (spot.x < 0) {
      spot.x = width;
    } else if (spot.y > height){
      spot.y = 0;
    } else if (spot.y < 0){
      spot.y = height;
    }

    //pixels
    pix.push(new Pixel(createVector(spot.x, spot.y)));
    for(let i = pix.length - 1; i >= 0; i--){
      let p = pix[i];
      p.run();
      if (p.ghost()){
        pix.splice(i, 1);
        }
      }
     
     }

     if (frameCount == 1000){
      changeScene();
      // reset();
      }
    }

    this.noise = function(){
      // noStroke();
      // noFill()
      for (let i = 0; i < dance.length; i++) {
        dance[i].edges();
        dance[i].step();
        dance[i].display();
      }
    }
    
    class Lattice{
        constructor(){
        //this.loc = createVector(width/2,height/2);
          this.loc = createVector(width/2, height/2);
          this.len = random(20, 60);
          this.H = 0;
        }
      
        display(){
          //lines
          strokeWeight(random(1, 5));
          //fill(H-50, random(100), random(360), 0.2);
          //stroke(this.H);
          stroke(0, 100, random(20));
          noFill();
          beginShape();
          vertex(this.loc.x, this.loc.y);
          vertex(this.loc.x + this.len + random(-5, 5), this.loc.y + random(-5, 5));
          vertex(this.loc.x + this.len + random(-5, 5), this.loc.y + this.len + random(-5, 5));
          endShape();
        }
      
        edges(){
          if (this.loc.x <= 0){
              this.loc.x += 5
          }
          if (this.loc.x >= width){
              this.loc.x -= 5
          }
          if (this.loc.y <= 0){
              this.loc.y += 5
          }
          if (this.loc.y >= height){
            this.loc.y -= 5
            }
          if (this.H >= 150){
            this.H = 0;
          }
          }
      
        step(){
          this.H += random(10);
          let choice = floor(random(4));
          if (choice == 0){
              this.loc.x+= random(5,20);
          }
          else if (choice == 1){
              this.loc.x -= random(5,20);
          }
          else if (choice == 2){
              this.loc.y += random(5,20);
          } else {
            this.loc.y -= random(5,20);
            }
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
          // this.loc.x = mouseX;
          // this.loc.y = mouseY;
          this.loc.x = spot.x;
          this.loc.y = spot.y;
          }
        if (this.loc.x > width) {
          // this.loc.x = mouseX;
          // this.loc.y = mouseY;
          this.loc.x = spot.x;
          this.loc.y = spot.y;
          }
        if (this.loc.y < 0) {
          // this.loc.x = mouseX;
          // this.loc.y = mouseY;
          this.loc.x = spot.x;
          this.loc.y = spot.y;
          }
        if (this.loc.y > height) {
          // this.loc.x = mouseX;
          // this.loc.y = mouseY;
          this.loc.x = spot.x;
          this.loc.y = spot.y;
          }
      }
      update() {
        //this.spot = createVector(mouseX, mouseY)
      //  this.force = p5.Vector.sub(this.spot, this.loc);
       this.force = p5.Vector.sub(spot, this.loc);
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
        stroke(colB, this.shade, this.shade);
        for (let i = 0; i < this.len; i++) {
          circle(this.loc.x, this.loc.y, 5 * i);
        }
      }
    }
    
    class Pixel{
      constructor(loc){
        this.hue = random(70);
        this.lum = 20;
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
        // stroke(random(100), this.lum)
        // stroke(colB, this.lum);
        fill(colA, random(100), random(100), this.lum)
        noStroke();
        //fill(this.hue, random(100), random(100), this.lum);
        // square(this.loc.x, this.loc.y, this.len);
        square(spot.x, spot.y, this.len);
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
      if (frameCount == 1){
        frameRate(15);
      }

      //loading screen
      if (frameCount < 100){
        // background(random(360), 100, 10, 10);
        background(0);
        this.uncertainFoal();
        }
      
      //show text 
      if (frameCount==100){
        num_days = Object.keys(lightActive).length;
        background(0);
        textSize(50);
        fill(255);
        textAlign(LEFT);
        text('lightly active', width*.05, height*0.2);
        text('very active', width*.55, height*0.3);
        text('moderately active', width*.05, height*0.6);
        text('sedentary', width*.55, height*0.8);
        // print(num_days);
        // num_steps = Object.keys(stepCount).length;
      }

      //clear background
      if (frameCount==150){
        background(0);
      } 

      //start animation
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
  let H3 = 0;
  let tau = 0;
  let swarm = [];
  var num;
  let spot;


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
  spot = createVector(width/2, height/2);
  for (let i = 0; i < num; i++){
    swarm.push(new Element())
  }
}

this.draw = function() {
  if (frameCount == 1){
    frameRate(15);
  }

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
    // let col1 = map(mouseX, 0, width, 0, 360);
    // let col2 = map(mouseY, 0, height, 360, 0);
    // let blender = map(mouseX, 0, width, 0, 1);
    // let H3 = lerp(col1, col2, blender);
    fill(H3, random(100), random(100))
    swarm[i].oscillate();
    swarm[i].display();
    }

  if (frameCount == 500){
    changeScene();
  }
  H3 += 1;
  if (H3 == 360){
    H3 = 0;
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
    // spot.add = random(-2,2);
  }

  display() {
    let x = sin(this.angle.x) * this.amp.x;
    let y = sin(this.angle.y) * this.amp.y;
    ellipse(spot.x + x, spot.y + y, random(10));
    }
  }
}

//==================Tether================================================

function Tether(){
  let dance = [];
  let num;
  let loc;
  let pinkNoise; 

  this.setup = function() {
    reset();
    createCanvas(windowWidth, windowHeight);
    frameRate(15);
    background(random(30));
    loc = createVector(width/2, height/2);
    num = height*0.05;
    j = 0;
    pinkNoise = new p5.Noise('pink');
    pinkNoise.start();
    
    
    for (i = 0; i < num; i++){
      dance.push(new Element());
    }
  }
  
  this.draw = function() {
    if (frameCount == 1){
      frameRate(15);
    }

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

  // this.scribble = function(){
  //   noFill();
  //   for (i = 0; i < num; i++){
  //     stroke(random(300,360), random(0,100), 100);
  //     curveTightness(random(3,6));
  //     // curve(random(width), random(height), mouseX, mouseY, mouseX, mouseY,random(width), random(height));
  //     }
  // }

  this.scribble = function(){
      noFill();
      for (i = 0; i < num; i++){
            stroke(random(300,360), random(0,100), 100);
            curveTightness(random(3,6));
            curve(random(width), random(height), loc.x, loc.y, loc.x, loc.y, random(width), random(height));
      }
      loc.add(random(-5, 5), random(-5,5));

      if (loc.x > width){
        loc.x = 0;
      } else if (loc.x < 0){
        loc.x = width;
      } else if (loc.y > height) {
        loc.y = 0;
      } else if (loc.y < 0) {
        loc.y = height;
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
      line(this.loc.x, this.loc.y, loc.x, loc.y);
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


//==================Heart Grid============================================

function HeartGrid(){
  let x1 = 0;
  let y1 = 0; 
  let heartRate = [];
  let heart;
  let B = 0;
  let c = 0;
  let cr = 0; 
  let s = 0;
  let b;

  //pixel grid variable
  let tileCount;

  //sound
  let osc;
  let amp = 0;
  let freq = 0;
  
  this.setup = function() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 100);
    background(170, 50, 100);
    let day = int(random(1,131));
    heartRate = loadJSON(list1[day]);
    x1 = width/2;
    y1 = height/2;
    frameRate(25);
    
    //set up sound
    osc = new p5.TriOsc(); // set frequency and type
    osc.amp(amp);
    osc.start();
  }
  
  this.draw = function() {
    if (frameCount == 1){
      frameRate(25);
    }

    if (frameCount <= 100){
      // background(170, 50, 100);
      fill(random(255), random(100));
      noStroke();
      circle(random(width), random(height), random(100, 200))
    }
    
    if (frameCount >= 100){
    //read heartRate data
    let bpm = heartRate[B].value['bpm'];
    freq = map(bpm, 60, 170, 40, 200);
    amp = 0.5
    osc.amp(amp);
    osc.freq(freq);
    let b = map(bpm,60,170,10,255)
    let sw = map(bpm,60,170,3,5)
    B += 1;
  
    //squares
    choice = int(random(1, 4.5));
    let x2 = x1 + 50;
    let y2 = y1 + 50;
    let a = 5;
    strokeWeight(sw);
    stroke(s, random(360), random(360), b);
    line(x1-random(-a,a), y1-random(-a,a),
           x2+random(-a,a), y1-random(-a,a));
      line(x2+random(-a,a), y1-random(-a,a),
           x2+random(-a,a), y2+random(-a,a));
      line(x2+random(-a,a), y2+random(-a,a),
           x1+random(-a,a), y2+random(-a,a));
      line(x1+random(-a,a), y2+random(-a,a),
           x1+random(-a,a), y1+random(-a,a));
  
    //square movement
    if (choice == 1){
      x1 += 25;
    } 
    if (choice == 2){
      x1 -= 25;
    }
    if (choice == 3){
      y1 += 25;
    }
    if (choice == 4){
      y1-=25;
    }
  
    //reset
    if (x1 < 0){
      x1 = random(width);
    }
    if (y1 < 0){
      y1 =random(height);
    }
    if (x2 > width){
      x1 = random(width);
    }
    if (y2 > height){
      y1 =random(height);
    }
    
    
    //color change
    s += 1;
      if (s == 360){
          s = 0
      }
    }

    if (frameCount == 500){
    changeScene();
    }
  }

this.grid = function() {
  for (let gridY = 0; gridY < tileCount; gridY++) {
    for (let gridX = 0; gridX < tileCount; gridX++) {
      let posX = (width / tileCount) * gridX;
      let posY = (height / tileCount) * gridY;

      //introduce random choice between three
      let toggle = floor(random(1, 3));

      if (toggle == 1) {
        stroke(random(180, 360), random(100), random(100));
      
        line(posX, posY, posX + width/tileCount, posY + height
        );
      }
      
      if (toggle == 2) {
        fill(random(180), random(100), random(100));
        square(
          random(posX, posX + width / tileCount),
          random(posY, posY + height / tileCount),
          random(tileCount)
          );
        }
      }
    }
  }
}

//==================Android Dream=========================================

function AndroidDream(){
  //Spiral animation
  let rad = 0; //cycling circles 
  let x = 0; // start for circle

  //Cycling through sleep data
  let sleep, night_data;
  let num_nights; // number of nights of data
  let new_night = true; // starting data for a new night
  let night_index = 0; // index for each night
  let night_data_length; // number of data points for a night
  let night_data_index; // index for data points for a night
  var sat; //saturation of background
  var alp; //alpha of background

  //text
  let title = ['sleep', 'between', 'disrupted', 'dreams']
  var xT;
  var yT;
  let j = 0;
  let t = 4;

  //sound
  let osc;
  let amp = 0;
  let freq = 0;

  this.setup = function() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB, 360, 100, 100, 100);
    frameRate(8);
    maxCount = height*.25;

    //text set up
    xT = width*.5;
    yT = height*.1;
    
    //select month
    let month = int(random(14));
    // print(month);
    sleep = loadJSON(list2[month]);
    // console.log(Object.keys(sleep))
    
    // print(month, num_nights);
    //grid
    //tileCount = height/30;

    //set up sound
    osc = new p5.TriOsc(); // set frequency and type
    osc.amp(amp);
    osc.start();
  }

    this.draw = function() {
    //initial background and rest frameRate
    if (frameCount == 1){
      background(10);
      frameRate(8);
      j = 0;
      yT = height*.1;
  
    }
    //set up to read through data
    if (frameCount == 100){
      num_nights = Object.keys(sleep).length;
      print(num_nights);
    }
    //loading screen animation
    if (frameCount < 250){  
      background(10, 10);
      this.circles();
      if (frameCount%15==0 ){
        textFont('Titillium Web')
        textSize(55);
        noStroke();
        fill(200);
        textAlign(CENTER);
        text(title[j], xT, yT);
        j += 1;
        yT += 70;
        }

    }

    //sleep mapping - use data to generate sound and animation
    if (frameCount > 200){
      if (new_night) {
        // starting a new night of data
        night_data = sleep[night_index]["levels"]["data"];
        night_data_length = night_data.length;
        new_night = false;
        night_data_index = 0;
    }
      this.sleepMapping();

    //display poem; after cycles through once starts again at random location
    if (frameCount >= 250){
      if (frameCount%20==0){
      textSize(45);
      noStroke();
      textAlign(RIGHT);
      xT = random(width*.6, width);
      yT = random(height * .8, height);
      // fill(200)
      // rect(0, yT-50, xT+20, height* .2)
      fill(200);
      text(dreamText[t], xT, yT);
        
      t += 1;
      }

      if (t == 23){
        t = int(random(22));
      }
    }
  }
  
  if (frameCount == 500){
    changeScene();
  }
    rad += 1; //increase circle path

    if (rad == 1000){
      rad = 0;
    }

  }

  this.circles = function(){
    //circles
    x = rad;
    let y = 0;
    push();
    translate(width*.5, height*.7);
    let num1 = 30
    let cir = (360 / num1) * (frameCount % num1);
    rotate((radians(cir)));
    for (let i = 0; i < height*.08; i++){
      noFill();
      strokeWeight(random(3));
      stroke(random(250, 300), random(100), random(100));
      // fill(random(255), 5)
      circle(random(x), random(y), 5*i);
    }
    pop();
  }

  this.sleepMapping = function(){
    // sleep level mapping
    let sleepLevel = night_data[night_data_index]["level"];
    let dateTime = night_data[night_data_index]["dateTime"];
    
    let duration = night_data[night_data_index]["seconds"];
    sat = map(duration, 0, 7000, 1, 100);
    alp = sat;
    osc.freq(freq);
    amp = map(duration, 0, 7000, 0.05, 0.5);
    osc.amp(amp);
    print(sleepLevel, duration);

    if (sleepLevel == ["wake"]){
      background(0, 100, sat, alp);
      tint(200, sat, 100, alp);
      image(awakeFace, width/2, 0, width/2, height);
      //sound
      freq = 600;
      

  }

  if (sleepLevel == ["deep"]){
    background(100, 100, sat, alp);
    tint(300, sat, 100, alp);
    image(deepFace, width/2, 0, width/2, height);
    //sound
    freq = 40;
    // amp = 0.05;
    
  }
  if (sleepLevel == ["light"]){
    background(200, 100, sat, alp);
    tint(0, sat, 100, alp);
    image(lightFace, width/2, 0, width/2, height);
    //sound
    freq = 200;
    // amp = 0.1;

  }

  if (sleepLevel == ["rem"]){
    background(300, 100, sat, alp);
    tint(100, sat, 100, alp);
    image(remFace, width/2, 0, width/2, height);
    //sound
    freq = 400;
    // amp = 0.3;
    }

  if (sleepLevel == ["restless"]){
    background(255);
    // tint(100, sat, 100, alp);
    image(remFace, width/2, 0, width/2, height);
    
  }

  if (sleepLevel == ["asleep"]){
    background(0);
    // tint(200, sat, 100, alp);
    image(deepFace, width/2, 0, width/2, height);
  }

    //Counter loop
    //display night
    fill(10);
    textSize(40);
    noStroke();
    textAlign(LEFT);
    text(dateTime, 40, 40);
    // text("Night: " + night_index + " Reading: " + night_data_index, 40, 80);
    textAlign(RIGHT);
    text(sleepLevel, random(width*.15, width*.5), random(120, height-50));

    night_data_index += 1;
    if (night_data_index == night_data_length) {
    // have processed all data for a night
    new_night = true;
    night_index += 1;
    // are there any more nights?
    if (night_index == num_nights) {
      night_index = 0;
      new_night = true;
      night_data_index = 0;
      }
    }
  }
}

//==================Indeterminate System==================================

function IndeterminateSystem(){
  var img; 

this.setup = function() {
    createCanvas(windowWidth, windowHeight);
    frameRate(20);
  }

this.draw = function() {
  if (frameCount == 1){
    frameRate(20);
  }
    // background(175, random(100), random(100), 10);
    let num = int(random(1, 90));
    tint(random(165, 190), 100, 100, random(100));
    image(photos[num], 0, 0, width, height);
  
    if (frameCount == 500){
      changeScene();
    }
  }
}