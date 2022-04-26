let mgr;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);

  mgr = new SceneManager();

  //Preload scenes
  mgr.addScene ( ViralTime );
  //mgr.addScene ( Animation3 );

  mgr.showNextScene();
}

function draw() {
  mgr.draw();
}

function keyPressed(){
    // You can optionaly handle the key press at global level...
    switch(key)
    {
        case '1':
            mgr.showScene( ViralTime );
            break;
        // case '2':
        //     mgr.showScene( ViralTime );
        //     break;
        // case '3':
        //     mgr.showScene( Animation3 );
        //     break;
    }
  }
//========================================================================
//=========================Scenes=========================================
//========================================================================


//==================Viral Time=======================================

function ViralTime(){
  let phrase = ['Time' ,'is' , 'glitchy'];
  let i;
  let link;
  let start; 
  let link1;
  let link2;
  let link3;

this.setup = function() {
  createCanvas(windowWidth, windowHeight);
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
