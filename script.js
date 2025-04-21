
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
