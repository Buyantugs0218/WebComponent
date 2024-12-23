class Carousel {
    constructor(trackSelector, nextButtonSelector, prevButtonSelector) {
        this.track = document.querySelector(trackSelector);
        this.images = Array.from(this.track.children);
        this.nextButton = document.querySelector(nextButtonSelector);
        this.prevButton = document.querySelector(prevButtonSelector);
        this.currentIndex = 0;

        this.init();
    }

    init() {
        this.updateCarousel();
        this.nextButton.addEventListener('click', () => this.moveNext());
        this.prevButton.addEventListener('click', () => this.movePrev());
        window.addEventListener('resize', () => this.updateCarousel());
    }

    updateCarousel() {
        if (this.images.length === 0) return; // Avoid errors if no images exist
        const slideWidth = this.images[0].getBoundingClientRect().width;
        this.track.style.transform = `translateX(-${this.currentIndex * slideWidth}px)`;
    }

    moveNext() {
        if (this.currentIndex < this.images.length - 1) {
            this.currentIndex++;
            this.updateCarousel();
        }
    }

    movePrev() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateCarousel();
        }
    }
}
