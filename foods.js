class Foods {
    constructor(foodMenuSelector, cart) {
        this.foods = [];
        this.foodMenu = document.querySelector(foodMenuSelector);
        this.cart = cart;
        this.fetchFoods();
    }

    async fetchFoods() {
        try {
            const response = await fetch('foods.json');
            if (!response.ok) throw new Error('Network response was not ok');
            this.foods = await response.json();
            this.renderFoods();
        } catch (error) {
            console.error('Error fetching foods:', error);
        }
    }

    renderFoods() {
        this.foodMenu.innerHTML = ''; // Clear existing items

        this.foods.forEach(food => {
            const foodItem = new FoodItem(food, (food) => this.cart.addToCart(food));
            foodItem.render(this.foodMenu);
        });
    }
}
