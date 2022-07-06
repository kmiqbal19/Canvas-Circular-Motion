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
// Event Listeners
window.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;
});

function Ball(x, y, radius, color) {
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.color = color;
  this.draw = () => {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.closePath();
  };
  this.update = function () {
    this.draw();
  };
}

// Implementations
let balls = [];
function init() {
  for (let i = 0; i < 1; i++) {
    balls.push(new Ball(canvas.width / 2, canvas.height / 2, 20, "red"));
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
