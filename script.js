// ==========================================
// PLANT STORE - SHOPPING CART
// ==========================================

let cart = [];

/* Safely load cart from localStorage */
(function loadCartFromStorage() {
    try {
        const raw = localStorage.getItem("plantStoreCart");
        cart = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(cart)) cart = [];
    } catch (e) {
        // If parsing fails (corrupt or tampered data), fall back to an empty cart.
        cart = [];
        console.warn("plantStoreCart: invalid JSON, starting with empty cart.", e);
    }
})();

// ------------------------------------------
// UPDATE CART COUNT
// ------------------------------------------

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) => total + (Number(item.quantity) || 0),
        0
    );

    cartCount.textContent = totalItems;
}


// ------------------------------------------
// ADD PRODUCT TO CART
// ------------------------------------------

function addToCart(name, price) {

    const priceNum = Number(price) || 0;

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity = (Number(existingProduct.quantity) || 0) + 1;

    } else {

        cart.push({
            name: name,
            price: priceNum,
            quantity: 1
        });

    }

    try {
        localStorage.setItem(
            "plantStoreCart",
            JSON.stringify(cart)
        );
    } catch (e) {
        console.warn("Failed to save cart to localStorage.", e);
    }

    updateCartCount();

    alert(name + " has been added to your cart.");
}


// ------------------------------------------
// REMOVE PRODUCT
// ------------------------------------------

function removeFromCart(name) {

    cart = cart.filter(
        item => item.name !== name
    );

    try {
        localStorage.setItem(
            "plantStoreCart",
            JSON.stringify(cart)
        );
    } catch (e) {
        console.warn("Failed to save cart to localStorage.", e);
    }

    updateCartCount();

    if (typeof displayCart === "function") {
        displayCart();
    }
}


// ------------------------------------------
// CHANGE QUANTITY
// ------------------------------------------

function changeQuantity(name, amount) {

    const product = cart.find(
        item => item.name === name
    );

    if (!product) return;

    const currentQty = Number(product.quantity) || 0;
    const newQty = currentQty + Number(amount);

    if (newQty <= 0) {
        removeFromCart(name);
        return;
    }

    product.quantity = Math.floor(newQty);

    try {
        localStorage.setItem(
            "plantStoreCart",
            JSON.stringify(cart)
        );
    } catch (e) {
        console.warn("Failed to save cart to localStorage.", e);
    }

    updateCartCount();

    if (typeof displayCart === "function") {
        displayCart();
    }
}


// ------------------------------------------
// CALCULATE CART TOTAL
// ------------------------------------------

function getCartTotal() {

    const total = cart.reduce(
        (sum, item) =>
            sum + ((Number(item.price) || 0) * (Number(item.quantity) || 0)),
        0
    );

    // Avoid floating-point artifacts for display consumers:
    return Math.round(total * 100) / 100;
}


// ------------------------------------------
// START
// ------------------------------------------

updateCartCount();
// ------------------------------------------
// SYNC CART WHEN RETURNING TO THE PAGE
// ------------------------------------------

window.addEventListener("pageshow", function () {

    try {
        const raw = localStorage.getItem("plantStoreCart");
        cart = raw ? JSON.parse(raw) : [];
        if (!Array.isArray(cart)) cart = [];
    } catch (e) {
        cart = [];
        console.warn("plantStoreCart: invalid JSON on pageshow, starting with empty cart.", e);
    }

    updateCartCount();

    if (typeof displayCart === "function") {
        displayCart();
    }

});
