(function () {
const elements = document.querySelectorAll('.element');
const synth = new Tone.Synth().toDestination();
const status = document.getElementById('status');
const img = document.getElementById('illustration');
const recordBtn = document.getElementById('record');
const replayBtn = document.getElementById('replay');
const downloadLink = document.getElementById('downloadLink');
const bgOverlay = document.getElementById('background-overlay');

let mediaRecorder;
let audioChunks = [];
let sequence = [];

// Préchargement des images
document.addEventListener("DOMContentLoaded", () => {
  elements.forEach(el => {
    const preImg = new Image();
    preImg.src = el.dataset.img;
  });
});

elements.forEach(el => {
  el.addEventListener('click', async () => {
    if (Tone.context.state !== 'running') await Tone.start();
    const note = el.dataset.note;
    const image = el.dataset.img;
    const color = getComputedStyle(el).getPropertyValue('--color');
    const timestamp = Date.now();

    synth.triggerAttackRelease(note, '8n');
    status.textContent = 'Note jouée : ' + note;
    img.style.opacity = 0;
    setTimeout(() => {
      img.src = image;
      img.style.opacity = 1;
    }, 250);

    el.classList.add("active");
    setTimeout(() => el.classList.remove("active"), 400);

    bgOverlay.style.background = color + "22";
      
      drawCircle(color.trim());
      sequence.push({ note, image, color, timestamp });
  });
});

recordBtn.addEventListener('click', async () => {
  if (!mediaRecorder || mediaRecorder.state === 'inactive') {
    const dest = Tone.context.createMediaStreamDestination();
    synth.connect(dest);
    mediaRecorder = new MediaRecorder(dest.stream);
    audioChunks = [];

    mediaRecorder.ondataavailable = e => audioChunks.push(e.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(audioChunks, { type: 'audio/webm' });
      const url = URL.createObjectURL(blob);
      downloadLink.href = url;
      downloadLink.download = 'enregistrement.webm';
      downloadLink.style.display = 'inline-block';
      downloadLink.textContent = 'Télécharger l’enregistrement';
    };

    mediaRecorder.start();
    recordBtn.textContent = '🔴 Enregistrement...';
  } else {
    mediaRecorder.stop();
    recordBtn.textContent = '🎙 Enregistrer';
  }
});


    replayBtn.addEventListener('click', async () => {
        if (sequence.length === 0) return;
        if (Tone.context.state !== 'running') await Tone.start();
        const start = sequence[0].timestamp;
        sequence.forEach(({ note, image, color, timestamp }) => {
            const delay = timestamp - start;
            setTimeout(() => {
                synth.triggerAttackRelease(note, '8n');
                img.src = image;
                drawCircle(color.trim());
            }, delay);
        });
    });

    const keyMap = { a: "C4", z: "D4", e: "E4", r: "F4", t: "G4", y: "A4", u: "B4", i: "C5" };
    document.addEventListener('keydown', async (e) => {
        const note = keyMap[e.key.toLowerCase()];
        if (!note) return;
        const el = Array.from(elements).find(el => el.dataset.note === note);
        if (el) el.click();
    });

    const canvas = document.getElementById('visualizer');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    function drawCircle(color) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const radius = Math.random() * 40 + 20;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = color + "55";
        ctx.fill();
    }

    document.getElementById('captureBtn').addEventListener('click', () => {
        const captureCanvas = document.createElement("canvas");
        captureCanvas.width = canvas.width;
        captureCanvas.height = canvas.height;
        const ctxCap = captureCanvas.getContext("2d");
        ctxCap.drawImage(canvas, 0, 0);
        const imgData = captureCanvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = imgData;
        a.download = "synesthesie-capture.png";
        a.click();
    });
})();
