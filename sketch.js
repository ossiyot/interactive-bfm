let plane;

function setup() {
   createCanvas(800, 600);

   amplitudeSlider = createSlider(0, 200, 100, 0);
   amplitudeSlider.position(10, 10);
   amplitudeSlider.style('width', '160px');

   speedSlider = createSlider(0, 5, 2, 0);
   speedSlider.position(10, 50);
   speedSlider.style('width', '160px');

   plane = new Plane();
}

function draw() {
   background(51);

   let time = millis() / 1000;

   let amplitude = amplitudeSlider.value();
   let speed = speedSlider.value();

   textSize(20);
   fill(255);
   text(round(amplitude), 180, 30);
   text(round(speed), 180, 70);

   plane.setAmplitude(amplitude);
   plane.setSpeed(speed);

   plane.move(time);
   plane.display();
}

class Plane {
   constructor() {
      this.x = 0;
      this.y = 0;
      this.angle = 0;
      this.speed = 1;
      this.amplitude = 10;
      this.r = 5;
   }

   move(t) {
      this.x = width / 2 + sin(t * this.speed) * this.amplitude;
      this.y = height / 2 + cos(t * this.speed) * this.amplitude;
      this.angle = - (t * this.speed) % TWO_PI + HALF_PI;
   }

   display() {
      fill(200);
      strokeWeight(1);
      push();
      translate(this.x, this.y);
      rotate(this.angle);
      beginShape();
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);
      endShape(CLOSE);
      //ellipse(this.x, this.y, 80, 80);
      pop();
      fill(0, 0)
      strokeWeight(0.2);
      circle(width/2, height/2, this.amplitude*2)
   }

   setAmplitude(A) {
      this.amplitude = A;
   }

   setSpeed(v) {
      this.speed = v;
   }
}
