"use strict";
const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = [];
const mouse = {
  x: undefined,
  y: undefined,
};
const genRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
// Event Listeners
window.addEventListener("resize", function (e) {
  canvas.width = this.innerWidth;
  canvas.height = this.innerHeight;
  init();
});
window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

function Ball(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.radian = Math.random() * Math.PI * 2;
  this.velocity = 0.05;
  this.distance = genRandomInt(50, 120);

  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  };
  this.update = function () {
    this.radian += this.velocity;
    // Circular Motion
    this.x = x + Math.cos(this.radian) * this.distance;
    this.y = y + Math.sin(this.radian) * this.distance;
    this.draw();
  };
}

// Implementations
let balls = [];
function init() {
  balls = [];
  for (let i = 0; i < 10; i++) {
    balls.push(new Ball(canvas.width / 2, canvas.height / 2, 5, "blue"));
  }
}
init();
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, canvas.width, canvas.height);

  balls.forEach((ball) => {
    ball.update();
  });
}
animate();
