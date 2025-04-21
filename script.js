document.addEventListener("DOMContentLoaded", () => {
    const themeToggleButton = document.getElementById("theme-toggle");
    const body = document.body;

    // Vérifier si le mode sombre est activé dans le localStorage
    if (localStorage.getItem("dark-theme") === "enabled") {
        body.classList.add("dark-theme");
        themeToggleButton.textContent = "🌞";
    }

    // Toggle du mode sombre
    themeToggleButton.addEventListener("click", () => {
        body.classList.toggle("dark-theme");
        const isDark = body.classList.contains("dark-theme");

        themeToggleButton.textContent = isDark ? "🌞" : "🌙";
        localStorage.setItem("dark-theme", isDark ? "enabled" : "disabled");
    });

    // Gestion des accroches professionnelles
    const accrocheElement = document.getElementById("accroche-professionnelle");
    const accrocheText = [
        "En recherche d’opportunités, souhaitant vous intéressez ! 🐱",
        "Un bon sens relationnel 🤝",
        "Passionné par le design et le développement web 🌐",
        "Bonnes connaissances en communication visuelle 👀",
        "Passionné par les arts & les technologies 💫",        
        "Toujours prêt à relever de nouveaux défis !",        
        "Passionné par l'Histoire, les Sciences et la Philosophie ♫",
        "De bonnes capacités d'adaptation & compétences utiles 🌞"
    ];

    let index = 0;
    function displayAccroche() {
        accrocheElement.style.opacity = 0;
        setTimeout(() => {
            accrocheElement.textContent = accrocheText[index];
            accrocheElement.style.opacity = 1;
            index = (index + 1) % accrocheText.length;
        }, 500);
    }

    displayAccroche();
    setInterval(displayAccroche, 3500);

});

// Fermer les autres sections ouvertes
sections.forEach(otherSection => {

    const header = section.querySelector("h2");
    const content = section.querySelector(".collapsible-content");

    if (header && content) {
        header.style.cursor = "pointer";
        header.addEventListener("click", function () {
            section.classList.toggle("active");
        });
    if (otherSection !== section) {
        otherSection.classList.remove("active");

let btnContainer = document.querySelector('.btn-container');
let button = document.querySelector('.glow-btn');

let spawnDistance = 20;

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
}

function updateButtonColor() {
    const randomColor = getRandomColor();
    button.style.background = randomColor;
    button.style.boxShadow = `0 0 20px ${randomColor}, 0 0 50px ${randomColor}`;
    button.style.color = '#fff'; // Maintenir le texte en blanc pour une lisibilité optimale
}

function getRandomSize() {
    return Math.floor(Math.random() * (8 - 4 + 1)) + 4;
}

function createParticles() {
    let particles = document.createElement('div');
    particles.classList.add('particles');
    let btnWidth = button.offsetWidth;
    let btnHeight = button.offsetHeight;

    let angle = Math.random() * 2 * Math.PI;
    let x = btnWidth / 2 + Math.cos(angle) * spawnDistance;
    let y = btnHeight / 2 + Math.sin(angle) * spawnDistance;

    let dx = Math.cos(angle) * 100;
    let dy = Math.sin(angle) * 100;

    const randomSize = getRandomSize();
    particles.style.width = `${randomSize}px`;
    particles.style.height = `${randomSize}px`;

    const randomColor = getRandomColor();
    particles.style.background = randomColor;
    particles.style.boxShadow = `0 0 20px ${randomColor}, 0 0 50px ${randomColor}`;

    particles.style.left = `${x}px`;
    particles.style.top = `${y}px`;
    particles.style.setProperty('--dx', `${dx}px`);
    particles.style.setProperty('--dy', `${dy}px`);

    btnContainer.appendChild(particles);
    setTimeout(() => {
        particles.remove();
    }, 2000);
}

button.addEventListener('mouseenter', () => {
    interval = setInterval(createParticles, 80);
    updateButtonColor(); // Changer la couleur du bouton et de son halo au survol
});

button.addEventListener('mouseleave', () => {
    clearInterval(interval);
});
