// copyright: based on "Bubbles 2" by  Daniel Erickson 2012
var WIDTH;
var HEIGHT;
var ZOOM = 2.0;
var N = 300*ZOOM;
var SPEED = 0.0003;
var FOCAL_LENGTH = 0.5;
var BLUR_AMOUNT = 70;
var MIN_BLUR_LEVELS = 2;
var BLUR_LEVEL_COUNT = 4;
var ZSTEP = 0.008;
let BACKGROUND;

class Bubble {
  
  constructor(ix, iy, iz, icolor) {
    this.x = ix;
    this.y = iy;
    this.z = iz;
    let randomRad = (random(10, 60));
    this.xsize = randomRad;
    this.ysize = randomRad;
    this.bubble_color = icolor;
    this.setColor();
    this.vx = random(-1.0, 1.0);
    this.vy = random(-1.0, 1.0);
    this.vz = random(-1.0, 1.0);
    let magnitude = sqrt(this.vx*this.vx + this.vy*this.vy + this.vz*this.vz);
    this.vx = SPEED * this.vx / magnitude;
    this.vy = SPEED * this.vy / magnitude;
    this.vz = SPEED * this.vz / magnitude;
  }
  

  
  setColor() {
    let shade = this.z;
    let shadeinv = 1.0-shade;
    this.shaded_color = color( (red(this.bubble_color)*shade)+(red(BACKGROUND)*shadeinv),
                    (green(this.bubble_color)*shade)+(green(BACKGROUND)*shadeinv),
                    (blue(this.bubble_color)*shade)+(blue(BACKGROUND)*shadeinv));
  }
  
  zoomIn(step) {
    this.z += step;
    if (this.z > 1.0) {
      this.z = 0.0 + (this.z-1.0);
    }
  }
  
  zoomOut(step) {
    this.z -= step;
    if (this.z < 0.0) {
      this.z = 1.0 - (0.0-this.z);
    }
  }
 
  update(doZoomIn, doZoomOut) {
    if (doZoomIn) {
      this.zoomIn(ZSTEP);
    }
    if (doZoomOut) {
      this.zoomOut(ZSTEP);
    }
    if (this.x <= 0) {
        this.vx = abs(this.vx);
        this.x = 0.0;
    }
    if (this.x >= 1.0) {
        this.vx = -1.0 * abs(this.vx);
        this.x = 1.0;
    }
    if (this.y <= 0) {
        this.vy = abs(this.vy);
        this.y = 0.0;
    }
    
    if (this.y >= 1.0) {
        this.vy = -1.0 * abs(this.vy);
        this.y = 1.0;
    }
    if (this.z < 0 || this.z > 1.0) {
        this.z = this.z % 1.0;
    }
    this.x += this.vx;
    this.y += this.vy;
    this.setColor();
  }
 
  draw(xoffs, yoffs) {
    let posX = (ZOOM*this.x*WIDTH*(1+this.z*this.z)) - ZOOM*xoffs*WIDTH*this.z*this.z;
    let posY = (ZOOM*this.y*HEIGHT*(1+this.z*this.z)) - ZOOM*yoffs*HEIGHT*this.z*this.z;
    let radius = this.z*this.xsize;
    if (posX> -this.xsize*2 && posX < WIDTH+this.xsize*2 && posY > -this.xsize*2 && posY < HEIGHT+this.xsize*2) {
        blurred_circle(posX, posY, radius, abs(this.z-FOCAL_LENGTH), this.shaded_color, MIN_BLUR_LEVELS + (this.z*BLUR_LEVEL_COUNT));
    }
  }
}

// This function will draw a blurred circle, according to the "blur" parameter. Need to find a good radial gradient algorithm.
 function blurred_circle(x,  y,  rad,  blur, col,  levels){
    let level_distance = BLUR_AMOUNT*(blur)/levels;
    for (let i=0.0; i<levels*2; i++) {
      col.setAlpha(255*(levels*2-i)/(levels*2))
      fill(col);
      ellipse(x, y, rad+(i-levels)*level_distance, rad+(i-levels)*level_distance);
    }
}


let objects = [];
function sortBubbles() {
   
    // Sort them (this ensures that they are drawn in the right order)
    let last = 0;
    let temp = [];
    for (let i=0; i<N; i++) {
        let index = 0;
        let lowest = 100.0;
        for (let j=0; j<N; j++) {
            let current = objects[j];
            if (current.z < lowest && current.z > last) {
                index = j;
                lowest = current.z;
            }
        }
        temp.push(objects[index]);
        last = objects[index].z;
    }
    objects = temp;
}

let zoomIn = false;
let zoomOut = false;
let xoffs = 0;
let yoffs = 0;

function setup() {
    BACKGROUND = color(0, 20, 30);
    createCanvas(windowWidth, windowHeight);
    WIDTH = windowWidth;
    HEIGHT = windowHeight;
    noStroke();
 
    for (let i=0; i<N; i++) {
        objects.push(new Bubble(random(1.0), random(1.0), random(1.0), color(random(20.0, 20.0), random(150.0, 190.0), random(150.0, 190.0))));
    }

    sortBubbles();
}

function draw() {
  background(BACKGROUND);
  xoffs = xoffs*0.9 + 0.1*mouseX/WIDTH;
  yoffs = yoffs*0.9 + 0.1*mouseY/HEIGHT;
  
  for (let i=0; i<N; i++) {
    let current = objects[i];
    current.update(zoomIn, zoomOut);
  }
  sortBubbles();
  
  for (let i=0; i<N; i++) {
    objects[i].draw(xoffs, yoffs);
  }
}                                                                                                                                                                                               

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (mouseButton == LEFT) {
    zoomIn = true;
  } else if (mouseButton == RIGHT) {
    zoomOut = true;
  }
}
function mouseReleased() {
  if (mouseButton == LEFT) {
    zoomIn = false;
  } else if (mouseButton == RIGHT) {
    zoomOut = false;
  }
}
