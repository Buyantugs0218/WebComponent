class Cart {
    constructor(cartContainerSelector, checkoutButtonSelector) {
        this.cartContainer = document.querySelector(cartContainerSelector);
        this.checkoutButton = document.querySelector(checkoutButtonSelector);
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
    }

    renderCart() {
        this.cartContainer.innerHTML = ''; // Clear existing cart items

        if (this.cart.length === 0) {
            this.cartContainer.textContent = 'Сагс хоосон байна.';
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

            cartItem.appendChild(itemName);
            cartItem.appendChild(removeButton);
            this.cartContainer.appendChild(cartItem);
        });

        // Show or hide checkout button based on cart items
        this.checkoutButton.style.display = this.cart.length > 0 ? 'block' : 'none';
    }

    addToCart(food) {
        this.cart.push(food);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.renderCart();
    }

    removeFromCart(index) {
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.renderCart();
    }
}
