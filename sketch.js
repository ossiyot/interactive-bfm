let friendlyPlane;
let enemyPlane;

function setup() {
   createCanvas(800, 600);

   //#region Sliders
   amplitudeSlider = createSlider(1, 300, 200, 0);
   amplitudeSlider.position(10, 10);
   amplitudeSlider.style('width', '160px');

   speedSlider = createSlider(0, 5, 1, 0);
   speedSlider.position(10, 50);
   speedSlider.style('width', '160px');

   offsetSlider = createSlider(0, 200, 50, 0);
   offsetSlider.position(10, 90);
   offsetSlider.style('width', '160px');

   lagSlider = createSlider(0, TWO_PI, 0.78, 0);
   lagSlider.position(10, 130);
   lagSlider.style('width', '160px');
   //#endregion Sliders

   enemyPlane = new Plane(width / 2, height / 2, color(255, 0, 0));
   friendlyPlane = new Plane(width / 2, height / 2, color(0, 255, 0));
}

function draw() {
   background(255);

   let time = millis() / 1000;

   //#region Sliders
   let amplitude = amplitudeSlider.value();
   let speed = speedSlider.value();
   let offsetX = offsetSlider.value();
   let lag = lagSlider.value();

   textSize(20);
   text(round(amplitude), 180, 30);
   text(round(speed), 180, 70);
   text(round(offsetX), 180, 110);
   text(nfc(lag, 2), 180, 150);

   friendlyPlane.setAmplitude(amplitude);
   friendlyPlane.setSpeed(speed);

   enemyPlane.setAmplitude(amplitude);
   enemyPlane.setSpeed(speed);
   enemyPlane.setOffsetX(width / 2 + offsetX);
   enemyPlane.setLag(lag);
   //#endregion Sliders

   friendlyPlane.move(time);
   friendlyPlane.display();

   enemyPlane.move(time);
   enemyPlane.display();

   lineBetweenPlanes(friendlyPlane, enemyPlane);
   text("Distance: "+round(distance(friendlyPlane, enemyPlane)), width-200, 30)
   text("Angle: "+nfc(abs(degrees(angleDifference(enemyPlane, friendlyPlane))), 2), width-200, 60)
}

class Plane {
   constructor(offsetX, offsetY, c) {
      this.x = 0;
      this.y = 0;
      this.angle = 0;
      this.lag = 0;

      this.offsetX = offsetX;
      this.offsetY = offsetY;

      this.speed = 1;
      this.amplitude = 10;

      this.r = 5;
      this.c = c; // Color
   }

   move(t) {
      this.x = this.offsetX + sin(t * this.speed - this.lag) * this.amplitude;
      this.y = this.offsetY + cos(t * this.speed - this.lag) * this.amplitude;
      this.angle = (t * this.speed - this.lag) % TWO_PI;
   }

   display() {
      push();
      fill(this.c);
      strokeWeight(1);
      translate(this.x, this.y);
      rotate(-this.angle + HALF_PI);
      beginShape();
      vertex(0, -this.r * 2);
      vertex(-this.r, this.r * 2);
      vertex(this.r, this.r * 2);
      endShape(CLOSE);
      pop();

      push();
      fill(0, 0);
      stroke(this.c);
      strokeWeight(0.5);
      circle(this.offsetX, this.offsetY, this.amplitude * 2)
      pop();
   }

   setAmplitude(A) {
      this.amplitude = A;
   }

   setSpeed(v) {
      this.speed = v;
   }

   setOffsetX(offsetX) {
      this.offsetX = offsetX;
   }

   setLag(lag) {
      this.lag = lag;
   }
}

function lineBetweenPlanes(plane1, plane2) {
   push();
   stroke(0);
   line(plane1.x, plane1.y, plane2.x, plane2.y);
   pop();
}

function distance(plane1, plane2) {
   return sqrt((plane1.x-plane2.x)**2 + (plane1.y-plane2.y)**2);
}

function angleDifference(p1, p2) {
   let v1 = createVector(p1.y-p1.offsetY, -(p1.x-p1.offsetX)); // Inverted to get tangent vector
   let v2 = createVector(p2.x-p1.x, p2.y-p1.y);
   
   /*   DEBUG
   let v0 = createVector(p1.x, p1.y);
   drawArrow(v0, v1, 'red');
   drawArrow(v0, v2, 'blue');
   */

   return v1.angleBetween(v2);
}

function drawArrow(base, vec, myColor) {
   push();
   stroke(myColor);
   strokeWeight(3);
   fill(myColor);
   translate(base.x, base.y);
   line(0, 0, vec.x, vec.y);
   rotate(vec.heading());
   let arrowSize = 7;
   translate(vec.mag() - arrowSize, 0);
   triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
   pop();
 }

function plotEquation(x, y, equation) {
   return;
}