class FoodItem {
    constructor(food, addToCartCallback) {
        this.food = food;
        this.addToCartCallback = addToCartCallback;
        this.foodItemElement = this.createFoodItem();
    }

    createFoodItem() {
        const foodItem = document.createElement('div');
        foodItem.classList.add('food-item');

        // Image element
        const img = document.createElement('img');
        img.src = this.food.img;
        img.alt = this.food.name;

        // Food details
        const details = document.createElement('div');
        details.classList.add('food-details');
        details.innerHTML = `
            <strong>${this.food.name}</strong>
            <p>Ангилал: ${this.food.category}</p>
            <p>Калори: ${this.food.calories}</p>
        `;

        // Add button
        const addButton = document.createElement('button');
        addButton.textContent = 'Add';
        addButton.addEventListener('click', () => this.addToCartCallback(this.food));

        foodItem.appendChild(img);
        foodItem.appendChild(details);
        foodItem.appendChild(addButton);

        return foodItem;
    }

    render(parentElement) {
        parentElement.appendChild(this.foodItemElement);
    }
}
