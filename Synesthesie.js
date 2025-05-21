// 🎨 synesthesie.js : enrichissements dynamiques
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

// 🎛 Mappage synesthésique personnalisé
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

// 🎹 Réaction visuelle des touches
const keys = document.querySelectorAll('.element');
keys.forEach(el => {
    el.addEventListener('click', () => {
        const color = getComputedStyle(el).getPropertyValue('--color').trim();
        drawCircle(color);
    });
});

// 🧘 Mode relax automatique
let relaxInterval;
const relaxBtn = document.getElementById("auto-relax");
relaxBtn?.addEventListener("click", () => {
    if (relaxInterval) {
        clearInterval(relaxInterval);
        relaxInterval = null;
        relaxBtn.textContent = "Activer mode relax";
    } else {
        relaxInterval = setInterval(() => {
            const all = [...document.querySelectorAll('.element')];
            const el = all[Math.floor(Math.random() * all.length)];
            if (el) el.click();
        }, 2500);
        relaxBtn.textContent = "Arrêter mode relax";
    }
});

// 🔳 Plein écran
const fsBtn = document.getElementById("fullscreenBtn");
if (fsBtn) {
    fsBtn.addEventListener("click", () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
            fsBtn.textContent = "Quitter le plein écran";
        } else {
            document.exitFullscreen();
            fsBtn.textContent = "Plein écran";
        }
    });

    document.addEventListener("fullscreenchange", () => {
        if (!document.fullscreenElement) {
            fsBtn.textContent = "Plein écran";
        }
    });
}

// 🌈 Galerie de presets
const presets = {
    dream: {
        C4: ['#fbb1d3', 'images/image1.png'],
        D4: ['#b1e3fb', 'images/image2.png'],
        E4: ['#dbfab1', 'images/image3.png'],
        F4: ['#e9b1fb', 'images/image4.png'],
        G4: ['#b1fbd5', 'images/image5.png'],
        A4: ['#fbe2b1', 'images/image6.png'],
        B4: ['#b1ccfb', 'images/image7.png'],
        C5: ['#fbb1b1', 'images/image8.png']
    },
    cosmic: {
        C4: ['#ff00ff', 'images/image1.png'],
        D4: ['#00ffff', 'images/image2.png'],
        E4: ['#ffff00', 'images/image3.png'],
        F4: ['#ff8800', 'images/image4.png'],
        G4: ['#8800ff', 'images/image5.png'],
        A4: ['#00ff88', 'images/image6.png'],
        B4: ['#ff4444', 'images/image7.png'],
        C5: ['#44ff44', 'images/image8.png']
    },
    forest: {
        C4: ['#3e6b2f', 'images/image1.png'],
        D4: ['#5c913b', 'images/image2.png'],
        E4: ['#9bcf8b', 'images/image3.png'],
        F4: ['#b8e0b0', 'images/image4.png'],
        G4: ['#2e5939', 'images/image5.png'],
        A4: ['#597d51', 'images/image6.png'],
        B4: ['#86a273', 'images/image7.png'],
        C5: ['#a3cfa4', 'images/image8.png']
    },
    cyberpunk: {
        C4: ['#ff00aa', 'images/image1.png'],
        D4: ['#00ffaa', 'images/image2.png'],
        E4: ['#aa00ff', 'images/image3.png'],
        F4: ['#ff6600', 'images/image4.png'],
        G4: ['#00ccff', 'images/image5.png'],
        A4: ['#ffcc00', 'images/image6.png'],
        B4: ['#cc00ff', 'images/image7.png'],
        C5: ['#ff0033', 'images/image8.png']
    },
    pastel: {
        C4: ['#ff6666', 'images/image1.png'],
        D4: ['#ff9966', 'images/image2.png'],
        E4: ['#ffcc66', 'images/image3.png'],
        F4: ['#99cc66', 'images/image4.png'],
        G4: ['#66cccc', 'images/image5.png'],
        A4: ['#6699ff', 'images/image6.png'],
        B4: ['#9966cc', 'images/image7.png'],
        C5: ['#cc66aa', 'images/image8.png']
    },
};

function loadPreset(name) {
    const map = presets[name];
    if (!map) return;
    Object.entries(map).forEach(([note, [color, img]]) => {
        const el = [...document.querySelectorAll('.element')].find(e => e.dataset.note === note);
        if (el) {
            el.style.setProperty('--color', color);
            el.dataset.img = img;
            el.style.backgroundColor = color;
            el.style.boxShadow = `0 0 15px ${color}`;
        }
    });
}

document.querySelectorAll("[data-preset]").forEach(btn => {
    btn.addEventListener("click", () => loadPreset(btn.dataset.preset));
});


// 🕊️ Mode hommage poétique (version circle + splashes)
const tributeText = [
    "Comme une ondulation dans le Temps,",
    "dans les replis tièdes de ton royaume de verre,",
    "tu as traversé les années sans bruit,",
    "en gardienne muette de mes jours & mes nuits.",
    "Je t’ai nommée Leto, en mémoire des anciens dieux,",
    "toi, la déesse oubliée aux yeux sans larmes,",
    "digne et farouche, logée dans le silence tu étais là,",
    "te laissant à nos aïeux dans un dernier adieu ~*",
    "Merci d’avoir été cette ombre mouvante,",
    "cette preuve que l’on peut aimer sans langage,",
    "et pleurer sans explication à nos propres introspections."
];

const tributeBtn = document.getElementById("start-tribute");
const poemDisplay = document.getElementById("poem-display");
let tributeTimeouts = [];
function stopTribute() {
    tributeTimeouts.forEach(clearTimeout);
    tributeTimeouts = [];
    poemDisplay.innerHTML = "";
}

tributeBtn?.addEventListener("click", async () => {
    if (Tone.context.state !== 'running') await Tone.start();
    stopTribute();
    let i = 0;
    const notesArr = ["C4", "D4", "E4", "F4", "G4", "A4", "B4", "C5"];
    (function next() {
        if (i >= tributeText.length) return;
        const line = tributeText[i];
        const note = notesArr[i % notesArr.length];
        document.querySelector(`.element[data-note="${note}"]`)?.click();
        const p = document.createElement("p");
        p.textContent = line;
        poemDisplay.appendChild(p);
        tributeTimeouts.push(setTimeout(next, 2200));
        i++;
    })();
});

document.getElementById("stop-tribute")?.addEventListener("click", stopTribute);
