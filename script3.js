function showSection(id) {
    document.querySelectorAll('.illusion-section').forEach(section => {
        section.classList.add('hidden');
    });
    document.getElementById(id).classList.remove('hidden');
}
