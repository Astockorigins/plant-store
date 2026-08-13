// ==========================================
// PLANT STORE - SHOPPING CART
// ==========================================

let cart = JSON.parse(localStorage.getItem("plantStoreCart")) || [];


// ------------------------------------------
// UPDATE CART COUNT
// ------------------------------------------

function updateCartCount() {

    const cartCount = document.getElementById("cart-count");

    if (!cartCount) return;

    const totalItems = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = totalItems;
}


// ------------------------------------------
// ADD PRODUCT TO CART
// ------------------------------------------

function addToCart(name, price) {

    const existingProduct = cart.find(
        item => item.name === name
    );

    if (existingProduct) {

        existingProduct.quantity += 1;

    } else {

        cart.push({
            name: name,
            price: price,
            quantity: 1
        });

    }

    localStorage.setItem(
        "plantStoreCart",
        JSON.stringify(cart)
    );

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

    localStorage.setItem(
        "plantStoreCart",
        JSON.stringify(cart)
    );

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

    product.quantity += amount;

    if (product.quantity <= 0) {
        removeFromCart(name);
        return;
    }

    localStorage.setItem(
        "plantStoreCart",
        JSON.stringify(cart)
    );

    updateCartCount();

    if (typeof displayCart === "function") {
        displayCart();
    }
}


// ------------------------------------------
// CALCULATE CART TOTAL
// ------------------------------------------

function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + (item.price * item.quantity),
        0
    );
}


// ------------------------------------------
// START
// ------------------------------------------

updateCartCount();
// ------------------------------------------
// SYNC CART WHEN RETURNING TO THE PAGE
// ------------------------------------------

window.addEventListener("pageshow", function () {

    cart =
        JSON.parse(
            localStorage.getItem("plantStoreCart")
        ) || [];

    updateCartCount();

    if (typeof displayCart === "function") {
        displayCart();
    }

});
