// Place ici ton code JavaScript
const imageData = [
    { url: "images/image (1).jpg", category: "design", title: "Art Design", description: "Une composition artistique abstraite." },
    { url: "images/image (2).jpg", category: "photo", title: "Mode Urbaine", description: "Photographie de mode contemporaine." },
    { url: "images/image (3).jpg", category: "photo", title: "Portrait Expressif", description: "Portrait capturant l’émotion brute." },
    { url: "images/image (4).jpg", category: "illustration", title: "Dessin au Crayon", description: "Illustration traditionnelle sur papier." },
    // Ajoute ici le reste des images
];

let currentCategory = 'all';
let container = document.getElementById("bentoGrid");

function randomSize() {
    const colSpan = Math.floor(Math.random() * 2) + 1;
    const rowSpan = Math.floor(Math.random() * 2) + 1;
    return { colSpan, rowSpan };
}

function generateGrid() {
    gsap.to(container, {
        duration: 0.8, opacity: 0, onComplete: () => {
            container.innerHTML = "";

            let filtered = imageData.filter(img => currentCategory === 'all' || img.category === currentCategory);
            filtered.sort(() => 0.5 - Math.random());

            filtered.forEach(({ url, title, description }) => {
                const item = document.createElement("div");
                item.classList.add("grid-item");
                item.style.backgroundImage = `url(${url})`;

                const { colSpan, rowSpan } = randomSize();
                item.style.gridColumn = `span ${colSpan}`;
                item.style.gridRow = `span ${rowSpan}`;

                item.addEventListener('click', () => openModal(url, title, description));

                container.appendChild(item);
            });

            gsap.to(container, { duration: 1, opacity: 1 });
        }
    });
}

function filterCategory(cat) {
    currentCategory = cat;
    generateGrid();
}

function openModal(url, title, desc) {
    const modalImg = document.getElementById('modalImg');
    modalImg.src = url;

    modalImg.onerror = function () {
        modalImg.src = 'path/to/default-image.jpg';
        console.error("L'image n'a pas pu être chargée : " + url);
    };

    document.getElementById('modalTitle').textContent = title;
    document.getElementById('modalDesc').textContent = desc;
    const modal = document.getElementById('modal');
    modal.classList.add('active');
    gsap.to(modal, { duration: 0.5, opacity: 1 });
}

function closeModal() {
    const modal = document.getElementById('modal');
    gsap.to(modal, {
        duration: 0.5, opacity: 0, onComplete: () => {
            modal.classList.remove('active');
        }
    });
}

// Initial load
generateGrid();

// Refresh every 10s
setInterval(generateGrid, 10000);

filtered.forEach(({ url, title, description }) => {
    const item = document.createElement("div");
    item.classList.add("grid-item");
    item.style.backgroundImage = `url(${url})`;

    const { colSpan, rowSpan } = randomSize();
    item.style.gridColumn = `span ${colSpan}`;
    item.style.gridRow = `span ${rowSpan}`;

    // Débogage
    item.addEventListener('click', () => {
        console.log('Image cliquée:', title);  // Ajoute ce log pour vérifier l'interaction
        openModal(url, title, description);
    });

    container.appendChild(item);
});
