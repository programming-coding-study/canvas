const canvas = document.querySelector('canvas');

// 캔버스 위에서 그리는 도구
const ctx = canvas.getContext('2d');
const dpr = window.devicePixelRatio;
console.log(window.devicePixelRatio);

const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

canvas.style.width = canvasWidth + 'px';
canvas.style.height = canvasWidth + 'px';

canvas.width = canvasWidth * dpr;
canvas.height = canvasWidth * dpr;
ctx.scale(dpr, dpr);

class Particle {
  constructor(x, y, radius, vy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.vy = vy;
  }
  update() {
    this.y += this.vy;
  }
  draw() {
    ctx.beginPath();
    // arc(x, y, radius, startAngle, endAngle)
    // arc(x, y, 반지름, 시작 각도 , 끝 각도 , 방향 설정)
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = 'orange';
    ctx.fill();
    ctx.closePath();
  }
}

const TOTAL = 20;
// 최소와 최대값 사이의 랜덤값 리턴해주는 함수
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];

for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth);
  const y = randomNumBetween(0, canvasHeight);
  const radius = randomNumBetween(50, 100);
  const vy = randomNumBetween(1, 5);
  const particle = new Particle(x, y, radius, vy);
  particles.push(particle);
}

console.log(particles);

let interval = 1000 / 60;
let now, delta;
let then = Date.now();

function animate() {
  window.requestAnimationFrame(animate);
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  // 매 프레임마다 전체화면을 지우고 다음 프레임에서 파티클을 드로우한다.
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    if (particle.y - particle.radius > canvasHeight) {
      particle.y = -particle.radius;
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(50, 100);
      particle.vy = randomNumBetween(1, 5);
    }
  });

  then = now - (delta % interval);
}

animate();
