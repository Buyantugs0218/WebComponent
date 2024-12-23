document.addEventListener("DOMContentLoaded", async () => {
    // Initialize Carousel
    const carousel = new Carousel('.carousel-track', '.next', '.prev');

    // Initialize Cart
    const cart = new Cart('#cart-container', '#checkout-button');

    // Initialize Foods
    new Foods('#food-menu', cart);
});
