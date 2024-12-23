document.addEventListener("DOMContentLoaded", async () => {
    // Carousel functionality
    const track = document.querySelector('.carousel-track');
    const images = Array.from(track.children);
    const nextButton = document.querySelector('.next');
    const prevButton = document.querySelector('.prev');

    let currentIndex = 0;

    function updateCarousel() {
        if (images.length === 0) return; // Avoid errors if no images exist
        const slideWidth = images[0].getBoundingClientRect().width;
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    window.addEventListener('resize', updateCarousel);

    // Foods functionality
    class Foods {
        constructor() {
            this.foods = [];
            this.cart = JSON.parse(localStorage.getItem('cart')) || [];
            this.fetchFoods();
        }

        async fetchFoods() {
            try {
                const response = await fetch('foods.json');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                this.foods = await response.json();
                this.renderFoods();
                this.renderCart();
            } catch (error) {
                console.error('Error fetching foods:', error);
            }
        }

        renderFoods() {
            const foodMenu = document.getElementById('food-menu');
            foodMenu.innerHTML = ''; // Clear existing items

            this.foods.forEach(food => {
                const foodItem = document.createElement('div');
                foodItem.classList.add('food-item');

                // Image element
                const img = document.createElement('img');
                img.src = food.img;
                img.alt = food.name;

                // Food details
                const details = document.createElement('div');
                details.classList.add('food-details');
                details.innerHTML = `
                    <strong>${food.name}</strong>
                    <p>Ангилал: ${food.category}</p>
                    <p>Калори: ${food.calories}</p>
                `;

                // Add button
                const addButton = document.createElement('button');
                addButton.textContent = 'Add';
                addButton.addEventListener('click', () => this.addToCart(food));

                // Append image, details, and button to the food item
                foodItem.appendChild(img);
                foodItem.appendChild(details);
                foodItem.appendChild(addButton);

                // Add food item to the menu
                foodMenu.appendChild(foodItem);
            });
        }

        addToCart(food) {
            this.cart.push(food);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.renderCart();
        }

        renderCart() {
            const cartContainer = document.getElementById('cart-container');
            cartContainer.innerHTML = ''; // Clear existing cart items

            if (this.cart.length === 0) {
                cartContainer.textContent = 'Сагс хоосон байна.';
                return;
            }

            this.cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');

                // Item name
                const itemName = document.createElement('span');
                itemName.textContent = `${item.name} (${item.category})`;

                // Remove button
                const removeButton = document.createElement('button');
                removeButton.textContent = 'Remove';
                removeButton.style.backgroundColor = 'var(--nav-hover-color)';
                removeButton.style.color = 'white';
                removeButton.addEventListener('click', () => this.removeFromCart(index));

                // Append name and button to cart item
                cartItem.appendChild(itemName);
                cartItem.appendChild(removeButton);

                // Add cart item to cart container
                cartContainer.appendChild(cartItem);
            });

            // Show or hide checkout button based on cart items
            const checkoutButton = document.getElementById('checkout-button');
            checkoutButton.style.display = this.cart.length > 0 ? 'block' : 'none';
        }

        removeFromCart(index) {
            this.cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(this.cart));
            this.renderCart();
        }
    }

    // Initialize the Foods class
    new Foods();
});
