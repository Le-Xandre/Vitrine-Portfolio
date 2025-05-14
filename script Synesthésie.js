const elements = document.querySelectorAll('.element');
const synth = new Tone.Synth().toDestination();
const status = document.getElementById('status');
const img = document.getElementById('illustration');
const recordBtn = document.getElementById('record');
const downloadLink = document.getElementById('downloadLink');

let mediaRecorder;
let audioChunks = [];

elements.forEach(el => {
  el.addEventListener('click', async () => {
    if (Tone.context.state !== 'running') await Tone.start();
    const note = el.dataset.note;
    const image = el.dataset.img;
    synth.triggerAttackRelease(note, '8n');
    status.textContent = 'Note jouée : ' + note;
    img.src = image;
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
