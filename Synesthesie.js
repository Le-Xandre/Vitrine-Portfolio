// ?? synesthesie.js : enrichissements dynamiques
const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

let circles = [];

function drawCircle(color) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const radius = Math.random() * 40 + 10;
    circles.push({ x, y, radius, color, alpha: 0.5 });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circles.forEach(c => {
        ctx.beginPath();
        ctx.arc(c.x, c.y, c.radius, 0, Math.PI * 2);
        ctx.fillStyle = c.color + Math.floor(c.alpha * 255).toString(16);
        ctx.fill();
        c.alpha -= 0.002;
    });
    circles = circles.filter(c => c.alpha > 0);
    requestAnimationFrame(animate);
}

animate();

// ?? Éditeur de mappage synesthésique
const noteSelect = document.getElementById('note-select');
const colorPicker = document.getElementById('color-picker');
const imageUrl = document.getElementById('image-url');
const updateBtn = document.getElementById('update-mapping');

updateBtn.addEventListener('click', () => {
    const note = noteSelect.value;
    const color = colorPicker.value;
    const img = imageUrl.value || 'images/image1.png';

    const el = [...document.querySelectorAll('.element')].find(e => e.dataset.note === note);
    if (el) {
        el.style.setProperty('--color', color);
        el.dataset.img = img;
        el.style.backgroundColor = color;
        el.style.boxShadow = `0 0 15px ${color}`;
    }
});

// ?? Liaison avec les notes
const keys = document.querySelectorAll('.element');
keys.forEach(el => {
    el.addEventListener('click', () => {
        const color = getComputedStyle(el).getPropertyValue('--color').trim();
        drawCircle(color);
    });
});
