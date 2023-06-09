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
  constructor(x, y, radius) {
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
  draw() {
    ctx.beginPath();
    // arc(x, y, radius, startAngle, endAngle)
    // arc(x, y, 반지름, 시작 각도 , 끝 각도 , 방향 설정)
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = 'red';
    ctx.fill();
    ctx.closePath();
  }
}

const x = 100;
const y = 100;
const radius = 50;
const particle = new Particle(x, y, radius);

function animate() {
  window.requestAnimationFrame(animate);

  // 매 프레임마다 전체화면을 지우고 다음 프레임에서 파티클을 드로우한다.
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  particle.draw();
}

animate();
