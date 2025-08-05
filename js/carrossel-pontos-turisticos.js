document.addEventListener('DOMContentLoaded', () => {
    const track      = document.querySelector('.carousel-track');
    const prevBtn    = document.getElementById('btn-pontos-turisticos-previus');
    const nextBtn    = document.getElementById('btn-pontos-turisticos-next');
    const slides     = track ? Array.from(track.children) : [];
    const slideWidth = slides[0]?.getBoundingClientRect().width;

    // posiciona cada slide lado a lado
    slides.forEach((slide, i) => {
        slide.style.left = `${slideWidth * i}px`;
    });

    let currentIndex = 0;
    const maxIndex = slides.length - 4;

    nextBtn.addEventListener('click', () => {
        console.log('► clicou NEXT');
        const nextIndex = currentIndex < maxIndex ? currentIndex + 1 : 0;
        track.style.transform = `translateX(-${slideWidth * nextIndex}px)`;
        currentIndex = nextIndex;
    });

    prevBtn.addEventListener('click', () => {
        console.log('◄ clicou PREV');
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : maxIndex;
        track.style.transform = `translateX(-${slideWidth * prevIndex}px)`;
        currentIndex = prevIndex;
    });
});