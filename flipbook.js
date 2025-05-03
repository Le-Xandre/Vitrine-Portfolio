
let currentPage = 1;
const pdfUrl = "pdf/livret.pdf";
const flipbookContainer = document.getElementById("flipbook");

function renderPage(num) {
  const iframe = document.createElement("iframe");
  iframe.src = `${pdfUrl}#page=${num}`;
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.style.border = "none";
  flipbookContainer.innerHTML = "";
  flipbookContainer.appendChild(iframe);
}

function nextPage() {
  currentPage++;
  renderPage(currentPage);
}

function prevPage() {
  if (currentPage > 1) currentPage--;
  renderPage(currentPage);
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    flipbookContainer.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") nextPage();
  if (e.key === "ArrowLeft") prevPage();
});

renderPage(currentPage);
