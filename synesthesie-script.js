

document.querySelectorAll('nav button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
        document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
        document.getElementById(button.dataset.target).classList.add('active');
        button.classList.add('active');
    });
});
const keys = 'azertyui';
const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#8f00ff', '#ffffff'];
const canvas = document.getElementById('animation-bg');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let circles = [];

document.addEventListener('keydown', e => {
    const index = keys.indexOf(e.key.toLowerCase());
    if (index >= 0) {
        const color = colors[index];
        circles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, r: 0, color });
        playNote(index);
    }
});

function playNote(i) {
    const audio = new Audio('sound' + (i + 1) + '.mp3');
    audio.play();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, 2 * Math.PI);
        ctx.fillStyle = c.color;
        ctx.fill();
        c.r += 1;
    });
    circles = circles.filter(c => c.r < 50);
    requestAnimationFrame(animate);
}
animate();


// Récupération des éléments
const btnEcho = document.getElementById('toggleEcho');
const sectionEcho = document.querySelector('#echo');
const audioEcho = document.getElementById('echoAudio');

// Bascule du mode Echo
btnEcho.addEventListener('click', () => {
  document.body.classList.toggle('echo-active');
  sectionEcho.querySelector('.echo-content').classList.toggle('hidden');
  if (!audioEcho.paused) {
    audioEcho.pause();
  } else {
    audioEcho.play();
  }
});

// Rotorelief animé
const canvas = document.getElementById('rotoCanvas');
const ctx    = canvas.getContext('2d');
let angle     = 0;

function drawRotorelief() {
  const R = canvas.width / 2;
  ctx.clearRect(0, 0, 2*R, 2*R);
  ctx.save();
  ctx.translate(R, R);
  ctx.rotate(angle);
  for (let i = 0; i < 360; i += 10) {
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.arc(0, 0, R, (i * Math.PI/180), ((i + 5) * Math.PI/180));
    ctx.closePath();
    ctx.fillStyle = (i % 20 === 0) ? '#222' : '#444';
    ctx.fill();
  }
  ctx.restore();
}

function animateRoto() {
  angle += 0.01;
  drawRotorelief();
  requestAnimationFrame(animateRoto);
}

btnEcho.addEventListener('click', () => {
  if (document.body.classList.contains('echo-active')) {
    requestAnimationFrame(animateRoto);
  }
});

