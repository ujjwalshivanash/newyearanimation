const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fireworks = [];
const colors = ['#ff0040', '#ff8000', '#ffff00', '#80ff00', '#00ffff', '#8000ff', '#ff00ff'];

class Firework {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.particles = [];
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        angle: Math.random() * Math.PI * 2,
        speed: Math.random() * 3 + 1,
        alpha: 1
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= 0.02;
    });
    this.particles = this.particles.filter(p => p.alpha > 0);
  }

  draw() {
    this.particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  fireworks.forEach(fw => {
    fw.update();
    fw.draw();
  });
  fireworks.push(new Firework(Math.random() * canvas.width, Math.random() * canvas.height / 2, colors[Math.floor(Math.random() * colors.length)]));
  fireworks.splice(0, fireworks.length > 20 ? 1 : 0);
  requestAnimationFrame(animate);
}

animate();

console.log("Animation for 2024 transitioning to 2025 is running successfully.");