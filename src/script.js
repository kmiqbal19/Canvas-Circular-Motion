"use strict";
const canvas = document.getElementById("canvas1");
const c = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const colors = ["cyan", "#06283D", "#1363DF", "#47B5FF", "#DFF6FF"];
const mouse = {
  x: canvas.width / 2,
  y: canvas.height / 2,
};
const genRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const genRandomColor = (colors) => {
  return colors[Math.floor(Math.random() * colors.length)];
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
  this.distanceFromCenter = genRandomInt(70, 150);
  this.lastMouse = { x, y };

  this.update = function () {
    // Move points over time
    const lastPoint = { x: this.x, y: this.y };
    this.radian += this.velocity;
    // Drag Effect

    this.lastMouse.x += (mouse.x - this.lastMouse.x) * 0.05;
    this.lastMouse.y += (mouse.y - this.lastMouse.y) * 0.05;

    // Circular Motion
    this.x = this.lastMouse.x + Math.cos(this.radian) * this.distanceFromCenter;
    this.y = this.lastMouse.y + Math.sin(this.radian) * this.distanceFromCenter;
    this.draw(lastPoint);
  };
  this.draw = (lastPoint) => {
    c.beginPath();
    c.moveTo(lastPoint.x, lastPoint.y);
    c.lineTo(this.x, this.y);
    c.strokeStyle = this.color;
    c.lineWidth = this.radius;
    c.stroke();
    c.closePath();
  };
}

// Implementations
let balls = [];
function init() {
  balls = [];
  for (let i = 0; i < 50; i++) {
    const lineWidth = genRandomInt(1, 5);

    const color = genRandomColor(colors);

    balls.push(new Ball(canvas.width / 2, canvas.height / 2, lineWidth, color));
  }
}
init();
// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  // c.clearRect(0, 0, canvas.width, canvas.height);
  c.fillStyle = "rgba(255,255,255,0.03)";
  c.fillRect(0, 0, canvas.width, canvas.height);
  balls.forEach((ball) => {
    ball.update();
  });
}
animate();
