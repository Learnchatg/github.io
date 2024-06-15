let cart = JSON.parse(localStorage.getItem('cart')) || [];
let totalPrice = cart.reduce((sum, item) => sum + item.price, 0);

function addToCart(product, price) {
    cart.push({ product, price });
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    if (cartItems) {
        cartItems.innerHTML = '';
        totalPrice = 0.00;
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.textContent = `${item.product} - $${item.price.toFixed(2)}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Удалить';
            removeButton.onclick = () => removeFromCart(index);
            li.appendChild(removeButton);
            cartItems.appendChild(li);
            totalPrice += item.price;
        });
        document.getElementById('total-price').textContent = totalPrice.toFixed(2);
    }
}

function removeFromCart(index) {
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

window.onload = updateCart;