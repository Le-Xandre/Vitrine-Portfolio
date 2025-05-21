// echo.js

document.addEventListener("DOMContentLoaded", function () {
    const toggle = document.getElementById("echoModeToggle");
    const echoText = document.getElementById("echoText");
    const audio = new Audio("sounds/saturn dark calming piano melody 80bpm G-minor.wav");
    audio.loop = true;
    audio.volume = 0.3;

    // Volume control (optionnel)
    const volumeWrapper = document.getElementById("echoVolumeControl");
    const volumeControl = document.getElementById("echoVolume");

    let isEchoActive = false;

    toggle.addEventListener("click", () => {
        isEchoActive = !isEchoActive;
        document.body.classList.toggle("echo-active", isEchoActive);
        toggle.classList.toggle("active", isEchoActive);
        echoText.classList.toggle("active", isEchoActive);
        volumeWrapper?.classList.toggle("hidden", !isEchoActive);

        if (isEchoActive) {
            audio.play().catch(e => console.warn("Audio Echo fail:", e));
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    });

    volumeControl?.addEventListener("input", () => {
        audio.volume = parseFloat(volumeControl.value);
    });
});
// echo.js (extrait)

// 1. Crée un contexte audio
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
const audioElement = document.getElementById("letoHommage"); // ton <audio>
const track = audioCtx.createMediaElementSource(audioElement);

// 2. Crée l’analyseur
const analyser = audioCtx.createAnalyser();
analyser.fftSize = 256; // résolution, tu peux ajuster
const dataArray = new Uint8Array(analyser.frequencyBinCount);

// 3. Branche
track.connect(analyser);
analyser.connect(audioCtx.destination);


// echo.js

document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.getElementById("echoModeToggle");
    const echoText = document.getElementById("echoText");
    const letoAudio = document.getElementById("letoHommage");
    const volumeWrapper = document.getElementById("echoVolumeControl");
    const volumeControl = document.getElementById("echoVolume");
    let isEcho = false;

    // Setup Web Audio Analyser
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaElementSource(letoAudio);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    source.connect(analyser);
    analyser.connect(audioCtx.destination);

    // Function to compute average amplitude
    function getAmp() {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let v of dataArray) sum += v;
        return (sum / dataArray.length) / 255;
    }

    // React in render loop
    function react() {
        if (isEcho) {
            const amp = getAmp();
            // trigger visual splash on strong beat
            if (amp > 0.2) {
                document.dispatchEvent(new CustomEvent("ampSplash", { detail: amp }));
            }
            // pulse the toggle button
            toggle.style.boxShadow = `0 0 ${20 * amp}px #85f2ff`;
        }
        requestAnimationFrame(react);
    }

    react();

    // Toggle Echo mode
    toggle.addEventListener("click", async () => {
        isEcho = !isEcho;
        document.body.classList.toggle("echo-active", isEcho);
        toggle.classList.toggle("active", isEcho);
        echoText.classList.toggle("active", isEcho);
        volumeWrapper.classList.toggle("hidden", !isEcho);

        if (isEcho) {
            await audioCtx.resume();
            letoAudio.play();
        } else {
            letoAudio.pause();
            letoAudio.currentTime = 0;
        }
    });

    // Volume slider
    volumeControl.addEventListener("input", () => {
        letoAudio.volume = parseFloat(volumeControl.value);
    });
});
