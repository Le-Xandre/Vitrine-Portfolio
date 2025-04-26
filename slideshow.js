let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let playing = true;
let interval = 3000; // 3 secondes

function showSlides() {
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) { slideIndex = 1; }
  slides[slideIndex-1].style.display = "block";
  if (playing) {
    setTimeout(showSlides, interval);
  }
}

document.querySelector('.slideshow-container').addEventListener('mouseenter', () => {
  playing = false;
});
document.querySelector('.slideshow-container').addEventListener('mouseleave', () => {
  playing = true;
  showSlides();
});

// Démarre le slideshow
showSlides();
